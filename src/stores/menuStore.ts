import { create } from 'zustand';
import api from '../utils/api';
import type { MenuItem } from '../types';

interface MenuState {
    menuItems: MenuItem[];
    isLoading: boolean;
    error: string | null;
    fetchMenuItems: () => Promise<void>;
    createMenuItem: (data: Omit<MenuItem, '_id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
    updateMenuItem: (id: string, data: Partial<MenuItem>) => Promise<void>;
    deleteMenuItem: (id: string) => Promise<void>;
}

export const useMenuStore = create<MenuState>((set, get) => ({
    menuItems: [],
    isLoading: false,
    error: null,

    fetchMenuItems: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await api.get<MenuItem[]>('/menu');
            set({ menuItems: response.data, isLoading: false });
        } catch (error: any) {
            set({ error: error.response?.data?.message || 'Failed to fetch menu', isLoading: false });
        }
    },

    createMenuItem: async (data) => {
        set({ isLoading: true, error: null });
        try {
            const response = await api.post<MenuItem>('/menu', data);
            set((state) => ({
                menuItems: [...state.menuItems, response.data],
                isLoading: false
            }));
        } catch (error: any) {
            set({ error: error.response?.data?.message || 'Failed to create menu item', isLoading: false });
            throw error;
        }
    },

    updateMenuItem: async (id, data) => {
        set({ isLoading: true, error: null });
        try {
            const response = await api.patch<MenuItem>(`/menu/${id}`, data);
            set((state) => ({
                menuItems: state.menuItems.map(item =>
                    item._id === id ? response.data : item
                ),
                isLoading: false
            }));
        } catch (error: any) {
            set({ error: error.response?.data?.message || 'Failed to update menu item', isLoading: false });
            throw error;
        }
    },

    deleteMenuItem: async (id) => {
        set({ isLoading: true, error: null });
        try {
            await api.delete(`/menu/${id}`);
            set((state) => ({
                menuItems: state.menuItems.filter(item => item._id !== id),
                isLoading: false
            }));
        } catch (error: any) {
            set({ error: error.response?.data?.message || 'Failed to delete menu item', isLoading: false });
            throw error;
        }
    },
}));