import { useState, useCallback } from 'react'

/**
 * useToggle Hook
 *
 * Manages a boolean state with helper functions for toggling.
 *
 * @param initialValue - Initial boolean value
 * @returns [value, toggle, setTrue, setFalse]
 */
export function useToggle(
  initialValue: boolean = false
): [boolean, () => void, () => void, () => void] {
  const [value, setValue] = useState(initialValue)

  const toggle = useCallback(() => {
    setValue(prev => !prev)
  }, [])

  const setTrue = useCallback(() => {
    setValue(true)
  }, [])

  const setFalse = useCallback(() => {
    setValue(false)
  }, [])

  return [value, toggle, setTrue, setFalse]
}

/**
 * useBoolean Hook
 *
 * Enhanced version of useToggle with named methods.
 */
export function useBoolean(initialValue: boolean = false) {
  const [value, setValue] = useState(initialValue)

  return {
    value,
    setValue,
    toggle: useCallback(() => setValue(v => !v), []),
    setTrue: useCallback(() => setValue(true), []),
    setFalse: useCallback(() => setValue(false), []),
  }
}
