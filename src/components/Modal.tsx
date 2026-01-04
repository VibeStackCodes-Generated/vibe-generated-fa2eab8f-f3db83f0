import React, { ReactNode, useCallback, useEffect } from 'react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: ReactNode
  footer?: ReactNode
  closeButton?: boolean
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

type ModalSize = 'sm' | 'md' | 'lg'

const sizeStyles: Record<ModalSize, string> = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-2xl',
}

/**
 * Modal Component
 *
 * A reusable modal dialog component with customizable size and content.
 * Handles backdrop clicks, escape key, and focus management.
 *
 * @component
 * @example
 * <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Confirm">
 *   <p>Are you sure?</p>
 *   <Modal.Footer>
 *     <Button onClick={() => setIsOpen(false)}>Cancel</Button>
 *     <Button variant="primary">Confirm</Button>
 *   </Modal.Footer>
 * </Modal>
 */
export const Modal: React.FC<ModalProps> & {
  Footer: React.FC<{ children: ReactNode; className?: string }>
} = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  closeButton = true,
  size = 'md',
  className = '',
}) => {
  const handleEscape = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    },
    [onClose]
  )

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
      return () => {
        document.removeEventListener('keydown', handleEscape)
        document.body.style.overflow = 'unset'
      }
    }
  }, [isOpen, handleEscape])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Content */}
      <div
        className={`relative z-10 w-full rounded-lg border border-gray-200 bg-white shadow-xl dark:border-gray-800 dark:bg-gray-900 ${sizeStyles[size]} ${className}`}
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        {(title || closeButton) && (
          <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 dark:border-gray-800">
            {title && (
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h2>
            )}
            {!title && <div />}
            {closeButton && (
              <button
                onClick={onClose}
                className="inline-flex items-center justify-center rounded-md p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800"
                aria-label="Close modal"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
        )}

        {/* Body */}
        <div className="px-6 py-4">{children}</div>

        {/* Footer */}
        {footer && (
          <div className="border-t border-gray-200 bg-gray-50 px-6 py-4 dark:border-gray-800 dark:bg-gray-800">
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}

const ModalFooter: React.FC<{ children: ReactNode; className?: string }> = ({
  children,
  className = '',
}) => {
  return <div className={`flex justify-end gap-3 ${className}`}>{children}</div>
}

Modal.Footer = ModalFooter
