import React from 'react';
import { cn } from '@/lib/utils';
import {
    Loader2,
    Utensils,
    ChefHat,
    Pizza,
    Coffee,
    Sandwich,
} from 'lucide-react';

// Spinner Loader
interface SpinnerProps {
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({ size = 'md', className }) => {
    const sizeClasses = {
        sm: 'h-4 w-4',
        md: 'h-6 w-6',
        lg: 'h-8 w-8'
    };

    return (
        <Loader2 className={cn(
            'animate-spin text-primary',
            sizeClasses[size],
            className
        )} />
    );
};

// Pulse Loader with Icon
interface PulseLoaderProps {
    icon?: React.ComponentType<{ className?: string }>;
    text?: string;
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

export const PulseLoader: React.FC<PulseLoaderProps> = ({
    icon: Icon = ChefHat,
    text,
    size = 'md',
    className
}) => {
    const sizeClasses = {
        sm: 'h-4 w-4',
        md: 'h-8 w-8',
        lg: 'h-12 w-12'
    };

    const textSizes = {
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg'
    };

    return (
        <div className={cn('flex flex-col items-center justify-center space-y-3', className)}>
            <div className="relative">
                <Icon className={cn(
                    'text-primary animate-pulse',
                    sizeClasses[size]
                )} />
                <div className="absolute inset-0 animate-ping">
                    <Icon className={cn(
                        'text-primary/30',
                        sizeClasses[size]
                    )} />
                </div>
            </div>
            {text && (
                <p className={cn('text-muted-foreground font-medium', textSizes[size])}>
                    {text}
                </p>
            )}
        </div>
    );
};

// Bouncing Loader
export const BouncingLoader: React.FC<{ className?: string }> = ({ className }) => {
    return (
        <div className={cn('flex items-center justify-center space-x-1', className)}>
            {[0, 1, 2].map((index) => (
                <div
                    key={index}
                    className="w-2 h-2 bg-primary rounded-full animate-bounce"
                    style={{ animationDelay: `${index * 0.1}s` }}
                />
            ))}
        </div>
    );
};

// Restaurant-themed Loaders
export const FoodLoader: React.FC<{ type?: 'utensils' | 'chef' | 'pizza' | 'coffee' | 'sandwich', className?: string }> = ({
    type = 'utensils',
    className
}) => {
    const icons = {
        utensils: Utensils,
        chef: ChefHat,
        pizza: Pizza,
        coffee: Coffee,
        sandwich: Sandwich
    };

    const Icon = icons[type];

    return (
        <div className={cn('flex items-center justify-center', className)}>
            <Icon className="h-8 w-8 text-primary animate-pulse" />
            <div className="ml-2 w-1 h-8 bg-primary animate-pulse rounded" />
        </div>
    );
};

// Rotating Plate Loader
export const RotatingLoader: React.FC<{ className?: string }> = ({ className }) => {
    return (
        <div className={cn('relative flex items-center justify-center', className)}>
            <div className="relative">
                <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                <Utensils className="absolute inset-0 m-auto h-6 w-6 text-primary animate-pulse" />
            </div>
        </div>
    );
};

// Progress Dots Loader
export const ProgressDots: React.FC<{ className?: string }> = ({ className }) => {
    return (
        <div className={cn('flex space-x-1', className)}>
            {[0, 1, 2].map((index) => (
                <div
                    key={index}
                    className="w-2 h-2 bg-primary rounded-full animate-pulse"
                    style={{ animationDelay: `${index * 0.2}s`, animationDuration: '1.5s' }}
                />
            ))}
        </div>
    );
};

// Shimmer Card Loader
export const CardLoader: React.FC<{ className?: string }> = ({ className }) => {
    return (
        <div className={cn('animate-pulse', className)}>
            <div className="bg-muted rounded-lg h-48 mb-4"></div>
            <div className="space-y-2">
                <div className="bg-muted h-4 rounded w-3/4"></div>
                <div className="bg-muted h-4 rounded w-1/2"></div>
                <div className="bg-muted h-6 rounded w-1/4 mt-4"></div>
            </div>
        </div>
    );
};

// Wave Loader
export const WaveLoader: React.FC<{ className?: string }> = ({ className }) => {
    return (
        <div className={cn('flex items-end justify-center space-x-1 h-8', className)}>
            {[0, 1, 2, 3, 4].map((index) => (
                <div
                    key={index}
                    className="w-1 bg-primary rounded-t-lg animate-wave"
                    style={{
                        height: `${20 + (index * 15)}%`,
                        animationDelay: `${index * 0.1}s`
                    }}
                />
            ))}
        </div>
    );
};

// Flipping Card Loader
export const FlippingLoader: React.FC<{ className?: string }> = ({ className }) => {
    return (
        <div className={cn('flex items-center justify-center', className)}>
            <div className="relative w-12 h-12">
                <ChefHat className="absolute inset-0 text-primary animate-flip" />
            </div>
        </div>
    );
};

// Main Loader Component with variants
interface LoaderProps {
    variant?: 'spinner' | 'pulse' | 'bounce' | 'food' | 'rotate' | 'progress' | 'wave' | 'flip';
    size?: 'sm' | 'md' | 'lg';
    text?: string;
    foodType?: 'utensils' | 'chef' | 'pizza' | 'coffee' | 'sandwich';
    className?: string;
}

export const Loader: React.FC<LoaderProps> = ({
    variant = 'spinner',
    size = 'md',
    text,
    foodType = 'chef',
    className
}) => {
    const loaders = {
        spinner: <Spinner size={size} className={className} />,
        pulse: <PulseLoader size={size} text={text} className={className} />,
        bounce: <BouncingLoader className={className} />,
        food: <FoodLoader type={foodType} className={className} />,
        rotate: <RotatingLoader className={className} />,
        progress: <ProgressDots className={className} />,
        wave: <WaveLoader className={className} />,
        flip: <FlippingLoader className={className} />
    };

    return loaders[variant];
};