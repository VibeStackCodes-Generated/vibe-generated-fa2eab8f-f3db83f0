import React, { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
}

interface CardHeaderProps {
  children: ReactNode
  className?: string
}

interface CardBodyProps {
  children: ReactNode
  className?: string
}

interface CardFooterProps {
  children: ReactNode
  className?: string
}

/**
 * Card Component
 *
 * Base card container component with rounded corners and shadow.
 * Can be used standalone or with Card.Header, Card.Body, Card.Footer subcomponents.
 *
 * @component
 * @example
 * <Card>
 *   <Card.Header>Title</Card.Header>
 *   <Card.Body>Content</Card.Body>
 *   <Card.Footer>Footer</Card.Footer>
 * </Card>
 */
const CardRoot: React.FC<CardProps> & {
  Header: React.FC<CardHeaderProps>
  Body: React.FC<CardBodyProps>
  Footer: React.FC<CardFooterProps>
} = ({ children, className = '' }) => {
  return (
    <div
      className={`rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900 ${className}`}
    >
      {children}
    </div>
  )
}

const CardHeader: React.FC<CardHeaderProps> = ({ children, className = '' }) => {
  return (
    <div
      className={`border-b border-gray-200 px-4 md:px-6 py-3 md:py-4 dark:border-gray-800 ${className}`}
    >
      {children}
    </div>
  )
}

const CardBody: React.FC<CardBodyProps> = ({ children, className = '' }) => {
  return <div className={`px-4 md:px-6 py-3 md:py-4 ${className}`}>{children}</div>
}

const CardFooter: React.FC<CardFooterProps> = ({ children, className = '' }) => {
  return (
    <div
      className={`border-t border-gray-200 bg-gray-50 px-4 md:px-6 py-3 md:py-4 dark:border-gray-800 dark:bg-gray-800 ${className}`}
    >
      {children}
    </div>
  )
}

CardRoot.Header = CardHeader
CardRoot.Body = CardBody
CardRoot.Footer = CardFooter

export const Card = CardRoot
