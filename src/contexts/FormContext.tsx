import { createContext, useContext, useState, ReactNode, useCallback } from 'react'

/**
 * Form Context
 *
 * Manages form state globally, including validation and error handling.
 * Useful for multi-step forms or complex form workflows.
 */

export interface FormErrors {
  [key: string]: string | undefined
}

export interface FormData {
  [key: string]: unknown
}

interface FormContextType {
  formData: FormData
  errors: FormErrors
  touched: Set<string>
  isSubmitting: boolean
  updateField: (name: string, value: unknown) => void
  updateFields: (updates: FormData) => void
  setErrors: (errors: FormErrors) => void
  setFieldError: (name: string, error: string | undefined) => void
  markAsTouched: (name: string) => void
  markAsUntouched: (name: string) => void
  resetForm: (initialData?: FormData) => void
  setIsSubmitting: (value: boolean) => void
  getFieldError: (name: string) => string | undefined
  isTouched: (name: string) => boolean
  isFieldDirty: (name: string, initialValue?: unknown) => boolean
}

const FormContext = createContext<FormContextType | undefined>(undefined)

interface FormProviderProps {
  children: ReactNode
  initialData?: FormData
}

export function FormProvider({ children, initialData = {} }: FormProviderProps) {
  const [formData, setFormData] = useState<FormData>(initialData)
  const [errors, setErrorsState] = useState<FormErrors>({})
  const [touched, setTouched] = useState<Set<string>>(new Set())
  const [isSubmitting, setIsSubmitting] = useState(false)

  const updateField = useCallback((name: string, value: unknown) => {
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }, [])

  const updateFields = useCallback((updates: FormData) => {
    setFormData(prev => ({
      ...prev,
      ...updates,
    }))
  }, [])

  const setErrors = useCallback((newErrors: FormErrors) => {
    setErrorsState(newErrors)
  }, [])

  const setFieldError = useCallback((name: string, error: string | undefined) => {
    setErrorsState(prev => ({
      ...prev,
      [name]: error,
    }))
  }, [])

  const markAsTouched = useCallback((name: string) => {
    setTouched(prev => new Set([...prev, name]))
  }, [])

  const markAsUntouched = useCallback((name: string) => {
    setTouched(prev => {
      const newSet = new Set(prev)
      newSet.delete(name)
      return newSet
    })
  }, [])

  const resetForm = useCallback((newInitialData?: FormData) => {
    setFormData(newInitialData || initialData)
    setErrorsState({})
    setTouched(new Set())
    setIsSubmitting(false)
  }, [initialData])

  const getFieldError = useCallback((name: string) => {
    return errors[name]
  }, [errors])

  const isTouched = useCallback((name: string) => {
    return touched.has(name)
  }, [touched])

  const isFieldDirty = useCallback(
    (name: string, initialValue?: unknown) => {
      const currentValue = formData[name]
      return initialValue !== undefined ? currentValue !== initialValue : false
    },
    [formData]
  )

  const value: FormContextType = {
    formData,
    errors,
    touched,
    isSubmitting,
    updateField,
    updateFields,
    setErrors,
    setFieldError,
    markAsTouched,
    markAsUntouched,
    resetForm,
    setIsSubmitting,
    getFieldError,
    isTouched,
    isFieldDirty,
  }

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>
}

/**
 * Hook to use form context
 *
 * @throws Error if used outside FormProvider
 */
export function useForm(): FormContextType {
  const context = useContext(FormContext)
  if (context === undefined) {
    throw new Error('useForm must be used within a FormProvider')
  }
  return context
}

/**
 * Hook to manage a single form field with the form context
 */
export function useFormField(name: string) {
  const { formData, errors, touched, updateField, markAsTouched, markAsUntouched } = useForm()

  const value = formData[name] as unknown
  const error = errors[name]
  const isTouched = touched.has(name)

  return {
    value,
    error,
    isTouched,
    setValue: (val: unknown) => updateField(name, val),
    setTouched: () => markAsTouched(name),
    setUntouched: () => markAsUntouched(name),
  }
}
