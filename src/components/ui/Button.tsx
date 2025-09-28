import React from 'react';
import { buttonVariants } from '../../design-system/components';

export interface ButtonProps {
  /** Button content */
  children: React.ReactNode;
  /** Button variant */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  /** Button size */
  size?: 'sm' | 'md' | 'lg';
  /** Whether button is disabled */
  disabled?: boolean;
  /** Button type */
  type?: 'button' | 'submit' | 'reset';
  /** Click handler */
  onClick?: () => void;
  /** Additional CSS classes */
  className?: string;
  /** ARIA label for accessibility */
  'aria-label'?: string;
}

/**
 * Primary UI component for user interaction
 */
export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  type = 'button',
  onClick,
  className = '',
  'aria-label': ariaLabel,
  ...props
}) => {
  const baseStyles = buttonVariants.base;
  const sizeStyles = buttonVariants.size[size];
  const variantStyles = buttonVariants.variant[variant];

  // Convert style objects to CSS classes for Tailwind
  const getButtonClasses = () => {
    const classes = ['inline-flex', 'items-center', 'justify-center', 'font-medium', 'transition-all', 'duration-150', 'ease-in-out', 'cursor-pointer', 'border-none', 'outline-none', 'no-underline'];

    // Size classes
    if (size === 'sm') {
      classes.push('h-8', 'px-3', 'text-sm', 'gap-1.5', 'rounded-md');
    } else if (size === 'md') {
      classes.push('h-10', 'px-4', 'text-base', 'gap-2', 'rounded-md');
    } else if (size === 'lg') {
      classes.push('h-12', 'px-6', 'text-lg', 'gap-2.5', 'rounded-md');
    }

    // Variant classes
    if (variant === 'primary') {
      classes.push('bg-blue-500', 'text-white', 'hover:bg-blue-600', 'focus:bg-blue-600', 'focus:ring-2', 'focus:ring-blue-200', 'active:bg-blue-700', 'disabled:bg-gray-300', 'disabled:text-gray-500', 'disabled:cursor-not-allowed');
    } else if (variant === 'secondary') {
      classes.push('bg-orange-500', 'text-white', 'hover:bg-orange-600', 'focus:bg-orange-600', 'focus:ring-2', 'focus:ring-orange-200', 'active:bg-orange-700', 'disabled:bg-gray-300', 'disabled:text-gray-500', 'disabled:cursor-not-allowed');
    } else if (variant === 'outline') {
      classes.push('bg-transparent', 'text-blue-600', 'border', 'border-blue-500', 'hover:bg-blue-50', 'hover:border-blue-600', 'focus:bg-blue-50', 'focus:border-blue-600', 'focus:ring-2', 'focus:ring-blue-200', 'active:bg-blue-100', 'disabled:bg-transparent', 'disabled:text-gray-400', 'disabled:border-gray-300', 'disabled:cursor-not-allowed');
    } else if (variant === 'ghost') {
      classes.push('bg-transparent', 'text-gray-900', 'hover:bg-gray-100', 'focus:bg-gray-100', 'focus:ring-2', 'focus:ring-gray-300', 'active:bg-gray-200', 'disabled:bg-transparent', 'disabled:text-gray-400', 'disabled:cursor-not-allowed');
    }

    return classes.join(' ');
  };

  return (
    <button
      type={type}
      className={`${getButtonClasses()} ${className}`}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      {...props}
    >
      {children}
    </button>
  );
};