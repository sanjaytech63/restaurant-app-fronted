import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Utensils, Home, Search, ChefHat } from 'lucide-react';

export const NotFound: React.FC = () => {
    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <Card className="w-full max-w-md mx-auto text-center">
                <CardHeader className="pb-4">
                    <div className="flex justify-center mb-4">
                        <div className="relative">
                            <Utensils className="h-16 w-16 text-primary" />
                            <div className="absolute -top-2 -right-2">
                                <ChefHat className="h-8 w-8 text-destructive" />
                            </div>
                        </div>
                    </div>
                    <CardTitle className="text-4xl font-bold text-destructive mb-2">
                        404
                    </CardTitle>
                    <CardDescription className="text-xl">
                        Page Not Found
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <p className="text-muted-foreground">
                            Oops! It seems this page has left the kitchen.
                        </p>
                        <p className="text-sm text-muted-foreground">
                            The page you're looking for doesn't exist or may have been moved.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Button asChild className="flex items-center gap-2">
                            <Link to="/">
                                <Home className="h-4 w-4" />
                                Back to Home
                            </Link>
                        </Button>
                        <Button variant="outline" asChild className="flex items-center gap-2">
                            <Link to="/menu">
                                <Search className="h-4 w-4" />
                                Browse Menu
                            </Link>
                        </Button>
                    </div>

                    <div className="pt-4 border-t">
                        <p className="text-xs text-muted-foreground">
                            If you believe this is an error, please contact support.
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default NotFound;