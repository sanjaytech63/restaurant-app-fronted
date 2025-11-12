import { useEffect } from 'react';
import { useMenuStore } from '../stores/menuStore';
import { useCartStore } from '../stores/cartStore';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Plus, Minus } from 'lucide-react';
import { formatCurrency } from '../utils/formatters';
import { Loader } from '@/components/ui/loader';

export const Menu = () => {
    const { menuItems, isLoading, fetchMenuItems } = useMenuStore();
    const { addItem, getItemQuantity, updateQuantity } = useCartStore();

    useEffect(() => {
        fetchMenuItems();
    }, [fetchMenuItems]);

    if (isLoading) {
        return <div className="min-h-screen flex items-center justify-center"><Loader variant='rotate' /></div>;
    }

    return (
        <div className="container mx-auto p-6">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Our Menu</h1>
                <p className="text-muted-foreground">Discover our delicious offerings</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {menuItems.map((item) => {
                    const quantity = getItemQuantity(item._id);

                    return (
                        <Card key={item._id} className="overflow-hidden">
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-60 object-cover transition-transform duration-500 group-hover:scale-110"

                            />
                            <CardHeader className="pb-4">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <CardTitle className="text-xl">{item.name}</CardTitle>

                                    </div>

                                </div>
                                <div className='flex items-center justify-between'>
                                    <Badge variant='secondary'>
                                        {item.category}
                                    </Badge>
                                    <div className="text-2xl font-bold text-primary">
                                        {formatCurrency(item.price)}
                                    </div>
                                </div>
                                <CardDescription>{item.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                {quantity === 0 ? (
                                    <Button
                                        onClick={() => addItem(item)}
                                        className="w-full"
                                    >
                                        <Plus className="h-4 w-4 mr-2" />
                                        Add to Cart
                                    </Button>
                                ) : (
                                    <div className="flex items-center justify-between">
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            onClick={() => updateQuantity(item._id, quantity - 1)}
                                        >
                                            <Minus className="h-4 w-4" />
                                        </Button>
                                        <span className="font-medium">{quantity}</span>
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            onClick={() => updateQuantity(item._id, quantity + 1)}
                                        >
                                            <Plus className="h-4 w-4" />
                                        </Button>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
};

export default Menu;