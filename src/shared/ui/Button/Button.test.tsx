import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Button } from './Button'

describe('Button', () => {
    it('renders children', () => {
        render(<Button>Apply Now</Button>)

        expect(screen.getByRole('button', { name: 'Apply Now' })).toBeInTheDocument()
    })

    it('calls onClick when clicked', async () => {
        const handleClick = vi.fn()
        const user = userEvent.setup()

        render(<Button onClick={handleClick}>Click</Button>)
        await user.click(screen.getByRole('button'))

        expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('does not call onClick when disabled', async () => {
        const handleClick = vi.fn()
        const user = userEvent.setup()

        render(
            <Button onClick={handleClick} isDisabled>
                Click
            </Button>,
        )
        await user.click(screen.getByRole('button'))

        expect(handleClick).not.toHaveBeenCalled()
    })
})
