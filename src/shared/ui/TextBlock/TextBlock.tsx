/* eslint-disable react-x/no-array-index-key */
import type { TextBlockType } from '@entities/scholarship'

interface TextBlockProps {
    blocks: TextBlockType[]
    className?: string
}

export const TextBlock: React.FC<TextBlockProps> = ({ blocks, className }) => {
    return (
        <div className={className}>
            {blocks.map((block, index) => {
                if (block.type === 'paragraph') {
                    return <p key={index}>{block.data}</p>
                }

                if (block.type === 'list' && block.data.length > 0) {
                    return (
                        <ul key={index}>
                            {block.data.map((item, itemIndex) => (
                                <li key={itemIndex}>{item}</li>
                            ))}
                        </ul>
                    )
                }

                return null
            })}
        </div>
    )
}
