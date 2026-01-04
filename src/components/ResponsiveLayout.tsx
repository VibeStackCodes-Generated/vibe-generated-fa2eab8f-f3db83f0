import React, { ReactNode } from 'react'

interface ResponsiveLayoutProps {
  children: ReactNode
  className?: string
}

interface ResponsiveHeaderProps {
  children: ReactNode
  className?: string
  sticky?: boolean
}

interface ResponsiveNavProps {
  children: ReactNode
  className?: string
  isOpen?: boolean
}

interface ResponsiveMainProps {
  children: ReactNode
  className?: string
}

interface ResponsiveFooterProps {
  children: ReactNode
  className?: string
}

/**
 * ResponsiveLayout Component
 *
 * A mobile-first responsive layout system for organizing page structure.
 * Includes header, navigation, main content, and footer sections.
 *
 * @component
 * @example
 * <ResponsiveLayout>
 *   <ResponsiveLayout.Header>Header Content</ResponsiveLayout.Header>
 *   <ResponsiveLayout.Nav>Navigation</ResponsiveLayout.Nav>
 *   <ResponsiveLayout.Main>Main Content</ResponsiveLayout.Main>
 *   <ResponsiveLayout.Footer>Footer Content</ResponsiveLayout.Footer>
 * </ResponsiveLayout>
 */
const ResponsiveLayoutRoot: React.FC<ResponsiveLayoutProps> & {
  Header: React.FC<ResponsiveHeaderProps>
  Nav: React.FC<ResponsiveNavProps>
  Main: React.FC<ResponsiveMainProps>
  Footer: React.FC<ResponsiveFooterProps>
  Container: React.FC<ResponsiveLayoutProps>
} = ({ children, className = '' }) => {
  return <div className={`flex min-h-screen flex-col ${className}`}>{children}</div>
}

const ResponsiveHeader: React.FC<ResponsiveHeaderProps> = ({
  children,
  className = '',
  sticky = false,
}) => {
  const stickyClass = sticky ? 'sticky top-0 z-20 shadow-sm' : ''

  return (
    <header
      className={`bg-white px-4 py-4 md:px-6 lg:px-8 dark:bg-gray-900 ${stickyClass} ${className}`}
    >
      {children}
    </header>
  )
}

const ResponsiveNav: React.FC<ResponsiveNavProps> = ({
  children,
  className = '',
  isOpen = true,
}) => {
  return (
    <nav
      className={`
        ${isOpen ? 'block' : 'hidden'}
        bg-white dark:bg-gray-800
        md:block
        border-t md:border-t-0
        border-gray-200 dark:border-gray-700
        px-4 md:px-6 lg:px-8
        py-4 md:py-6
        ${className}
      `}
    >
      {children}
    </nav>
  )
}

const ResponsiveMain: React.FC<ResponsiveMainProps> = ({ children, className = '' }) => {
  return (
    <main className={`flex-1 bg-gray-50 px-4 py-6 md:px-6 lg:px-8 dark:bg-gray-950 ${className}`}>
      {children}
    </main>
  )
}

const ResponsiveFooter: React.FC<ResponsiveFooterProps> = ({ children, className = '' }) => {
  return (
    <footer
      className={`bg-gray-900 text-gray-100 dark:bg-black px-4 py-6 md:px-6 lg:px-8 ${className}`}
    >
      {children}
    </footer>
  )
}

const ResponsiveContainer: React.FC<ResponsiveLayoutProps> = ({ children, className = '' }) => {
  return (
    <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-8 lg:px-0 ${className}`}>
      {children}
    </div>
  )
}

ResponsiveLayoutRoot.Header = ResponsiveHeader
ResponsiveLayoutRoot.Nav = ResponsiveNav
ResponsiveLayoutRoot.Main = ResponsiveMain
ResponsiveLayoutRoot.Footer = ResponsiveFooter
ResponsiveLayoutRoot.Container = ResponsiveContainer

export const ResponsiveLayout = ResponsiveLayoutRoot

/**
 * MobileMenu Component
 *
 * A mobile-friendly menu toggle component for navigation.
 * Provides hamburger menu functionality on mobile devices.
 *
 * @component
 * @example
 * <MobileMenu isOpen={isOpen} onToggle={setIsOpen}>
 *   Menu Items
 * </MobileMenu>
 */
interface MobileMenuProps {
  isOpen: boolean
  onToggle: (open: boolean) => void
  children?: ReactNode
  className?: string
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onToggle,
  children,
  className = '',
}) => {
  return (
    <div className={`md:hidden ${className}`}>
      {/* Hamburger Button */}
      <button
        onClick={() => onToggle(!isOpen)}
        className="relative inline-flex h-10 w-10 items-center justify-center rounded-md text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
        aria-expanded={isOpen}
        aria-label="Toggle menu"
      >
        <svg
          className={`h-6 w-6 transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 top-16 z-30 bg-white dark:bg-gray-800 md:hidden"
          onClick={() => onToggle(false)}
        >
          <div className="overflow-y-auto p-4" onClick={e => e.stopPropagation()}>
            {children}
          </div>
        </div>
      )}
    </div>
  )
}

/**
 * ResponsiveGrid Component
 *
 * A mobile-first responsive grid component that scales from 1 column on mobile
 * to multiple columns on larger screens.
 *
 * @component
 * @example
 * <ResponsiveGrid columns={{ mobile: 1, tablet: 2, desktop: 3 }}>
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 * </ResponsiveGrid>
 */
interface ResponsiveGridProps {
  children: ReactNode
  columns?: {
    mobile?: number
    tablet?: number
    desktop?: number
  }
  gap?: 'sm' | 'md' | 'lg'
  className?: string
}

export const ResponsiveGrid: React.FC<ResponsiveGridProps> = ({
  children,
  columns = { mobile: 1, tablet: 2, desktop: 3 },
  gap = 'md',
  className = '',
}) => {
  const gapMap = {
    sm: 'gap-2 md:gap-3',
    md: 'gap-4 md:gap-6',
    lg: 'gap-6 md:gap-8',
  }

  const colsMap = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
  }

  const mobileClass = columns.mobile
    ? colsMap[columns.mobile as keyof typeof colsMap] || 'grid-cols-1'
    : 'grid-cols-1'

  const tabletClass = columns.tablet ? `md:${colsMap[columns.tablet as keyof typeof colsMap]}` : ''

  const desktopClass = columns.desktop
    ? `lg:${colsMap[columns.desktop as keyof typeof colsMap]}`
    : ''

  return (
    <div
      className={`grid ${mobileClass} ${tabletClass} ${desktopClass} ${gapMap[gap]} ${className}`}
    >
      {children}
    </div>
  )
}
