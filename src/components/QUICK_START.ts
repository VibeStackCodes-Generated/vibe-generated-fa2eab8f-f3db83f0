/**
 * ============================================================================
 * COMPONENT LIBRARY - QUICK START GUIDE
 * ============================================================================
 *
 * This is a quick reference for the most common component usages.
 * For detailed documentation, see COMPONENT_LIBRARY.ts
 *
 * ============================================================================
 * IMPORT ALL COMPONENTS
 * ============================================================================
 *
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
 *
 * ============================================================================
 * BUTTON - 6 VARIANTS + 3 SIZES + LOADING STATE
 * ============================================================================
 *
 * // Variants
 * <Button variant="primary">Primary Action</Button>
 * <Button variant="secondary">Secondary</Button>
 * <Button variant="danger">Delete</Button>
 * <Button variant="success">Confirm</Button>
 * <Button variant="outline">Outline</Button>
 * <Button variant="ghost">Subtle</Button>
 *
 * // Sizes
 * <Button size="sm">Small</Button>
 * <Button size="md">Medium</Button>
 * <Button size="lg">Large</Button>
 *
 * // States
 * <Button disabled>Disabled</Button>
 * <Button isLoading>Loading...</Button>
 * <Button fullWidth>Full Width</Button>
 *
 * ============================================================================
 * CARD - CONTAINER WITH SECTIONS
 * ============================================================================
 *
 * <Card>
 *   <Card.Header>
 *     <h2>Title</h2>
 *   </Card.Header>
 *   <Card.Body>
 *     <p>Content here</p>
 *   </Card.Body>
 *   <Card.Footer>
 *     <Button>Action</Button>
 *   </Card.Footer>
 * </Card>
 *
 * ============================================================================
 * MODAL - DIALOG WITH FOCUS MANAGEMENT
 * ============================================================================
 *
 * const [isOpen, setIsOpen] = useState(false)
 *
 * <Modal
 *   isOpen={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   title="Confirm"
 * >
 *   <p>Are you sure?</p>
 *   <Modal.Footer>
 *     <Button onClick={() => setIsOpen(false)}>Cancel</Button>
 *     <Button variant="primary">Confirm</Button>
 *   </Modal.Footer>
 * </Modal>
 *
 * ============================================================================
 * INPUT - TEXT INPUT WITH ERROR HANDLING
 * ============================================================================
 *
 * const [value, setValue] = useState('')
 * const [error, setError] = useState('')
 *
 * <Input
 *   label="Email"
 *   type="email"
 *   placeholder="you@example.com"
 *   value={value}
 *   onChange={(e) => setValue(e.target.value)}
 *   error={error}
 *   helperText="Required field"
 *   fullWidth
 * />
 *
 * ============================================================================
 * TEXTAREA - MULTILINE TEXT
 * ============================================================================
 *
 * <Textarea
 *   label="Message"
 *   placeholder="Type your message..."
 *   rows={4}
 *   fullWidth
 * />
 *
 * ============================================================================
 * SELECT - DROPDOWN
 * ============================================================================
 *
 * <Select
 *   label="Category"
 *   options={[
 *     { value: '1', label: 'Option 1' },
 *     { value: '2', label: 'Option 2' },
 *   ]}
 *   placeholder="Choose..."
 *   fullWidth
 * />
 *
 * ============================================================================
 * CHECKBOX - BOOLEAN INPUT
 * ============================================================================
 *
 * const [agreed, setAgreed] = useState(false)
 *
 * <Checkbox
 *   label="I agree to terms"
 *   checked={agreed}
 *   onChange={(e) => setAgreed(e.target.checked)}
 * />
 *
 * ============================================================================
 * RADIO - SINGLE CHOICE FROM GROUP
 * ============================================================================
 *
 * const [choice, setChoice] = useState('a')
 *
 * <Radio
 *   label="Option A"
 *   name="group"
 *   value="a"
 *   checked={choice === 'a'}
 *   onChange={(e) => setChoice(e.target.value)}
 * />
 * <Radio
 *   label="Option B"
 *   name="group"
 *   value="b"
 *   checked={choice === 'b'}
 *   onChange={(e) => setChoice(e.target.value)}
 * />
 *
 * ============================================================================
 * FORMGROUP - WRAP FIELDS FOR SPACING
 * ============================================================================
 *
 * <FormGroup>
 *   <Input label="Name" fullWidth />
 *   <Input label="Email" type="email" fullWidth />
 *   <Textarea label="Message" fullWidth />
 *   <Button type="submit" fullWidth>Submit</Button>
 * </FormGroup>
 *
 * ============================================================================
 * COMPLETE FORM EXAMPLE
 * ============================================================================
 *
 * export function ContactForm() {
 *   const [formData, setFormData] = useState({
 *     name: '',
 *     email: '',
 *     message: '',
 *     subscribe: false,
 *   })
 *
 *   const handleChange = (e) => {
 *     const { name, type, checked, value } = e.target
 *     setFormData(prev => ({
 *       ...prev,
 *       [name]: type === 'checkbox' ? checked : value,
 *     }))
 *   }
 *
 *   const handleSubmit = (e) => {
 *     e.preventDefault()
 *     console.log('Submitted:', formData)
 *   }
 *
 *   return (
 *     <Card>
 *       <Card.Header>
 *         <h2>Contact Us</h2>
 *       </Card.Header>
 *       <Card.Body>
 *         <form onSubmit={handleSubmit}>
 *           <FormGroup>
 *             <Input
 *               label="Name"
 *               name="name"
 *               value={formData.name}
 *               onChange={handleChange}
 *               required
 *               fullWidth
 *             />
 *             <Input
 *               label="Email"
 *               type="email"
 *               name="email"
 *               value={formData.email}
 *               onChange={handleChange}
 *               required
 *               fullWidth
 *             />
 *             <Textarea
 *               label="Message"
 *               name="message"
 *               value={formData.message}
 *               onChange={handleChange}
 *               rows={4}
 *               required
 *               fullWidth
 *             />
 *             <Checkbox
 *               label="Subscribe to updates"
 *               name="subscribe"
 *               checked={formData.subscribe}
 *               onChange={handleChange}
 *             />
 *           </FormGroup>
 *           <Button type="submit" variant="primary" fullWidth>
 *             Send Message
 *           </Button>
 *         </form>
 *       </Card.Body>
 *     </Card>
 *   )
 * }
 *
 * ============================================================================
 * STYLING & THEMING
 * ============================================================================
 *
 * Primary Color:  #5200ff (used in primary buttons, focus states)
 * Accent Color:   #f5e942 (used in secondary buttons)
 * Font Family:    Inter (via Tailwind)
 *
 * All components support dark mode automatically. The dark class on
 * the html element enables dark mode styling.
 *
 * ============================================================================
 * COMPONENT FILE LOCATIONS
 * ============================================================================
 *
 * Button:     src/components/Button.tsx
 * Card:       src/components/Card.tsx
 * Modal:      src/components/Modal.tsx
 * Input:      src/components/Form.tsx
 * Textarea:   src/components/Form.tsx
 * Select:     src/components/Form.tsx
 * Checkbox:   src/components/Form.tsx
 * Radio:      src/components/Form.tsx
 * FormGroup:  src/components/Form.tsx
 *
 * Showcase:   src/pages/ComponentShowcase.tsx (live demo)
 *
 * ============================================================================
 * VIEW THE SHOWCASE
 * ============================================================================
 *
 * Run: npm run dev
 * Visit: http://localhost:5173
 *
 * The showcase page displays all components with interactive examples
 * and demonstrates different variations and use cases.
 *
 * ============================================================================
 */

export {}
