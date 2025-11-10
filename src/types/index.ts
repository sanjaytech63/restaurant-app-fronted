export interface User {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'customer';
}

export interface MenuItem {
    _id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    image?: string;
    createdAt: string;
    updatedAt: string;
}

export interface OrderItem {
    menuItem: MenuItem;
    quantity: number;
    price: number;
}

export interface Order {
    _id: string;
    customer: User;
    items: OrderItem[];
    totalAmount: number;
    status: 'ordered' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
    deliveryAddress: string;
    phoneNumber: string;
    createdAt: string;
    updatedAt: string;
}

export interface CartItem {
    menuItem: MenuItem;
    quantity: number;
}

export interface AuthResponse {
    token: string;
    user: User;
}

export interface ApiError {
    message?: string;
    error?: string;
}

export interface LoginData {
    email: string;
    password: string;
}

export interface RegisterData {
    name: string;
    email: string;
    password: string;
    role?: 'admin' | 'customer';
}

export interface CreateOrderData {
    items: Array<{
        menuItem: string;
        quantity: number;
    }>;
    deliveryAddress: string;
    phoneNumber: string;
}