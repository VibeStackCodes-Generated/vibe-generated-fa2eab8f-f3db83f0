/**
 * ============================================================================
 * UI COMPONENT LIBRARY DOCUMENTATION
 * ============================================================================
 *
 * This file provides comprehensive documentation for the reusable UI component
 * library. All components follow TypeScript best practices, use Tailwind CSS
 * for styling, and support light/dark mode out of the box.
 *
 * ============================================================================
 * AVAILABLE COMPONENTS
 * ============================================================================
 *
 * 1. BUTTON COMPONENT (Button.tsx)
 *    - File: src/components/Button.tsx
 *    - Export: { Button }
 *
 *    Variants:
 *    - primary   : Main action button (#5200ff purple)
 *    - secondary : Secondary actions (#f5e942 yellow)
 *    - danger    : Destructive actions (red)
 *    - success   : Positive actions (green)
 *    - outline   : Border-only button
 *    - ghost     : Minimal button
 *
 *    Sizes:
 *    - sm  : Small button (text-sm)
 *    - md  : Medium button (text-base) - DEFAULT
 *    - lg  : Large button (text-lg)
 *
 *    Props:
 *    - variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'outline' | 'ghost'
 *    - size?: 'sm' | 'md' | 'lg'
 *    - isLoading?: boolean (shows spinner, disables button)
 *    - fullWidth?: boolean (sets width: 100%)
 *    - icon?: ReactNode (displays icon next to text)
 *    - children: ReactNode (button text)
 *    - All standard HTML button attributes
 *
 *    Usage:
 *    ```tsx
 *    <Button variant="primary" size="md">Click me</Button>
 *    <Button variant="secondary" isLoading>Loading...</Button>
 *    <Button fullWidth icon={<SearchIcon />}>Search</Button>
 *    <Button variant="danger" onClick={handleDelete}>Delete</Button>
 *    ```
 *
 * ============================================================================
 *
 * 2. CARD COMPONENT (Card.tsx)
 *    - File: src/components/Card.tsx
 *    - Export: { Card }
 *
 *    Composition Pattern:
 *    - Card         : Main container
 *    - Card.Header  : Header section with border
 *    - Card.Body    : Main content area
 *    - Card.Footer  : Footer section with background
 *
 *    Props:
 *    - Card props:
 *      - children: ReactNode
 *      - className?: string
 *    - Header/Body/Footer props: Same as above
 *
 *    Usage:
 *    ```tsx
 *    <Card>
 *      <Card.Header>
 *        <h2>Title</h2>
 *      </Card.Header>
 *      <Card.Body>
 *        <p>Content goes here</p>
 *      </Card.Body>
 *      <Card.Footer>
 *        <Button>Action</Button>
 *      </Card.Footer>
 *    </Card>
 *
 *    // Simple card without header/footer
 *    <Card>
 *      <Card.Body>
 *        Simple content
 *      </Card.Body>
 *    </Card>
 *    ```
 *
 * ============================================================================
 *
 * 3. MODAL COMPONENT (Modal.tsx)
 *    - File: src/components/Modal.tsx
 *    - Export: { Modal }
 *
 *    Props:
 *    - isOpen: boolean (controls visibility)
 *    - onClose: () => void (callback when modal should close)
 *    - title?: string (header text)
 *    - children: ReactNode (main content)
 *    - footer?: ReactNode (footer area)
 *    - closeButton?: boolean (DEFAULT: true)
 *    - size?: 'sm' | 'md' | 'lg' (DEFAULT: 'md')
 *    - className?: string
 *
 *    Features:
 *    - Backdrop click to close
 *    - Escape key to close
 *    - Body scroll prevention while open
 *    - Focus management
 *    - Accessible ARIA attributes
 *
 *    Usage:
 *    ```tsx
 *    const [isOpen, setIsOpen] = useState(false)
 *
 *    <Modal
 *      isOpen={isOpen}
 *      onClose={() => setIsOpen(false)}
 *      title="Confirm Action"
 *      size="md"
 *    >
 *      <p>Are you sure you want to proceed?</p>
 *      <Modal.Footer>
 *        <Button onClick={() => setIsOpen(false)}>Cancel</Button>
 *        <Button variant="primary">Confirm</Button>
 *      </Modal.Footer>
 *    </Modal>
 *    ```
 *
 * ============================================================================
 *
 * 4. FORM COMPONENTS (Form.tsx)
 *    - File: src/components/Form.tsx
 *    - Exports: { Input, Textarea, Select, Checkbox, Radio, FormGroup }
 *
 *    4.1 INPUT COMPONENT
 *    Props:
 *    - label?: string
 *    - error?: string (error message)
 *    - helperText?: string (hint text below input)
 *    - fullWidth?: boolean
 *    - icon?: ReactNode
 *    - type?: string (DEFAULT: 'text')
 *    - All standard HTML input attributes
 *
 *    Usage:
 *    ```tsx
 *    <Input
 *      label="Email"
 *      type="email"
 *      placeholder="your@email.com"
 *      helperText="We'll never share your email"
 *      fullWidth
 *    />
 *    <Input
 *      label="Password"
 *      type="password"
 *      error="Password must be at least 8 characters"
 *    />
 *    ```
 *
 *    4.2 TEXTAREA COMPONENT
 *    Props:
 *    - label?: string
 *    - error?: string
 *    - helperText?: string
 *    - fullWidth?: boolean (DEFAULT: true)
 *    - rows?: number
 *    - All standard HTML textarea attributes
 *
 *    Usage:
 *    ```tsx
 *    <Textarea
 *      label="Message"
 *      placeholder="Type your message..."
 *      rows={4}
 *      fullWidth
 *    />
 *    ```
 *
 *    4.3 SELECT COMPONENT
 *    Props:
 *    - label?: string
 *    - error?: string
 *    - helperText?: string
 *    - fullWidth?: boolean
 *    - options: Array<{ value: string; label: string }>
 *    - placeholder?: string
 *    - All standard HTML select attributes
 *
 *    Usage:
 *    ```tsx
 *    <Select
 *      label="Choose Category"
 *      options={[
 *        { value: 'bug', label: 'Bug Report' },
 *        { value: 'feature', label: 'Feature Request' },
 *      ]}
 *      placeholder="Select..."
 *      fullWidth
 *    />
 *    ```
 *
 *    4.4 CHECKBOX COMPONENT
 *    Props:
 *    - label?: string
 *    - helperText?: string
 *    - All standard HTML input[type=checkbox] attributes
 *
 *    Usage:
 *    ```tsx
 *    <Checkbox
 *      label="I agree to the terms"
 *      helperText="Please read our terms before continuing"
 *    />
 *    ```
 *
 *    4.5 RADIO COMPONENT
 *    Props:
 *    - label?: string
 *    - helperText?: string
 *    - All standard HTML input[type=radio] attributes
 *
 *    Usage:
 *    ```tsx
 *    <Radio label="Option 1" name="group" value="1" />
 *    <Radio label="Option 2" name="group" value="2" />
 *    ```
 *
 *    4.6 FORMGROUP COMPONENT
 *    A wrapper component for spacing form fields vertically
 *
 *    Usage:
 *    ```tsx
 *    <FormGroup>
 *      <Input label="Name" fullWidth />
 *      <Input label="Email" type="email" fullWidth />
 *      <Textarea label="Message" fullWidth />
 *    </FormGroup>
 *    ```
 *
 * ============================================================================
 * STYLING SYSTEM
 * ============================================================================
 *
 * All components use Tailwind CSS for styling and support dark mode through
 * the dark: prefix. The component library uses two brand colors:
 *
 * Primary Color:   #5200ff (Purple)
 *   Used for: Primary buttons, focus states, primary actions
 *
 * Accent Color:    #f5e942 (Yellow)
 *   Used for: Secondary buttons, highlights
 *
 * ============================================================================
 * DARK MODE SUPPORT
 * ============================================================================
 *
 * All components automatically support dark mode. The dark color scheme is
 * triggered by the 'dark' class on a parent element (typically html tag).
 *
 * Example dark mode implementation:
 * ```tsx
 * // Toggle dark mode
 * document.documentElement.classList.toggle('dark')
 *
 * // Check if dark mode is enabled
 * const isDark = document.documentElement.classList.contains('dark')
 * ```
 *
 * ============================================================================
 * TYPESCRIPT TYPES
 * ============================================================================
 *
 * All components are fully typed with TypeScript. No 'any' types are used.
 * Components use:
 *
 * - React.forwardRef for ref forwarding (Button, Input, Textarea, Select, etc.)
 * - Proper prop interfaces extending React types
 * - Union types for variants and sizes
 * - Optional props marked with '?'
 *
 * ============================================================================
 * ACCESSIBILITY FEATURES
 * ============================================================================
 *
 * Components include accessibility features:
 *
 * - Semantic HTML elements
 * - ARIA attributes (role, aria-modal, aria-label, etc.)
 * - Keyboard navigation support (Escape key in modals)
 * - Focus management
 * - Color contrast ratios meeting WCAG AA standards
 * - Label associations with form inputs
 *
 * ============================================================================
 * COMPONENT SHOWCASE
 * ============================================================================
 *
 * A live demo page is available at /components or / that shows all
 * components in action with code examples.
 *
 * Location: src/pages/ComponentShowcase.tsx
 *
 * ============================================================================
 * USAGE EXAMPLES
 * ============================================================================
 *
 * Import components:
 * ```tsx
 * import {
 *   Button,
 *   Card,
 *   Modal,
 *   Input,
 *   Textarea,
 *   Select,
 *   Checkbox,
 *   Radio,
 *   FormGroup,
 * } from '@/components'
 * ```
 *
 * Create a form with validation:
 * ```tsx
 * const [email, setEmail] = useState('')
 * const [emailError, setEmailError] = useState('')
 *
 * const handleSubmit = (e: React.FormEvent) => {
 *   e.preventDefault()
 *   if (!email.includes('@')) {
 *     setEmailError('Please enter a valid email')
 *     return
 *   }
 *   // Submit form
 * }
 *
 * <Card>
 *   <Card.Header><h2>Newsletter</h2></Card.Header>
 *   <Card.Body>
 *     <form onSubmit={handleSubmit}>
 *       <FormGroup>
 *         <Input
 *           label="Email"
 *           type="email"
 *           value={email}
 *           onChange={(e) => {
 *             setEmail(e.target.value)
 *             setEmailError('')
 *           }}
 *           error={emailError}
 *           fullWidth
 *         />
 *       </FormGroup>
 *       <Button type="submit" variant="primary" fullWidth>
 *         Subscribe
 *       </Button>
 *     </form>
 *   </Card.Body>
 * </Card>
 * ```
 *
 * ============================================================================
 * CONTRIBUTING & EXTENDING
 * ============================================================================
 *
 * When creating new components or extending existing ones:
 *
 * 1. Maintain TypeScript strict mode - no 'any' types
 * 2. Use Tailwind CSS for styling - no inline styles
 * 3. Support dark mode with dark: prefix
 * 4. Add proper JSDoc comments
 * 5. Use the brand colors (#5200ff and #f5e942)
 * 6. Forward refs where appropriate using forwardRef
 * 7. Export components from src/components/index.ts
 * 8. Add examples to ComponentShowcase.tsx
 *
 * ============================================================================
 */

// This file is for documentation purposes only
export {}
