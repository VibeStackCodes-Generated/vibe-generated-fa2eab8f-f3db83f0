import React, { InputHTMLAttributes, TextareaHTMLAttributes, ReactNode } from 'react'

/**
 * Input Component
 *
 * A reusable text input component with label, error message, and help text support.
 */
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
  fullWidth?: boolean
  icon?: ReactNode
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      fullWidth = false,
      icon,
      className = '',
      type = 'text',
      ...props
    },
    ref
  ) => {
    const containerClass = fullWidth ? 'w-full' : ''
    const inputClass = icon ? 'pl-10' : ''

    return (
      <div className={containerClass}>
        {label && (
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            {label}
            {props.required && <span className="ml-1 text-red-600">*</span>}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="pointer-events-none absolute left-3 top-1/2 flex -translate-y-1/2 items-center text-gray-500">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            type={type}
            className={`w-full rounded-md border ${
              error
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:border-[#5200ff] focus:ring-[#5200ff] dark:border-gray-600'
            } bg-white px-4 py-2 text-gray-900 placeholder-gray-400 transition-colors focus:outline-none focus:ring-2 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500 ${inputClass} ${className}`}
            {...props}
          />
        </div>
        {error && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>}
        {helperText && !error && (
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{helperText}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

/**
 * Textarea Component
 *
 * A reusable textarea component with label, error message, and help text support.
 */
interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  helperText?: string
  fullWidth?: boolean
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      error,
      helperText,
      fullWidth = true,
      className = '',
      ...props
    },
    ref
  ) => {
    const containerClass = fullWidth ? 'w-full' : ''

    return (
      <div className={containerClass}>
        {label && (
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            {label}
            {props.required && <span className="ml-1 text-red-600">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          className={`w-full rounded-md border ${
            error
              ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:border-[#5200ff] focus:ring-[#5200ff] dark:border-gray-600'
          } bg-white px-4 py-2 text-gray-900 placeholder-gray-400 transition-colors focus:outline-none focus:ring-2 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500 ${className}`}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>}
        {helperText && !error && (
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{helperText}</p>
        )}
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'

/**
 * Select Component
 *
 * A reusable select dropdown component with label and error support.
 */
interface SelectOption {
  value: string
  label: string
}

interface SelectProps extends InputHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  helperText?: string
  fullWidth?: boolean
  options: SelectOption[]
  placeholder?: string
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      error,
      helperText,
      fullWidth = false,
      options,
      placeholder,
      className = '',
      ...props
    },
    ref
  ) => {
    const containerClass = fullWidth ? 'w-full' : ''

    return (
      <div className={containerClass}>
        {label && (
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            {label}
            {props.required && <span className="ml-1 text-red-600">*</span>}
          </label>
        )}
        <select
          ref={ref}
          className={`w-full rounded-md border ${
            error
              ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:border-[#5200ff] focus:ring-[#5200ff] dark:border-gray-600'
          } bg-white px-4 py-2 text-gray-900 transition-colors focus:outline-none focus:ring-2 dark:bg-gray-800 dark:text-white ${className}`}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>}
        {helperText && !error && (
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{helperText}</p>
        )}
      </div>
    )
  }
)

Select.displayName = 'Select'

/**
 * Checkbox Component
 *
 * A reusable checkbox component with label support.
 */
interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  helperText?: string
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, helperText, className = '', ...props }, ref) => {
    return (
      <div className="flex flex-col">
        <label className="flex items-center">
          <input
            ref={ref}
            type="checkbox"
            className={`h-4 w-4 rounded border-gray-300 text-[#5200ff] transition-colors focus:ring-2 focus:ring-[#5200ff] dark:border-gray-600 dark:bg-gray-800 ${className}`}
            {...props}
          />
          {label && (
            <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              {label}
            </span>
          )}
        </label>
        {helperText && (
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{helperText}</p>
        )}
      </div>
    )
  }
)

Checkbox.displayName = 'Checkbox'

/**
 * Radio Component
 *
 * A reusable radio button component with label support.
 */
interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  helperText?: string
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ label, helperText, className = '', ...props }, ref) => {
    return (
      <div className="flex flex-col">
        <label className="flex items-center">
          <input
            ref={ref}
            type="radio"
            className={`h-4 w-4 border-gray-300 text-[#5200ff] transition-colors focus:ring-2 focus:ring-[#5200ff] dark:border-gray-600 dark:bg-gray-800 ${className}`}
            {...props}
          />
          {label && (
            <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              {label}
            </span>
          )}
        </label>
        {helperText && (
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{helperText}</p>
        )}
      </div>
    )
  }
)

Radio.displayName = 'Radio'

/**
 * FormGroup Component
 *
 * A wrapper component for grouping form fields together.
 */
interface FormGroupProps {
  children: ReactNode
  className?: string
}

export const FormGroup: React.FC<FormGroupProps> = ({ children, className = '' }) => {
  return <div className={`space-y-4 ${className}`}>{children}</div>
}
