import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem, MenuItem } from '../types';

interface CartState {
    items: CartItem[];
    addItem: (menuItem: MenuItem) => void;
    removeItem: (itemId: string) => void;
    updateQuantity: (itemId: string, quantity: number) => void;
    clearCart: () => void;
    getTotalItems: () => number;
    getTotalPrice: () => number;
    getItemQuantity: (itemId: string) => number;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],

            addItem: (menuItem: MenuItem) => {
                set((state) => {
                    const existingItem = state.items.find(
                        item => item.menuItem._id === menuItem._id
                    );

                    if (existingItem) {
                        return {
                            items: state.items.map(item =>
                                item.menuItem._id === menuItem._id
                                    ? { ...item, quantity: item.quantity + 1 }
                                    : item
                            )
                        };
                    }

                    return {
                        items: [...state.items, { menuItem, quantity: 1 }]
                    };
                });
            },

            removeItem: (itemId: string) => {
                set((state) => ({
                    items: state.items.filter(item => item.menuItem._id !== itemId)
                }));
            },

            updateQuantity: (itemId: string, quantity: number) => {
                set((state) => ({
                    items: state.items
                        .map(item =>
                            item.menuItem._id === itemId
                                ? { ...item, quantity }
                                : item
                        )
                        .filter(item => item.quantity > 0)
                }));
            },

            clearCart: () => {
                set({ items: [] });
            },

            getTotalItems: () => {
                return get().items.reduce((total, item) => total + item.quantity, 0);
            },

            getTotalPrice: () => {
                return get().items.reduce(
                    (total, item) => total + item.menuItem.price * item.quantity,
                    0
                );
            },

            getItemQuantity: (itemId: string) => {
                const item = get().items.find(item => item.menuItem._id === itemId);
                return item ? item.quantity : 0;
            },
        }),
        {
            name: 'cart-storage',
        }
    )
);