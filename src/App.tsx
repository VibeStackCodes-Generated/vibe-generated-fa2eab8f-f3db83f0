import { Outlet } from 'react-router-dom'
import { Suspense } from 'react'
import { ErrorBoundary } from '@/components/error-boundary'
import { VibeStackBadge } from '@/components/vibestack-badge'
import { NotificationContainer } from '@/components/NotificationContainer'

/**
 * Main App component with routing
 * Uses React Router for SPA navigation
 * Includes global providers for state management and notifications
 */
function App() {
  return (
    <ErrorBoundary>
      <Suspense
        fallback={
          <div className="flex min-h-screen items-center justify-center">
            <p className="text-muted-foreground">Loading...</p>
          </div>
        }
      >
        <Outlet />
      </Suspense>
      <NotificationContainer />
      <VibeStackBadge />
    </ErrorBoundary>
  )
}

export default App
