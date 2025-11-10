import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { useCartStore } from '../stores/cartStore';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ShoppingCart, Utensils, LogOut, User } from 'lucide-react';

export const Header = () => {
    const { user, logout } = useAuthStore();
    const { getTotalItems } = useCartStore();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4 h-14 flex items-center justify-between">
                <Link to="/" className="flex items-center space-x-2">
                    <Utensils className="h-6 w-6" />
                    <span className="font-bold text-xl">RestaurantApp</span>
                </Link>

                <nav className="flex items-center space-x-4">
                    {user ? (
                        <>
                            {user.role === 'admin' ? (
                                <>
                                    <Button variant="ghost" asChild>
                                        <Link to="/admin/menu">Menu Management</Link>
                                    </Button>
                                    <Button variant="ghost" asChild>
                                        <Link to="/admin/orders">Orders</Link>
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Button variant="ghost" asChild>
                                        <Link to="/">Menu</Link>
                                    </Button>
                                    <Button variant="ghost" asChild>
                                        <Link to="/orders">My Orders</Link>
                                    </Button>
                                    <Button variant="ghost" asChild className="relative">
                                        <Link to="/cart">
                                            <ShoppingCart className="h-4 w-4 mr-2" />
                                            Cart
                                            {getTotalItems() > 0 && (
                                                <Badge
                                                    variant="secondary"
                                                    className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0"
                                                >
                                                    {getTotalItems()}
                                                </Badge>
                                            )}
                                        </Link>
                                    </Button>
                                </>
                            )}

                            <div className="flex items-center space-x-4">
                                <User className="h-4 w-4" />
                                <span className="text-sm capitalize">{user.name}</span>
                                <Button size="icon" onClick={handleLogout}>
                                    <LogOut className="h-4 w-4" />
                                </Button>
                            </div>
                        </>
                    ) : (
                        <Button asChild>
                            <Link to="/login">Login</Link>
                        </Button>
                    )}
                </nav>
            </div>
        </header>
    );
};