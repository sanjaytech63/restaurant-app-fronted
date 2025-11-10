import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { formatCurrency, formatDate, getOrderStatusColor } from '../utils/formatters';
import { Order } from '../types';
import api from '../utils/api';
import { Package, User, MapPin, Phone, Clock, CheckCircle, XCircle, ChefHat, Trash2 } from 'lucide-react';
import { Loader } from '@/components/ui/loader';

export const AdminOrders = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await api.get<Order[]>('/orders/admin/all');
            setOrders(response.data);
        } catch (error: unknown) {
            console.error('Failed to fetch orders:', error);
            alert('Failed to load orders');
        } finally {
            setIsLoading(false);
        }
    };

    const updateOrderStatus = async (orderId: string, status: Order['status']) => {
        try {
            await api.patch(`/orders/${orderId}/status`, { status });
            fetchOrders(); // Refresh orders
        } catch (error: unknown) {
            console.error('Failed to update order status:', error);
            alert('Failed to update order status');
        }
    };

    const handleDeleteOrder = async (orderId: string) => {
        if (!confirm('Are you sure you want to delete this order?')) return;

        try {
            await api.delete(`/orders/${orderId}`);
            setOrders(prev => prev.filter(order => order._id !== orderId));
        } catch (error: unknown) {
            console.error('Failed to delete order:', error);
            alert('Failed to delete order');
        }
    };

    const getStatusIcon = (status: string) => {
        const icons = {
            ordered: <Clock className="h-4 w-4" />,
            preparing: <ChefHat className="h-4 w-4" />,
            ready: <Package className="h-4 w-4" />,
            delivered: <CheckCircle className="h-4 w-4" />,
            cancelled: <XCircle className="h-4 w-4" />,
        };
        return icons[status as keyof typeof icons] || <Package className="h-4 w-4" />;
    };

    const getNextStatus = (currentStatus: Order['status']): Order['status'] | null => {
        const statusFlow: Record<Order['status'], Order['status'] | null> = {
            ordered: 'preparing',
            preparing: 'ready',
            ready: 'delivered',
            delivered: null,
            cancelled: null,
        };
        return statusFlow[currentStatus];
    };

    if (isLoading) {
        return <div className="min-h-screen flex items-center justify-center"><Loader variant='rotate' /></div>;
    }

    return (
        <div className="container mx-auto p-6">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Order Management</h1>
                <p className="text-muted-foreground">Manage and track all customer orders</p>
            </div>

            {orders.length === 0 ? (
                <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                        <Package className="h-16 w-16 text-muted-foreground mb-4" />
                        <CardTitle className="text-2xl mb-2">No orders yet</CardTitle>
                        <CardDescription className="mb-6">
                            Orders will appear here when customers place them
                        </CardDescription>
                    </CardContent>
                </Card>
            ) : (
                <div className="space-y-6">
                    {orders.map((order) => {
                        const nextStatus = getNextStatus(order.status);

                        return (
                            <Card key={order._id} className="overflow-hidden">
                                <CardHeader className="bg-muted/50">
                                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                                        <div className="space-y-2">
                                            <CardTitle className="text-lg">Order #{order._id.slice(-8)}</CardTitle>
                                            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                                                <div className="flex items-center gap-1">
                                                    <User className="h-4 w-4" />
                                                    <span>{order.customer.name[1]}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Clock className="h-4 w-4" />
                                                    <span>{formatDate(order.createdAt)}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <Badge
                                                variant="secondary"
                                                className={getOrderStatusColor(order.status)}
                                            >
                                                {getStatusIcon(order.status)}
                                                <span className="ml-1 capitalize">{order.status}</span>
                                            </Badge>
                                            <div className="text-lg font-bold">
                                                {formatCurrency(order.totalAmount)}
                                            </div>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-6">
                                    <div className="grid gap-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-4">
                                                <h4 className="font-semibold flex items-center gap-2">
                                                    <MapPin className="h-4 w-4" />
                                                    Delivery Information
                                                </h4>
                                                <div className="text-sm space-y-1">
                                                    <p><strong>Address:</strong> {order.deliveryAddress}</p>
                                                    <p className="flex items-center gap-1">
                                                        <Phone className="h-4 w-4" />
                                                        <strong>Phone:</strong> {order.phoneNumber}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="space-y-4">
                                                <h4 className="font-semibold">Order Status</h4>
                                                <div className="flex flex-wrap items-center gap-2">
                                                    <Select
                                                        value={order.status}
                                                        onValueChange={(value: Order['status']) => updateOrderStatus(order._id, value)}
                                                    >
                                                        <SelectTrigger className="w-40">
                                                            <SelectValue />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="ordered">Ordered</SelectItem>
                                                            <SelectItem value="preparing">Preparing</SelectItem>
                                                            <SelectItem value="ready">Ready</SelectItem>
                                                            <SelectItem value="delivered">Delivered</SelectItem>
                                                            <SelectItem value="cancelled">Cancelled</SelectItem>
                                                        </SelectContent>
                                                    </Select>

                                                    {nextStatus && (
                                                        <Button
                                                            size="sm"
                                                            onClick={() => updateOrderStatus(order._id, nextStatus)}
                                                        >
                                                            Mark as {nextStatus}
                                                        </Button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <h4 className="font-semibold">Order Items</h4>
                                            <div className="space-y-2">
                                                {order.items.map((item, index) => (
                                                    <div key={index} className="flex items-center justify-between text-sm p-2 bg-muted/50 rounded">
                                                        <div className="flex items-center gap-2">
                                                            <span className="font-medium">{item.quantity}x</span>
                                                            <span>{item.menuItem?.name || 'Item not found'}</span>
                                                            {!item.menuItem && (
                                                                <Button
                                                                    size="sm"
                                                                    variant="destructive"
                                                                    onClick={() => handleDeleteOrder(order._id)}
                                                                >
                                                                    <Trash2 className="h-4 w-4" />
                                                                    Delete
                                                                </Button>
                                                            )}
                                                        </div>
                                                        <div className="text-right">
                                                            <div>{formatCurrency(item.price * item.quantity)}</div>
                                                            <div className="text-muted-foreground text-xs">
                                                                {formatCurrency(item.price)} each
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default AdminOrders;