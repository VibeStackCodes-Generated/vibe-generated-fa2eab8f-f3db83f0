import { useState, useEffect, useCallback, useRef } from 'react'

/**
 * Async State
 */
interface AsyncState<T> {
  status: 'idle' | 'loading' | 'success' | 'error'
  data: T | null
  error: Error | null
  isLoading: boolean
}

/**
 * useAsync Hook
 *
 * Manages async operation state (loading, data, error).
 * Automatically handles cleanup and race conditions.
 *
 * @param asyncFunction - Async function to execute
 * @param immediate - Whether to execute immediately on mount
 * @returns Current state and execute function
 */
export function useAsync<T>(
  asyncFunction: () => Promise<T>,
  immediate: boolean = true
): AsyncState<T> & {
  execute: () => Promise<void>
} {
  const [state, setState] = useState<AsyncState<T>>({
    status: 'idle',
    data: null,
    error: null,
    isLoading: false,
  })

  // Use ref to track if component is mounted
  const isMountedRef = useRef(true)

  const execute = useCallback(async () => {
    setState({ status: 'loading', data: null, error: null, isLoading: true })

    try {
      const response = await asyncFunction()

      if (isMountedRef.current) {
        setState({
          status: 'success',
          data: response,
          error: null,
          isLoading: false,
        })
      }
    } catch (error) {
      if (isMountedRef.current) {
        setState({
          status: 'error',
          data: null,
          error: error instanceof Error ? error : new Error(String(error)),
          isLoading: false,
        })
      }
    }
  }, [asyncFunction])

  useEffect(() => {
    if (immediate) {
      execute()
    }

    return () => {
      isMountedRef.current = false
    }
  }, [execute, immediate])

  return {
    ...state,
    execute,
  }
}

/**
 * useFetch Hook
 *
 * Convenience hook for fetching data from a URL.
 *
 * @param url - URL to fetch from
 * @param options - Fetch options
 * @param immediate - Whether to fetch immediately on mount
 */
export function useFetch<T>(
  url: string,
  options?: RequestInit,
  immediate: boolean = true
): AsyncState<T> & {
  refetch: () => Promise<void>
} {
  const asyncFunction = useCallback(async () => {
    const response = await fetch(url, options)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return response.json() as Promise<T>
  }, [url, options])

  const result = useAsync(asyncFunction, immediate)

  return {
    ...result,
    refetch: result.execute,
  }
}
