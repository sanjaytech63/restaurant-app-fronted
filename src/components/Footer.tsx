import React from 'react';
import { Link } from 'react-router-dom';
import {
    Utensils,
    Phone,
    MapPin,
    Mail,
    Clock,
    Facebook,
    Twitter,
    Instagram,
    ChevronRight
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

export const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    const quickLinks = [
        { name: 'Our Menu', href: '/' },
        { name: 'About Us', href: '/about' },
        { name: 'Contact', href: '/contact' },
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Terms of Service', href: '/terms' },
    ];

    const categories = [
        'Appetizers',
        'Main Courses',
        'Desserts',
        'Beverages',
        'Specials'
    ];

    const contactInfo = [
        {
            icon: MapPin,
            text: '123 Restaurant Street, Food City, FC 12345',
            href: 'https://maps.google.com'
        },
        {
            icon: Phone,
            text: '(555) 123-4567',
            href: 'tel:5551234567'
        },
        {
            icon: Mail,
            text: 'hello@restaurantapp.com',
            href: 'mailto:hello@restaurantapp.com'
        },
        {
            icon: Clock,
            text: 'Mon-Sun: 11:00 AM - 10:00 PM',
        }
    ];

    const socialLinks = [
        { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
        { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
        { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
    ];

    const handleNewsletterSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle newsletter subscription
        alert('Thank you for subscribing to our newsletter!');
    };

    return (
        <footer className="bg-background border-t">
            {/* Main Footer Content */}
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">

                    {/* Brand Column */}
                    <div className="lg:col-span-1">
                        <Link to="/" className="flex items-center space-x-2 mb-4">
                            <Utensils className="h-8 w-8 text-primary" />
                            <span className="font-bold text-2xl">RestaurantApp</span>
                        </Link>
                        <p className="text-muted-foreground mb-6 leading-relaxed">
                            Serving delicious meals made with passion and the finest ingredients.
                            Experience the taste of perfection in every bite.
                        </p>
                        <div className="flex space-x-3">
                            {socialLinks.map((social) => (
                                <Button
                                    key={social.label}
                                    variant="outline"
                                    size="icon"
                                    asChild
                                    className="rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
                                >
                                    <a
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={social.label}
                                    >
                                        <social.icon className="h-4 w-4" />
                                    </a>
                                </Button>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            {quickLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.href}
                                        className="flex items-center text-muted-foreground hover:text-primary transition-colors group"
                                    >
                                        <ChevronRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Categories */}
                    <div>
                        <h3 className="font-semibold text-lg mb-4">Categories</h3>
                        <ul className="space-y-2">
                            {categories.map((category) => (
                                <li key={category}>
                                    <Link
                                        to={`/menu?category=${category.toLowerCase()}`}
                                        className="flex items-center text-muted-foreground hover:text-primary transition-colors group"
                                    >
                                        <ChevronRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        {category}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact & Newsletter */}
                    <div className="space-y-6">
                        {/* Contact Info */}
                        <div>
                            <h3 className="font-semibold text-lg mb-4">Contact Info</h3>
                            <ul className="space-y-3">
                                {contactInfo.map((item, index) => (
                                    <li key={index} className="flex items-start space-x-3">
                                        <item.icon className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                        {item.href ? (
                                            <a
                                                href={item.href}
                                                className="text-muted-foreground hover:text-primary transition-colors text-sm leading-relaxed"
                                            >
                                                {item.text}
                                            </a>
                                        ) : (
                                            <span className="text-muted-foreground text-sm leading-relaxed">
                                                {item.text}
                                            </span>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Newsletter */}
                        <div>
                            <h3 className="font-semibold text-lg mb-4">Newsletter</h3>
                            <p className="text-muted-foreground text-sm mb-3">
                                Subscribe to get updates on new dishes and special offers.
                            </p>
                            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                                <Input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="bg-background"
                                    required
                                />
                                <Button type="submit" className="w-full">
                                    Subscribe
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t bg-muted/50">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0">
                        <p className="text-sm text-muted-foreground">
                            © {currentYear} RestaurantApp. All rights reserved.
                        </p>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <span>Made with ❤️ for food lovers</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;