import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { IconButton } from './IconButton'

describe('IconButton', () => {
    it('renders with accessible label', () => {
        render(<IconButton ariaLabel='Toggle FAQ' />)

        expect(screen.getByRole('button', { name: 'Toggle FAQ' })).toBeInTheDocument()
    })

    it('calls onClick when clicked', async () => {
        const handleClick = vi.fn()
        const user = userEvent.setup()

        render(<IconButton ariaLabel='Toggle' onClick={handleClick} />)
        await user.click(screen.getByRole('button'))

        expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('has aria-expanded=false by default', () => {
        render(<IconButton ariaLabel='Toggle' />)

        expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'false')
    })

    it('reflects isExpanded in aria-expanded', () => {
        render(<IconButton ariaLabel='Toggle' isExpanded />)

        expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'true')
    })

    it('applies expanded class when isExpanded is true', () => {
        render(<IconButton ariaLabel='Toggle' isExpanded />)

        expect(screen.getByRole('button').className).toMatch(/expanded/)
    })
})
