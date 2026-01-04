import React, { forwardRef } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success' | 'outline' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  isLoading?: boolean
  fullWidth?: boolean
  icon?: React.ReactNode
  children: React.ReactNode
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-[#5200ff] text-white hover:bg-[#3c00cc] active:bg-[#2a0099]',
  secondary: 'bg-[#f5e942] text-gray-900 hover:bg-[#e6d930] active:bg-[#d4c61f]',
  danger: 'bg-red-600 text-white hover:bg-red-700 active:bg-red-800',
  success: 'bg-green-600 text-white hover:bg-green-700 active:bg-green-800',
  outline: 'border border-[#5200ff] text-[#5200ff] hover:bg-[#5200ff] hover:text-white',
  ghost: 'text-[#5200ff] hover:bg-gray-100 dark:hover:bg-gray-800',
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
}

/**
 * Button Component
 *
 * A reusable button component with multiple variants and sizes.
 * Supports loading states, icons, and full width layouts.
 *
 * @component
 * @example
 * <Button variant="primary" size="md">Click me</Button>
 * <Button variant="secondary" isLoading>Loading...</Button>
 * <Button icon={<SearchIcon />}>Search</Button>
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      fullWidth = false,
      icon,
      children,
      disabled,
      className,
      ...props
    },
    ref
  ) => {
    const baseStyles = 'font-semibold rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed'
    const widthStyles = fullWidth ? 'w-full' : ''
    const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyles} ${className || ''}`

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={combinedClassName}
        {...props}
      >
        {isLoading && (
          <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        )}
        {icon && !isLoading && <span className="flex items-center">{icon}</span>}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
