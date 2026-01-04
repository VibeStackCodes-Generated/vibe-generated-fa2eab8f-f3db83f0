import { useState } from 'react'
import { Card, Button, Input } from '@/components'
import { useTheme } from '@/contexts'
import { useNotificationActions } from '@/contexts'
import { useLocalStorage, useToggle, useDebounce, useAsync } from '@/hooks'

/**
 * State Management Demo Page
 *
 * Demonstrates all available state management hooks and contexts:
 * - Theme management (useTheme)
 * - Notifications (useNotificationActions)
 * - Local Storage (useLocalStorage)
 * - Toggle State (useToggle)
 * - Debouncing (useDebounce)
 * - Async Operations (useAsync)
 */

export function StateManagementDemo() {
  const { theme, toggleTheme } = useTheme()
  const notifications = useNotificationActions()

  // useLocalStorage demo
  const [favoriteColor, setFavoriteColor] = useLocalStorage<string>(
    'favorite-color',
    '#5200ff'
  )

  // useToggle demo
  const [isExpanded, toggleExpanded] = useToggle(false)

  // useState for search input
  const [searchInput, setSearchInput] = useState('')

  // useDebounce demo - debounces the search input
  const debouncedSearchInput = useDebounce(searchInput, 800)

  // useAsync demo - simulates fetching data
  const mockFetchData = async () => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          id: 1,
          name: 'Sample Data',
          timestamp: new Date().toLocaleTimeString(),
        })
      }, 2000)
    })
  }

  const { data, isLoading, error, execute: refetchData } = useAsync(mockFetchData, false)

  const handleThemeToggle = () => {
    toggleTheme()
    notifications.success(
      `Theme switched to ${theme === 'light' ? 'dark' : 'light'} mode`,
      3000
    )
  }

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFavoriteColor(e.target.value)
    notifications.info(`Color saved: ${e.target.value}`, 2000)
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value)
  }

  const handleFetchClick = async () => {
    notifications.info('Fetching data...', 0)
    await refetchData()
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 md:px-6 lg:px-8 dark:bg-gray-950">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-4xl font-bold text-gray-900 dark:text-white">
            State Management Demo
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Explore React hooks and Context API for client-side state management
          </p>
        </div>

        {/* Theme Management */}
        <div className="mb-8">
          <Card>
            <Card.Header>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Theme Management (useTheme)
              </h2>
            </Card.Header>
            <Card.Body className="space-y-4">
              <p className="text-gray-600 dark:text-gray-400">
                Current theme: <strong>{theme}</strong>
              </p>
              <Button onClick={handleThemeToggle} variant="primary">
                Toggle Theme ({theme === 'light' ? 'Switch to Dark' : 'Switch to Light'})
              </Button>
              <p className="text-sm text-gray-500 dark:text-gray-500">
                The theme preference is automatically saved to localStorage and persists across
                sessions.
              </p>
            </Card.Body>
          </Card>
        </div>

        {/* Local Storage Demo */}
        <div className="mb-8">
          <Card>
            <Card.Header>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Local Storage (useLocalStorage)
              </h2>
            </Card.Header>
            <Card.Body className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Choose a favorite color:
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={favoriteColor}
                      onChange={handleColorChange}
                      className="h-12 w-20 rounded cursor-pointer border border-gray-300 dark:border-gray-600"
                    />
                    <span className="text-gray-600 dark:text-gray-400">{favoriteColor}</span>
                  </div>
                </div>
                <div
                  className="h-20 w-20 rounded-lg shadow-md flex-shrink-0 border-2 border-gray-200 dark:border-gray-700"
                  style={{ backgroundColor: favoriteColor }}
                />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-500">
                Your color choice is automatically saved to localStorage. Try refreshing the page
                - the color will persist!
              </p>
            </Card.Body>
          </Card>
        </div>

        {/* Toggle State Demo */}
        <div className="mb-8">
          <Card>
            <Card.Header>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Toggle State (useToggle)
              </h2>
            </Card.Header>
            <Card.Body className="space-y-4">
              <Button onClick={toggleExpanded} variant="outline">
                {isExpanded ? 'Collapse' : 'Expand'} Content
              </Button>
              {isExpanded && (
                <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800">
                  <p className="text-blue-900 dark:text-blue-200">
                    This content is toggled by the useToggle hook. It manages a simple boolean
                    state with convenient methods for toggling, setting to true, and setting to
                    false.
                  </p>
                </div>
              )}
            </Card.Body>
          </Card>
        </div>

        {/* Debounce Demo */}
        <div className="mb-8">
          <Card>
            <Card.Header>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Debounce (useDebounce)
              </h2>
            </Card.Header>
            <Card.Body className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Search (debounced after 800ms):
                </label>
                <Input
                  type="text"
                  placeholder="Type to search..."
                  value={searchInput}
                  onChange={handleSearch}
                  fullWidth
                />
              </div>
              <div className="p-4 rounded-lg bg-gray-100 dark:bg-gray-800">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Input value: <code className="font-mono">{searchInput}</code>
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  Debounced value: <code className="font-mono">{debouncedSearchInput}</code>
                </p>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-500">
                The debounced value updates 800ms after you stop typing. Useful for search
                queries, auto-save, and API calls.
              </p>
            </Card.Body>
          </Card>
        </div>

        {/* Async Operations Demo */}
        <div className="mb-8">
          <Card>
            <Card.Header>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Async Operations (useAsync)
              </h2>
            </Card.Header>
            <Card.Body className="space-y-4">
              <Button
                onClick={handleFetchClick}
                disabled={isLoading}
                isLoading={isLoading}
                variant="primary"
              >
                {isLoading ? 'Fetching...' : 'Fetch Data'}
              </Button>

              {error && (
                <div className="p-4 rounded-lg bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800">
                  <p className="text-red-900 dark:text-red-200">
                    <strong>Error:</strong> {error.message}
                  </p>
                </div>
              )}

              {data && (
                <div className="p-4 rounded-lg bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800">
                  <p className="text-green-900 dark:text-green-200 font-mono text-sm">
                    {JSON.stringify(data, null, 2)}
                  </p>
                </div>
              )}

              <p className="text-sm text-gray-500 dark:text-gray-500">
                The useAsync hook manages the state of asynchronous operations including loading,
                error, and success states. Click the button to simulate fetching data.
              </p>
            </Card.Body>
          </Card>
        </div>

        {/* Summary */}
        <div>
          <Card>
            <Card.Header>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Available State Management Tools
              </h2>
            </Card.Header>
            <Card.Body>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                <li>
                  <strong>useTheme:</strong> Manage application theme (light/dark) with automatic
                  localStorage persistence
                </li>
                <li>
                  <strong>useNotification:</strong> Display toast notifications with different
                  types (success, error, warning, info)
                </li>
                <li>
                  <strong>useLocalStorage:</strong> Synchronize state with localStorage for
                  persistence
                </li>
                <li>
                  <strong>useSessionStorage:</strong> Synchronize state with sessionStorage
                  (persists during browser session)
                </li>
                <li>
                  <strong>useToggle:</strong> Manage simple boolean state with toggle methods
                </li>
                <li>
                  <strong>useBoolean:</strong> Enhanced boolean state management with named methods
                </li>
                <li>
                  <strong>useDebounce:</strong> Debounce values after a specified delay
                </li>
                <li>
                  <strong>useDebouncedCallback:</strong> Debounce function execution
                </li>
                <li>
                  <strong>useThrottle:</strong> Throttle function execution to prevent excessive
                  calls
                </li>
                <li>
                  <strong>useAsync:</strong> Manage asynchronous operations with loading/error
                  states
                </li>
                <li>
                  <strong>useFetch:</strong> Simplified hook for fetching data from URLs
                </li>
                <li>
                  <strong>useForm:</strong> Global form state management with validation and
                  touched tracking
                </li>
              </ul>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  )
}
