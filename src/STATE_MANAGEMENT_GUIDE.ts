/**
 * STATE MANAGEMENT GUIDE
 *
 * This file documents the client-side state management system using React hooks and Context API.
 * All state management utilities are located in:
 * - src/contexts/ - Context providers and hooks
 * - src/hooks/ - Custom hooks for state management
 *
 * QUICK START
 * ===========
 *
 * The application is already configured with all necessary providers in src/main.tsx.
 * You can start using state management hooks immediately in any component.
 *
 *
 * CONTEXT API PROVIDERS
 * =====================
 *
 * 1. ThemeProvider / useTheme
 *    Location: src/contexts/ThemeContext.tsx
 *    Purpose: Manage application theme (light/dark mode)
 *
 *    Usage:
 *    ```tsx
 *    import { useTheme } from '@/contexts'
 *
 *    function MyComponent() {
 *      const { theme, toggleTheme, setTheme } = useTheme()
 *
 *      return (
 *        <button onClick={toggleTheme}>
 *          Current: {theme}
 *        </button>
 *      )
 *    }
 *    ```
 *
 *    Features:
 *    - Automatically persists theme to localStorage
 *    - Applies dark class to document root for Tailwind CSS
 *    - Respects system color scheme preference on first load
 *    - Methods: toggleTheme(), setTheme('light' | 'dark')
 *
 *
 * 2. NotificationProvider / useNotification / useNotificationActions
 *    Location: src/contexts/NotificationContext.tsx
 *    Purpose: Display toast notifications
 *
 *    Usage:
 *    ```tsx
 *    import { useNotificationActions } from '@/contexts'
 *
 *    function MyComponent() {
 *      const notifications = useNotificationActions()
 *
 *      return (
 *        <button onClick={() => notifications.success('Done!')}>
 *          Show Notification
 *        </button>
 *      )
 *    }
 *    ```
 *
 *    Features:
 *    - useNotification() - Full context with manual notification management
 *    - useNotificationActions() - Convenience hook with success/error/warning/info methods
 *    - Auto-remove notifications after 5000ms (configurable)
 *    - Notification types: success, error, warning, info
 *    - NotificationContainer component displays all notifications
 *
 *    Methods:
 *    - addNotification(message, type?, duration?) -> id
 *    - removeNotification(id)
 *    - clearNotifications()
 *    - success(message, duration?)
 *    - error(message, duration?)
 *    - warning(message, duration?)
 *    - info(message, duration?)
 *
 *
 * 3. FormProvider / useForm / useFormField
 *    Location: src/contexts/FormContext.tsx
 *    Purpose: Global form state management
 *
 *    Usage with useForm():
 *    ```tsx
 *    import { useForm } from '@/contexts'
 *
 *    function MyForm() {
 *      const {
 *        formData,
 *        errors,
 *        touched,
 *        updateField,
 *        setErrors,
 *        resetForm,
 *      } = useForm()
 *
 *      return (
 *        <input
 *          value={formData.name || ''}
 *          onChange={(e) => updateField('name', e.target.value)}
 *        />
 *      )
 *    }
 *    ```
 *
 *    Usage with useFormField():
 *    ```tsx
 *    import { useFormField } from '@/contexts'
 *
 *    function MyFormField() {
 *      const { value, error, isTouched, setValue, setTouched } = useFormField('email')
 *
 *      return (
 *        <>
 *          <input value={value} onChange={(e) => setValue(e.target.value)} />
 *          {isTouched && error && <p>{error}</p>}
 *        </>
 *      )
 *    }
 *    ```
 *
 *    Features:
 *    - Centralized form state
 *    - Field-level error tracking
 *    - Touched field tracking
 *    - Dirty state detection
 *    - Submission state
 *
 *    Methods:
 *    - updateField(name, value)
 *    - updateFields(updates)
 *    - setErrors(errors)
 *    - setFieldError(name, error)
 *    - markAsTouched(name)
 *    - markAsUntouched(name)
 *    - resetForm(initialData?)
 *    - getFieldError(name)
 *    - isTouched(name)
 *    - isFieldDirty(name, initialValue?)
 *
 *
 * CUSTOM HOOKS
 * ============
 *
 * 1. useLocalStorage<T>(key, initialValue)
 *    Location: src/hooks/useLocalStorage.ts
 *    Purpose: Sync state with localStorage for persistence
 *
 *    Usage:
 *    ```tsx
 *    import { useLocalStorage } from '@/hooks'
 *
 *    function MyComponent() {
 *      const [name, setName, removeName] = useLocalStorage('user-name', 'John')
 *
 *      return (
 *        <>
 *          <input value={name} onChange={(e) => setName(e.target.value)} />
 *          <button onClick={removeName}>Clear</button>
 *        </>
 *      )
 *    }
 *    ```
 *
 *    Features:
 *    - Persists to localStorage automatically
 *    - Supports function updates like setState
 *    - Safe JSON serialization
 *    - Error handling for quota exceeded
 *    - Works with complex objects
 *
 *
 * 2. useSessionStorage<T>(key, initialValue)
 *    Location: src/hooks/useLocalStorage.ts
 *    Purpose: Sync state with sessionStorage (cleared when tab closes)
 *
 *    Usage: Same as useLocalStorage, but data doesn't persist after browser closes
 *
 *
 * 3. useToggle(initialValue?)
 *    Location: src/hooks/useToggle.ts
 *    Purpose: Manage simple boolean state with toggle methods
 *
 *    Usage:
 *    ```tsx
 *    import { useToggle } from '@/hooks'
 *
 *    function MyComponent() {
 *      const [isOpen, toggle, setTrue, setFalse] = useToggle(false)
 *
 *      return (
 *        <button onClick={toggle}>
 *          {isOpen ? 'Close' : 'Open'}
 *        </button>
 *      )
 *    }
 *    ```
 *
 *    Returns: [value, toggle, setTrue, setFalse]
 *
 *
 * 4. useBoolean(initialValue?)
 *    Location: src/hooks/useToggle.ts
 *    Purpose: Enhanced boolean state with named methods
 *
 *    Usage:
 *    ```tsx
 *    import { useBoolean } from '@/hooks'
 *
 *    function MyComponent() {
 *      const { value, toggle, setTrue, setFalse } = useBoolean(false)
 *
 *      return <button onClick={toggle}>{value ? 'On' : 'Off'}</button>
 *    }
 *    ```
 *
 *    Returns: { value, setValue, toggle, setTrue, setFalse }
 *
 *
 * 5. useDebounce<T>(value, delay?)
 *    Location: src/hooks/useDebounce.ts
 *    Purpose: Debounce a value (useful for search, auto-save)
 *
 *    Usage:
 *    ```tsx
 *    import { useDebounce } from '@/hooks'
 *
 *    function SearchComponent() {
 *      const [search, setSearch] = useState('')
 *      const debouncedSearch = useDebounce(search, 800)
 *
 *      useEffect(() => {
 *        // This runs 800ms after user stops typing
 *        console.log('Perform search for:', debouncedSearch)
 *      }, [debouncedSearch])
 *
 *      return (
 *        <input
 *          value={search}
 *          onChange={(e) => setSearch(e.target.value)}
 *        />
 *      )
 *    }
 *    ```
 *
 *    Features:
 *    - Default delay: 500ms
 *    - Returns debounced value
 *    - Useful for search, API calls, auto-save
 *
 *
 * 6. useDebouncedCallback<T>(callback, delay?)
 *    Location: src/hooks/useDebounce.ts
 *    Purpose: Debounce a function execution
 *
 *    Usage:
 *    ```tsx
 *    import { useDebouncedCallback } from '@/hooks'
 *
 *    function AutoSave() {
 *      const saveData = useDebouncedCallback(() => {
 *        console.log('Saving data...')
 *      }, 1000)
 *
 *      return <input onChange={saveData} />
 *    }
 *    ```
 *
 *
 * 7. useThrottle<T>(callback, delay?)
 *    Location: src/hooks/useDebounce.ts
 *    Purpose: Throttle function execution (limit frequency)
 *
 *    Usage:
 *    ```tsx
 *    import { useThrottle } from '@/hooks'
 *
 *    function ScrollHandler() {
 *      const handleScroll = useThrottle(() => {
 *        console.log('Scroll event (throttled)')
 *      }, 200)
 *
 *      useEffect(() => {
 *        window.addEventListener('scroll', handleScroll)
 *        return () => window.removeEventListener('scroll', handleScroll)
 *      }, [handleScroll])
 *    }
 *    ```
 *
 *    Features:
 *    - Limits function calls to specified interval
 *    - Useful for scroll, resize, mousemove events
 *
 *
 * 8. useAsync<T>(asyncFunction, immediate?)
 *    Location: src/hooks/useAsync.ts
 *    Purpose: Manage async operations (loading, data, error)
 *
 *    Usage:
 *    ```tsx
 *    import { useAsync } from '@/hooks'
 *
 *    function DataComponent() {
 *      const { data, isLoading, error, execute } = useAsync(
 *        async () => {
 *          const response = await fetch('/api/data')
 *          return response.json()
 *        },
 *        true // Execute immediately
 *      )
 *
 *      if (isLoading) return <p>Loading...</p>
 *      if (error) return <p>Error: {error.message}</p>
 *      return <div>{JSON.stringify(data)}</div>
 *    }
 *    ```
 *
 *    Features:
 *    - Auto-executes on mount (if immediate=true)
 *    - Handles race conditions with cleanup
 *    - Status: 'idle', 'loading', 'success', 'error'
 *    - execute() to manually trigger
 *
 *
 * 9. useFetch<T>(url, options?, immediate?)
 *    Location: src/hooks/useAsync.ts
 *    Purpose: Simplified hook for fetching data from URL
 *
 *    Usage:
 *    ```tsx
 *    import { useFetch } from '@/hooks'
 *
 *    function UserComponent() {
 *      const { data, isLoading, error, refetch } = useFetch(
 *        '/api/users',
 *        { method: 'GET' },
 *        true // Execute immediately
 *      )
 *
 *      return (
 *        <>
 *          {isLoading && <p>Loading...</p>}
 *          {data && <p>{data.name}</p>}
 *          <button onClick={refetch}>Refresh</button>
 *        </>
 *      )
 *    }
 *    ```
 *
 *    Features:
 *    - Built on useAsync
 *    - Automatic JSON parsing
 *    - HTTP error checking
 *    - refetch() method to reload data
 *
 *
 * PATTERNS & BEST PRACTICES
 * =========================
 *
 * 1. Combining Hooks
 *    Multiple hooks can work together:
 *
 *    ```tsx
 *    function ComplexForm() {
 *      const { formData, updateField, errors } = useForm()
 *      const notifications = useNotificationActions()
 *      const [savedData, setSavedData] = useLocalStorage('form-data', null)
 *
 *      // Combine hooks as needed
 *    }
 *    ```
 *
 * 2. Custom Hook Composition
 *    Create domain-specific hooks:
 *
 *    ```tsx
 *    function useUserForm() {
 *      const form = useForm()
 *      const { success, error } = useNotificationActions()
 *
 *      const submit = async () => {
 *        try {
 *          await api.updateUser(form.formData)
 *          success('User updated')
 *          form.resetForm()
 *        } catch (err) {
 *          error('Failed to update user')
 *        }
 *      }
 *
 *      return { ...form, submit }
 *    }
 *    ```
 *
 * 3. Performance Optimization
 *    Use useCallback with debouncing:
 *
 *    ```tsx
 *    const debouncedSearch = useDebouncedCallback((term) => {
 *      fetch(`/api/search?q=${term}`)
 *    }, 500)
 *    ```
 *
 * 4. Error Handling
 *    Always handle errors in async operations:
 *
 *    ```tsx
 *    const { error, execute } = useAsync(fetchData, false)
 *
 *    if (error) {
 *      console.error('Operation failed:', error.message)
 *    }
 *    ```
 *
 *
 * FILE STRUCTURE
 * ==============
 *
 * src/
 * ├── contexts/
 * │   ├── index.ts                    # Central exports
 * │   ├── ThemeContext.tsx            # Theme provider & hook
 * │   ├── NotificationContext.tsx     # Notification provider & hooks
 * │   └── FormContext.tsx             # Form provider & hooks
 * ├── hooks/
 * │   ├── index.ts                    # Central exports
 * │   ├── useLocalStorage.ts          # localStorage & sessionStorage hooks
 * │   ├── useToggle.ts                # Boolean state hooks
 * │   ├── useDebounce.ts              # Debounce & throttle hooks
 * │   └── useAsync.ts                 # Async operation hooks
 * ├── components/
 * │   └── NotificationContainer.tsx   # Displays notifications
 * ├── main.tsx                        # Providers configured here
 * └── App.tsx                         # Includes NotificationContainer
 *
 *
 * DEMO PAGE
 * =========
 *
 * View the interactive demo at /state-management
 * This page showcases all features with working examples.
 *
 */

export {}
