import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { formatCurrency, formatDate, getOrderStatusColor } from '../utils/formatters';
import { Order } from '../types';
import api from '../utils/api';
import { Package, Clock, CheckCircle, XCircle, ChefHat } from 'lucide-react';

export const Orders = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await api.get<Order[]>('/orders');
            setOrders(response.data);
        } catch (error: unknown) {
            console.error('Failed to fetch orders:', error);
            alert('Failed to load orders');
        } finally {
            setIsLoading(false);
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

    if (isLoading) {
        return null
    }


    return (
        <div className="container mx-auto p-6">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight">My Orders</h1>
                <p className="text-muted-foreground">View your order history and current orders</p>
            </div>

            {orders.length === 0 ? (
                <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                        <Package className="h-16 w-16 text-muted-foreground mb-4" />
                        <CardTitle className="text-2xl mb-2">No orders yet</CardTitle>
                        <CardDescription className="mb-6">
                            Start by placing your first order from our menu
                        </CardDescription>
                        <Button onClick={() => window.location.href = '/'}>
                            Browse Menu
                        </Button>
                    </CardContent>
                </Card>
            ) : (
                <div className="space-y-6">
                    {orders && orders?.map((order) => (
                        <Card key={order._id} className="overflow-hidden">
                            <CardHeader className="bg-muted/50">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                    <div>
                                        <CardTitle className="text-lg">Order #{order._id.slice(-8)}</CardTitle>
                                        <CardDescription>
                                            Placed on {formatDate(order.createdAt)}
                                        </CardDescription>
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
                                <div className="grid gap-4">
                                    <div className="grid gap-2">
                                        <h4 className="font-semibold">Delivery Information</h4>
                                        <div className="text-sm text-muted-foreground">
                                            <p><strong>Address:</strong> {order.deliveryAddress}</p>
                                            <p><strong>Phone:</strong> {order.phoneNumber}</p>
                                        </div>
                                    </div>

                                    <div className="grid gap-2">
                                        <h4 className="font-semibold">Order Items</h4>
                                        <div className="space-y-2">
                                            {order.items.map((item, index) => (
                                                <div key={index} className="flex items-center justify-between text-sm p-2 bg-muted/50 rounded">
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-medium">{item.quantity}x</span>
                                                        <span>{item.menuItem?.name || 'Item not found'}</span>
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
                    ))}
                </div>
            )}
        </div>
    );
};

export default Orders;