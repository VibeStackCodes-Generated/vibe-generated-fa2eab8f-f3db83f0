import { createContext, useContext, useState, ReactNode, useCallback } from 'react'

/**
 * Notification Context
 *
 * Manages application notifications/toast messages.
 * Supports different notification types: success, error, warning, info.
 */

export type NotificationType = 'success' | 'error' | 'warning' | 'info'

export interface Notification {
  id: string
  message: string
  type: NotificationType
  duration?: number
  timestamp: number
}

interface NotificationContextType {
  notifications: Notification[]
  addNotification: (message: string, type?: NotificationType, duration?: number) => string
  removeNotification: (id: string) => void
  clearNotifications: () => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

/**
 * Generate unique notification ID
 */
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

interface NotificationProviderProps {
  children: ReactNode
}

export function NotificationProvider({ children }: NotificationProviderProps) {
  const [notifications, setNotifications] = useState<Notification[]>([])

  const addNotification = useCallback(
    (message: string, type: NotificationType = 'info', duration: number = 5000) => {
      const id = generateId()
      const notification: Notification = {
        id,
        message,
        type,
        duration,
        timestamp: Date.now(),
      }

      setNotifications(prev => [...prev, notification])

      // Auto-remove notification after duration (if duration is specified)
      if (duration > 0) {
        setTimeout(() => {
          removeNotification(id)
        }, duration)
      }

      return id
    },
    []
  )

  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id))
  }, [])

  const clearNotifications = useCallback(() => {
    setNotifications([])
  }, [])

  const value: NotificationContextType = {
    notifications,
    addNotification,
    removeNotification,
    clearNotifications,
  }

  return (
    <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>
  )
}

/**
 * Hook to use notification context
 *
 * @throws Error if used outside NotificationProvider
 */
export function useNotification(): NotificationContextType {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider')
  }
  return context
}

/**
 * Convenience hook for common notification patterns
 */
export function useNotificationActions() {
  const { addNotification } = useNotification()

  return {
    success: (message: string, duration?: number) =>
      addNotification(message, 'success', duration),
    error: (message: string, duration?: number) => addNotification(message, 'error', duration),
    warning: (message: string, duration?: number) =>
      addNotification(message, 'warning', duration),
    info: (message: string, duration?: number) => addNotification(message, 'info', duration),
  }
}
