import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '../utils/api';
import type { AuthResponse, LoginData, RegisterData, User } from '../types';

interface AuthState {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    login: (data: LoginData) => Promise<void>;
    register: (data: RegisterData) => Promise<void>;
    logout: () => void;
    checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            user: null,
            token: null,
            isLoading: false,

            login: async (data: LoginData) => {
                set({ isLoading: true });
                try {
                    const response = await api.post<AuthResponse>('/auth/login', data);
                    const { token, user } = response.data;

                    set({ user, token, isLoading: false });
                    localStorage.setItem('token', token);
                } catch (error) {
                    set({ isLoading: false });
                    throw error;
                }
            },

            register: async (data: RegisterData) => {
                set({ isLoading: true });
                try {
                    const response = await api.post<AuthResponse>('/auth/register', data);
                    const { token, user } = response.data;

                    set({ user, token, isLoading: false });
                    localStorage.setItem('token', token);
                } catch (error) {
                    set({ isLoading: false });
                    throw error;
                }
            },

            logout: () => {
                set({ user: null, token: null });
                localStorage.removeItem('token');
            },

            checkAuth: async () => {
                const token = localStorage.getItem('token');
                if (!token) {
                    set({ user: null, token: null });
                    return;
                }

                set({ isLoading: true });
                try {
                    const response = await api.get<{ user: User }>('/auth/me');
                    set({ user: response.data.user, token, isLoading: false });
                } catch (error) {
                    set({ user: null, token: null, isLoading: false });
                    localStorage.removeItem('token');
                }
            },
        }),
        {
            name: 'auth-storage',
            partialize: (state) => ({ user: state.user, token: state.token }),
        }
    )
);