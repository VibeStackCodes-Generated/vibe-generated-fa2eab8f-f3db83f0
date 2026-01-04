/**
 * Custom Hooks
 *
 * Central export for all custom hooks used in the application.
 */

export { useLocalStorage, useSessionStorage } from './useLocalStorage'
export { useAsync, useFetch } from './useAsync'
export { useToggle, useBoolean } from './useToggle'
export { useDebounce, useThrottle, useDebouncedCallback } from './useDebounce'

// Example hooks showing common patterns
export {
  useSearchWithDebounce,
  usePaginatedData,
  useLocalFilter,
  useSimpleFormField,
  useApi,
  useCountdown,
  useLocalCache,
  useIntersectionObserver,
} from './useExample'
