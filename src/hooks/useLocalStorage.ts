import { useState, useEffect, useCallback } from 'react'

/**
 * useLocalStorage Hook
 *
 * Manages state synchronized with localStorage.
 * Automatically syncs state to localStorage and recovers from it on mount.
 *
 * @param key - localStorage key
 * @param initialValue - Default value if not in localStorage
 * @returns [value, setValue, removeValue]
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void, () => void] {
  // Create state with initialValue as default
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      // Get value from localStorage
      const item = typeof window !== 'undefined' ? window.localStorage.getItem(key) : null

      if (item) {
        return JSON.parse(item) as T
      }

      return initialValue
    } catch (error) {
      if (import.meta.env.DEV) {
        console.warn(`Error reading localStorage key "${key}":`, error)
      }
      return initialValue
    }
  })

  // Update localStorage when state changes
  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      try {
        // Allow function updates like setState
        const valueToStore = value instanceof Function ? value(storedValue) : value

        setStoredValue(valueToStore)

        // Save to localStorage
        if (typeof window !== 'undefined') {
          window.localStorage.setItem(key, JSON.stringify(valueToStore))
        }
      } catch (error) {
        if (import.meta.env.DEV) {
          console.warn(`Error writing to localStorage key "${key}":`, error)
        }
      }
    },
    [key, storedValue]
  )

  // Remove value from localStorage
  const removeValue = useCallback(() => {
    try {
      setStoredValue(initialValue)
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key)
      }
    } catch (error) {
      if (import.meta.env.DEV) {
        console.warn(`Error removing localStorage key "${key}":`, error)
      }
    }
  }, [key, initialValue])

  return [storedValue, setValue, removeValue]
}

/**
 * useSessionStorage Hook
 *
 * Similar to useLocalStorage but uses sessionStorage instead.
 * Data persists only for the duration of the browser tab.
 */
export function useSessionStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void, () => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = typeof window !== 'undefined' ? window.sessionStorage.getItem(key) : null

      if (item) {
        return JSON.parse(item) as T
      }

      return initialValue
    } catch (error) {
      if (import.meta.env.DEV) {
        console.warn(`Error reading sessionStorage key "${key}":`, error)
      }
      return initialValue
    }
  })

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      try {
        const valueToStore = value instanceof Function ? value(storedValue) : value

        setStoredValue(valueToStore)

        if (typeof window !== 'undefined') {
          window.sessionStorage.setItem(key, JSON.stringify(valueToStore))
        }
      } catch (error) {
        if (import.meta.env.DEV) {
          console.warn(`Error writing to sessionStorage key "${key}":`, error)
        }
      }
    },
    [key, storedValue]
  )

  const removeValue = useCallback(() => {
    try {
      setStoredValue(initialValue)
      if (typeof window !== 'undefined') {
        window.sessionStorage.removeItem(key)
      }
    } catch (error) {
      if (import.meta.env.DEV) {
        console.warn(`Error removing sessionStorage key "${key}":`, error)
      }
    }
  }, [key, initialValue])

  return [storedValue, setValue, removeValue]
}
