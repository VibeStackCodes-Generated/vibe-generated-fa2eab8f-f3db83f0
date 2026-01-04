/**
 * HOOKS REFERENCE - Quick API Reference
 *
 * This file provides a quick reference for all available hooks.
 * For detailed documentation, see STATE_MANAGEMENT_GUIDE.ts
 */

/**
 * ============================================================================
 * CONTEXT HOOKS
 * ============================================================================
 */

/**
 * useTheme() - Theme Management
 * Location: src/contexts/ThemeContext.tsx
 *
 * Returns: {
 *   theme: 'light' | 'dark'
 *   toggleTheme: () => void
 *   setTheme: (theme: 'light' | 'dark') => void
 * }
 *
 * Example:
 *   const { theme, toggleTheme } = useTheme()
 */
export interface UseThemeReturn {
  theme: 'light' | 'dark'
  toggleTheme: () => void
  setTheme: (theme: 'light' | 'dark') => void
}

/**
 * useNotification() - Full Notification Control
 * Location: src/contexts/NotificationContext.tsx
 *
 * Returns: {
 *   notifications: Notification[]
 *   addNotification: (message, type?, duration?) => string (id)
 *   removeNotification: (id) => void
 *   clearNotifications: () => void
 * }
 *
 * Example:
 *   const { notifications, addNotification } = useNotification()
 *   addNotification('Success!', 'success', 5000)
 */
export interface Notification {
  id: string
  message: string
  type: 'success' | 'error' | 'warning' | 'info'
  duration?: number
  timestamp: number
}

/**
 * useNotificationActions() - Convenience Notification Methods
 * Location: src/contexts/NotificationContext.tsx
 *
 * Returns: {
 *   success: (message, duration?) => string
 *   error: (message, duration?) => string
 *   warning: (message, duration?) => string
 *   info: (message, duration?) => string
 * }
 *
 * Example:
 *   const { success, error } = useNotificationActions()
 *   success('Operation completed!')
 */

/**
 * useForm() - Global Form State
 * Location: src/contexts/FormContext.tsx
 *
 * Returns: {
 *   formData: Record<string, unknown>
 *   errors: Record<string, string | undefined>
 *   touched: Set<string>
 *   isSubmitting: boolean
 *   updateField: (name, value) => void
 *   updateFields: (updates) => void
 *   setErrors: (errors) => void
 *   setFieldError: (name, error) => void
 *   markAsTouched: (name) => void
 *   markAsUntouched: (name) => void
 *   resetForm: (initialData?) => void
 *   setIsSubmitting: (value) => void
 *   getFieldError: (name) => string | undefined
 *   isTouched: (name) => boolean
 *   isFieldDirty: (name, initialValue?) => boolean
 * }
 *
 * Example:
 *   const { formData, updateField } = useForm()
 *   updateField('email', 'user@example.com')
 */

/**
 * useFormField(name) - Individual Field Management
 * Location: src/contexts/FormContext.tsx
 *
 * Params: name: string
 *
 * Returns: {
 *   value: unknown
 *   error: string | undefined
 *   isTouched: boolean
 *   setValue: (val) => void
 *   setTouched: () => void
 *   setUntouched: () => void
 * }
 *
 * Example:
 *   const { value, error, setValue } = useFormField('email')
 */

/**
 * ============================================================================
 * STORAGE HOOKS
 * ============================================================================
 */

/**
 * useLocalStorage<T>(key, initialValue)
 * Location: src/hooks/useLocalStorage.ts
 *
 * Params:
 *   key: string
 *   initialValue: T
 *
 * Returns: [value: T, setValue: (T | (prev: T) => T) => void, remove: () => void]
 *
 * Example:
 *   const [name, setName, removeName] = useLocalStorage('user-name', 'John')
 */

/**
 * useSessionStorage<T>(key, initialValue)
 * Location: src/hooks/useLocalStorage.ts
 *
 * Params:
 *   key: string
 *   initialValue: T
 *
 * Returns: [value: T, setValue: (T | (prev: T) => T) => void, remove: () => void]
 *
 * Example:
 *   const [temp, setTemp] = useSessionStorage('temp-value', '')
 */

/**
 * ============================================================================
 * BOOLEAN/TOGGLE HOOKS
 * ============================================================================
 */

/**
 * useToggle(initialValue?)
 * Location: src/hooks/useToggle.ts
 *
 * Params:
 *   initialValue: boolean (default: false)
 *
 * Returns: [value: boolean, toggle: () => void, setTrue: () => void, setFalse: () => void]
 *
 * Example:
 *   const [isOpen, toggle] = useToggle(false)
 */

/**
 * useBoolean(initialValue?)
 * Location: src/hooks/useToggle.ts
 *
 * Params:
 *   initialValue: boolean (default: false)
 *
 * Returns: {
 *   value: boolean
 *   setValue: (value: boolean) => void
 *   toggle: () => void
 *   setTrue: () => void
 *   setFalse: () => void
 * }
 *
 * Example:
 *   const { value, toggle } = useBoolean(false)
 */

/**
 * ============================================================================
 * PERFORMANCE/TIMING HOOKS
 * ============================================================================
 */

/**
 * useDebounce<T>(value, delay?)
 * Location: src/hooks/useDebounce.ts
 *
 * Params:
 *   value: T
 *   delay: number (default: 500)
 *
 * Returns: T (debounced value)
 *
 * Example:
 *   const [search, setSearch] = useState('')
 *   const debouncedSearch = useDebounce(search, 800)
 */

/**
 * useDebouncedCallback<T>(callback, delay?)
 * Location: src/hooks/useDebounce.ts
 *
 * Params:
 *   callback: (...args: any[]) => any
 *   delay: number (default: 500)
 *
 * Returns: debounced function
 *
 * Example:
 *   const save = useDebouncedCallback(saveData, 1000)
 */

/**
 * useThrottle<T>(callback, delay?)
 * Location: src/hooks/useDebounce.ts
 *
 * Params:
 *   callback: (...args: any[]) => any
 *   delay: number (default: 500)
 *
 * Returns: throttled function
 *
 * Example:
 *   const handleScroll = useThrottle(onScroll, 200)
 */

/**
 * ============================================================================
 * ASYNC/DATA HOOKS
 * ============================================================================
 */

/**
 * useAsync<T>(asyncFunction, immediate?)
 * Location: src/hooks/useAsync.ts
 *
 * Params:
 *   asyncFunction: () => Promise<T>
 *   immediate: boolean (default: true)
 *
 * Returns: {
 *   status: 'idle' | 'loading' | 'success' | 'error'
 *   data: T | null
 *   error: Error | null
 *   isLoading: boolean
 *   execute: () => Promise<void>
 * }
 *
 * Example:
 *   const { data, isLoading, error, execute } = useAsync(fetchData, true)
 */

/**
 * useFetch<T>(url, options?, immediate?)
 * Location: src/hooks/useAsync.ts
 *
 * Params:
 *   url: string
 *   options: RequestInit (optional)
 *   immediate: boolean (default: true)
 *
 * Returns: {
 *   status: 'idle' | 'loading' | 'success' | 'error'
 *   data: T | null
 *   error: Error | null
 *   isLoading: boolean
 *   refetch: () => Promise<void>
 * }
 *
 * Example:
 *   const { data, isLoading, refetch } = useFetch('/api/users')
 */

/**
 * ============================================================================
 * EXAMPLE HOOKS (Practical Patterns)
 * ============================================================================
 */

/**
 * useSearchWithDebounce(searchFunction)
 * Location: src/hooks/useExample.ts
 *
 * Params:
 *   searchFunction: (query: string) => Promise<any[]>
 *
 * Returns: {
 *   query: string
 *   setQuery: (q: string) => void
 *   results: any[]
 *   isSearching: boolean
 * }
 */

/**
 * usePaginatedData<T>(items, itemsPerPage?)
 * Location: src/hooks/useExample.ts
 *
 * Params:
 *   items: T[]
 *   itemsPerPage: number (default: 10)
 *
 * Returns: {
 *   currentPage: number
 *   totalPages: number
 *   currentItems: T[]
 *   goToPage: (page: number) => void
 *   nextPage: () => void
 *   prevPage: () => void
 *   hasNextPage: boolean
 *   hasPrevPage: boolean
 * }
 */

/**
 * useLocalFilter<T>(items, filterKey, filterFunction)
 * Location: src/hooks/useExample.ts
 *
 * Params:
 *   items: T[]
 *   filterKey: string (localStorage key)
 *   filterFunction: (items, filter) => T[]
 *
 * Returns: {
 *   filterValue: string
 *   setFilterValue: (value: string) => void
 *   filteredItems: T[]
 * }
 */

/**
 * useSimpleFormField<T>(initialValue, validator?)
 * Location: src/hooks/useExample.ts
 *
 * Params:
 *   initialValue: T
 *   validator: (value: T) => string | null (optional)
 *
 * Returns: {
 *   value: T
 *   setValue: (val: T) => void
 *   error: string | null
 *   isTouched: boolean
 *   setIsTouched: (val: boolean) => void
 *   handleBlur: () => void
 *   validate: () => boolean
 *   reset: () => void
 * }
 */

/**
 * useApi<T>(url, options?)
 * Location: src/hooks/useExample.ts
 *
 * Params:
 *   url: string
 *   options: { cacheTime?: number, enabled?: boolean }
 *
 * Returns: {
 *   data: T | null
 *   isLoading: boolean
 *   error: Error | null
 *   execute: () => Promise<void>
 *   refetch: () => Promise<void>
 * }
 */

/**
 * useCountdown(initialSeconds)
 * Location: src/hooks/useExample.ts
 *
 * Params:
 *   initialSeconds: number
 *
 * Returns: {
 *   seconds: number
 *   isActive: boolean
 *   start: () => void
 *   stop: () => void
 *   reset: () => void
 *   isFinished: boolean
 * }
 */

/**
 * useLocalCache<T>(key, fetcher, ttl?)
 * Location: src/hooks/useExample.ts
 *
 * Params:
 *   key: string
 *   fetcher: () => Promise<T>
 *   ttl: number (default: 5 minutes)
 *
 * Returns: {
 *   data: T | null
 *   isLoading: boolean
 *   error: Error | null
 *   refetch: () => Promise<void>
 *   invalidate: () => void
 * }
 */

/**
 * useIntersectionObserver(options?)
 * Location: src/hooks/useExample.ts
 *
 * Params:
 *   options: IntersectionObserverInit (optional)
 *
 * Returns: {
 *   ref: React.RefObject<HTMLDivElement>
 *   isVisible: boolean
 * }
 */

export {}
