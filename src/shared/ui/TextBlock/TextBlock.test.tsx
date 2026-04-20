import { render, screen } from '@testing-library/react'

import { TextBlock } from './TextBlock'

describe('TextBlock', () => {
    it('renders with provided className', () => {
        const className = 'textInformation'
        render(
            <TextBlock
                className={className}
                blocks={[
                    {
                        type: 'paragraph',
                        data: 'Some text here',
                    },
                ]}
            />,
        )

        expect(screen.getByTestId('text-block')).toHaveClass(className)
    })

    it('renders mixed paragraph and list blocks', () => {
        render(
            <TextBlock
                blocks={[
                    { type: 'paragraph', data: 'Intro text' },
                    { type: 'list', data: ['Point 1', 'Point 2'] },
                    { type: 'paragraph', data: 'Conclusion' },
                ]}
            />,
        )

        expect(screen.getByText('Intro text')).toBeInTheDocument()
        expect(screen.getByText('Point 1')).toBeInTheDocument()
        expect(screen.getByText('Point 2')).toBeInTheDocument()
        expect(screen.getByText('Conclusion')).toBeInTheDocument()
    })
})
