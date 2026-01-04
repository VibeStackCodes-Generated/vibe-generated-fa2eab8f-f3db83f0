/**
 * EXAMPLE HOOKS & PATTERNS
 *
 * This file contains practical examples of common use cases.
 * These are reference implementations showing best practices.
 *
 * Copy and adapt these patterns for your own needs.
 */

import { useState, useCallback, useRef } from 'react'
import { useLocalStorage, useDebounce, useAsync } from './index'

/**
 * EXAMPLE 1: useSearchWithDebounce
 *
 * A practical hook for implementing search functionality.
 * Debounces search input and fetches results.
 */
export function useSearchWithDebounce(
  searchFunction: (query: string) => Promise<any[]>
) {
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query, 500)
  const [results, setResults] = useState<any[]>([])
  const [isSearching, setIsSearching] = useState(false)

  // Fetch results when debounced query changes
  const executeSearch = useCallback(async () => {
    if (!debouncedQuery) {
      setResults([])
      return
    }

    setIsSearching(true)
    try {
      const data = await searchFunction(debouncedQuery)
      setResults(data)
    } catch (error) {
      console.error('Search failed:', error)
      setResults([])
    } finally {
      setIsSearching(false)
    }
  }, [debouncedQuery, searchFunction])

  // Trigger search when debounced query changes
  const [lastSearched, setLastSearched] = useState('')

  if (debouncedQuery !== lastSearched) {
    setLastSearched(debouncedQuery)
    executeSearch()
  }

  return {
    query,
    setQuery,
    results,
    isSearching,
  }
}

/**
 * EXAMPLE 2: usePaginatedData
 *
 * Manages pagination state for lists/tables.
 */
export function usePaginatedData<T>(
  items: T[],
  itemsPerPage: number = 10
) {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(items.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentItems = items.slice(startIndex, endIndex)

  const goToPage = useCallback((page: number) => {
    const validPage = Math.max(1, Math.min(page, totalPages))
    setCurrentPage(validPage)
  }, [totalPages])

  const nextPage = useCallback(() => {
    goToPage(currentPage + 1)
  }, [currentPage, goToPage])

  const prevPage = useCallback(() => {
    goToPage(currentPage - 1)
  }, [currentPage, goToPage])

  return {
    currentPage,
    totalPages,
    currentItems,
    goToPage,
    nextPage,
    prevPage,
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1,
  }
}

/**
 * EXAMPLE 3: useLocalFilter
 *
 * Filter items in local state with persistence.
 */
export function useLocalFilter<T>(
  items: T[],
  filterKey: string,
  filterFunction: (items: T[], filter: string) => T[]
) {
  const [filterValue, setFilterValue] = useLocalStorage(filterKey, '')

  const filteredItems = filterFunction(items, filterValue)

  return {
    filterValue,
    setFilterValue,
    filteredItems,
  }
}

/**
 * EXAMPLE 4: useFormField
 *
 * A standalone hook for managing a single form field with validation.
 */
export function useSimpleFormField<T = string>(
  initialValue: T,
  validator?: (value: T) => string | null
) {
  const [value, setValue] = useState(initialValue)
  const [error, setError] = useState<string | null>(null)
  const [isTouched, setIsTouched] = useState(false)

  const validate = useCallback(() => {
    if (validator) {
      const validationError = validator(value)
      setError(validationError)
      return !validationError
    }
    return true
  }, [value, validator])

  const handleBlur = useCallback(() => {
    setIsTouched(true)
    validate()
  }, [validate])

  const reset = useCallback(() => {
    setValue(initialValue)
    setError(null)
    setIsTouched(false)
  }, [initialValue])

  return {
    value,
    setValue,
    error: isTouched ? error : null,
    isTouched,
    setIsTouched,
    handleBlur,
    validate,
    reset,
  }
}

/**
 * EXAMPLE 5: useApi
 *
 * A comprehensive API call hook with caching.
 */
interface UseApiOptions {
  cacheTime?: number // Cache duration in ms
  enabled?: boolean
}

export function useApi<T>(
  url: string,
  options: UseApiOptions = {}
) {
  const { cacheTime = 5 * 60 * 1000, enabled = true } = options
  const cacheRef = useRef<{ data: T; timestamp: number } | null>(null)

  const fetchData = useCallback(async () => {
    // Check cache
    if (cacheRef.current) {
      const timeSinceCache = Date.now() - cacheRef.current.timestamp
      if (timeSinceCache < cacheTime) {
        return cacheRef.current.data
      }
    }

    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }

    const data = (await response.json()) as T
    cacheRef.current = { data, timestamp: Date.now() }
    return data
  }, [url, cacheTime])

  const result = useAsync(fetchData, enabled)

  const refetch = useCallback(() => {
    cacheRef.current = null
    return result.execute()
  }, [result])

  return {
    ...result,
    refetch,
  }
}

/**
 * EXAMPLE 6: useCountdown
 *
 * Countdown timer for various use cases (OTP, session timeout, etc.)
 */
export function useCountdown(initialSeconds: number) {
  const [seconds, setSeconds] = useState(initialSeconds)
  const [isActive, setIsActive] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const start = useCallback(() => {
    setIsActive(true)
  }, [])

  const stop = useCallback(() => {
    setIsActive(false)
  }, [])

  const reset = useCallback(() => {
    setSeconds(initialSeconds)
    setIsActive(false)
  }, [initialSeconds])

  // Timer effect
  React.useEffect(() => {
    if (!isActive) return

    intervalRef.current = setInterval(() => {
      setSeconds(prev => {
        if (prev <= 1) {
          setIsActive(false)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isActive])

  return {
    seconds,
    isActive,
    start,
    stop,
    reset,
    isFinished: seconds === 0,
  }
}

/**
 * EXAMPLE 7: useLocalCache
 *
 * Cache data in localStorage with expiration.
 */
export function useLocalCache<T>(key: string, fetcher: () => Promise<T>, ttl: number = 5 * 60 * 1000) {
  const [data, setData] = useState<T | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const cacheKey = `cache_${key}`
  const timestampKey = `cache_${key}_ts`

  const loadData = useCallback(async () => {
    setIsLoading(true)

    // Check localStorage cache
    const cached = localStorage.getItem(cacheKey)
    const timestamp = localStorage.getItem(timestampKey)

    if (cached && timestamp) {
      const age = Date.now() - parseInt(timestamp)
      if (age < ttl) {
        try {
          setData(JSON.parse(cached) as T)
          setIsLoading(false)
          return
        } catch (err) {
          console.error('Error parsing cached data:', err)
        }
      }
    }

    // Fetch fresh data
    try {
      const freshData = await fetcher()
      setData(freshData)
      localStorage.setItem(cacheKey, JSON.stringify(freshData))
      localStorage.setItem(timestampKey, Date.now().toString())
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'))
    } finally {
      setIsLoading(false)
    }
  }, [key, fetcher, ttl, cacheKey, timestampKey])

  React.useEffect(() => {
    loadData()
  }, [loadData])

  const invalidate = useCallback(() => {
    localStorage.removeItem(cacheKey)
    localStorage.removeItem(timestampKey)
    loadData()
  }, [cacheKey, timestampKey, loadData])

  return {
    data,
    isLoading,
    error,
    refetch: loadData,
    invalidate,
  }
}

/**
 * EXAMPLE 8: useIntersectionObserver
 *
 * Detect when an element enters viewport (useful for infinite scroll, lazy loading).
 */
export function useIntersectionObserver(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  React.useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting)
    }, options)

    const currentRef = ref.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [options])

  return { ref, isVisible }
}

// Export React for dependency
import React from 'react'
