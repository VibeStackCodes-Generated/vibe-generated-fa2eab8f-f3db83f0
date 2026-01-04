import { useState } from 'react'
import {
  Button,
  Card,
  Modal,
  Input,
  Textarea,
  Select,
  Checkbox,
  Radio,
  FormGroup,
} from '@/components'

/**
 * Component Showcase Page
 *
 * Demonstrates all available UI components from the component library.
 * This page shows usage examples and different variations of each component.
 */
export function ComponentShowcase() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    category: '',
    subscribe: false,
    preference: 'email',
  })

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    alert('Form submitted! Check console for data.')
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 md:px-6 lg:px-8 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 md:mb-10 lg:mb-12">
          <h1 className="mb-2 text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
            UI Component Library
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-400">
            Reusable components for building consistent interfaces
          </p>
        </div>

        {/* Buttons Section */}
        <div className="mb-8 md:mb-10 lg:mb-12 section-mobile">
          <Card>
            <Card.Header>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                Buttons
              </h2>
            </Card.Header>
            <Card.Body className="space-y-4 md:space-y-6">
              {/* Button Variants */}
              <div>
                <h3 className="mb-3 md:mb-4 text-xs md:text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Variants
                </h3>
                <div className="flex flex-wrap gap-2 md:gap-3 lg:gap-4">
                  <Button variant="primary">Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="danger">Danger</Button>
                  <Button variant="success">Success</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                </div>
              </div>

              {/* Button Sizes */}
              <div>
                <h3 className="mb-3 md:mb-4 text-xs md:text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Sizes
                </h3>
                <div className="flex flex-wrap items-center gap-2 md:gap-3 lg:gap-4">
                  <Button size="sm">Small</Button>
                  <Button size="md">Medium</Button>
                  <Button size="lg">Large</Button>
                </div>
              </div>

              {/* Button States */}
              <div>
                <h3 className="mb-3 md:mb-4 text-xs md:text-sm font-semibold text-gray-700 dark:text-gray-300">
                  States
                </h3>
                <div className="flex flex-col sm:flex-row flex-wrap gap-2 md:gap-3 lg:gap-4">
                  <Button>Default</Button>
                  <Button disabled>Disabled</Button>
                  <Button isLoading>Loading</Button>
                  <Button fullWidth className="sm:w-auto">
                    Full Width
                  </Button>
                </div>
              </div>

              {/* Modal Button */}
              <div>
                <h3 className="mb-3 md:mb-4 text-xs md:text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Interactive
                </h3>
                <Button onClick={() => setIsModalOpen(true)} variant="primary">
                  Open Modal
                </Button>
              </div>
            </Card.Body>
          </Card>
        </div>

        {/* Cards Section */}
        <div className="mb-8 md:mb-10 lg:mb-12 section-mobile">
          <h2 className="mb-4 text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
            Cards
          </h2>
          <div className="grid grid-cols-1 gap-4 md:gap-6 lg:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Simple Card */}
            <Card>
              <Card.Body>
                <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">Simple Card</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  A basic card with just content inside
                </p>
              </Card.Body>
            </Card>

            {/* Card with Header */}
            <Card>
              <Card.Header>
                <h3 className="font-semibold text-gray-900 dark:text-white">Card with Header</h3>
              </Card.Header>
              <Card.Body>
                <p className="text-gray-600 dark:text-gray-400">
                  This card has a header section with border
                </p>
              </Card.Body>
            </Card>

            {/* Full Featured Card */}
            <Card>
              <Card.Header>
                <h3 className="font-semibold text-gray-900 dark:text-white">Featured Card</h3>
              </Card.Header>
              <Card.Body>
                <p className="text-gray-600 dark:text-gray-400">
                  This card has header, body, and footer sections
                </p>
              </Card.Body>
              <Card.Footer>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    Cancel
                  </Button>
                  <Button size="sm" variant="primary">
                    Action
                  </Button>
                </div>
              </Card.Footer>
            </Card>
          </div>
        </div>

        {/* Forms Section */}
        <div className="mb-8 md:mb-10 lg:mb-12 section-mobile">
          <Card>
            <Card.Header>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                Form Elements
              </h2>
            </Card.Header>
            <Card.Body>
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                <FormGroup>
                  <Input
                    label="Full Name"
                    name="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    fullWidth
                  />
                </FormGroup>

                <FormGroup>
                  <Input
                    label="Email Address"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    helperText="We'll never share your email"
                    required
                    fullWidth
                  />
                </FormGroup>

                <FormGroup>
                  <Select
                    label="Category"
                    name="category"
                    options={[
                      { value: 'general', label: 'General Inquiry' },
                      { value: 'support', label: 'Support Request' },
                      { value: 'feedback', label: 'Feedback' },
                      { value: 'other', label: 'Other' },
                    ]}
                    value={formData.category}
                    onChange={handleInputChange}
                    placeholder="Select a category"
                    required
                    fullWidth
                  />
                </FormGroup>

                <FormGroup>
                  <Textarea
                    label="Message"
                    name="message"
                    placeholder="Type your message here..."
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    required
                    fullWidth
                  />
                </FormGroup>

                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Communication Preference
                  </h3>
                  <Radio
                    label="Email"
                    name="preference"
                    value="email"
                    checked={formData.preference === 'email'}
                    onChange={handleInputChange}
                  />
                  <Radio
                    label="Phone"
                    name="preference"
                    value="phone"
                    checked={formData.preference === 'phone'}
                    onChange={handleInputChange}
                  />
                  <Radio
                    label="In-app"
                    name="preference"
                    value="inapp"
                    checked={formData.preference === 'inapp'}
                    onChange={handleInputChange}
                  />
                </div>

                <FormGroup>
                  <Checkbox
                    label="Subscribe to updates"
                    name="subscribe"
                    checked={formData.subscribe}
                    onChange={handleInputChange}
                    helperText="Get notified about new features and updates"
                  />
                </FormGroup>

                <div className="flex flex-col sm:flex-row gap-2 md:gap-3 pt-4">
                  <Button variant="outline" fullWidth className="sm:w-auto">
                    Reset
                  </Button>
                  <Button variant="primary" type="submit" fullWidth className="sm:w-auto">
                    Submit Form
                  </Button>
                </div>
              </form>
            </Card.Body>
          </Card>
        </div>

        {/* Color Palette Section */}
        <div className="mb-8 md:mb-10 lg:mb-12 section-mobile">
          <Card>
            <Card.Header>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                Brand Colors
              </h2>
            </Card.Header>
            <Card.Body>
              <div className="grid grid-cols-1 gap-4 md:gap-6 md:grid-cols-2">
                <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-4">
                  <div className="h-16 w-16 md:h-20 md:w-20 rounded-lg bg-[#5200ff] flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white text-sm md:text-base">
                      Primary Color
                    </p>
                    <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">#5200ff</p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-4">
                  <div className="h-16 w-16 md:h-20 md:w-20 rounded-lg bg-[#f5e942] flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white text-sm md:text-base">
                      Accent Color
                    </p>
                    <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">#f5e942</p>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </div>

        {/* Guidelines Section */}
        <div className="mb-8 md:mb-10 lg:mb-12">
          <Card>
            <Card.Header>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                Component Guidelines
              </h2>
            </Card.Header>
            <Card.Body>
              <ul className="space-y-3 md:space-y-4 text-xs sm:text-sm md:text-base text-gray-700 dark:text-gray-300">
                <li>
                  <strong>Buttons:</strong> Use primary variant for main actions, secondary for
                  alternatives, danger for destructive actions
                </li>
                <li>
                  <strong>Cards:</strong> Use cards to group related content with clear visual
                  separation
                </li>
                <li>
                  <strong>Forms:</strong> Use labels for all inputs, provide helper text for
                  clarity, show error messages below fields
                </li>
                <li>
                  <strong>Modals:</strong> Use modals for important user actions that require
                  attention
                </li>
                <li>
                  <strong>Spacing:</strong> Components respect the default spacing scale in Tailwind
                  CSS
                </li>
                <li>
                  <strong>Responsive Design:</strong> All components use mobile-first responsive
                  design with proper scaling across all screen sizes
                </li>
                <li>
                  <strong>Dark Mode:</strong> All components fully support dark mode with
                  appropriate color adjustments
                </li>
              </ul>
            </Card.Body>
          </Card>
        </div>
      </div>

      {/* Modal Example */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Confirm Action"
        size="md"
      >
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          This is a modal dialog component. It can be used to request confirmation or display
          important information that requires user attention.
        </p>
        <Modal.Footer>
          <Button variant="outline" onClick={() => setIsModalOpen(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => setIsModalOpen(false)}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
