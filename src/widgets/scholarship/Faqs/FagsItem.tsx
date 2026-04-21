import { type FC, useState, useRef, useEffect, useCallback } from 'react'

import styles from './Faqs.module.css'

import type { FaqItem } from '@entities/scholarship'

import { IconButton, TextBlock } from '@shared/ui'
import { KeyboardKeys } from '@shared/types'

export const FaqsItem: FC<{ item: FaqItem }> = ({ item }) => {
    const [isExpanded, setIsExpanded] = useState(false)
    const [maxHeight, setMaxHeight] = useState('0')

    const toggle = useCallback(() => {
        setIsExpanded((prev) => !prev)
    }, [])

    const contentRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        if (isExpanded && contentRef.current) {
            setMaxHeight(`${contentRef.current.scrollHeight}px`)
        } else {
            setMaxHeight('0')
        }
    }, [isExpanded])

    return (
        <li className={styles.item}>
            <div
                className={styles.itemHeader}
                onClick={toggle}
                role='button'
                tabIndex={0}
                onKeyDown={(e) => e.key === KeyboardKeys.Enter && toggle()}
                aria-expanded={isExpanded}
            >
                <span className={styles.category}>{item.category}</span>
                <span className={styles.question}>{item.question}</span>
                <IconButton
                    ariaLabel={isExpanded ? 'Collapse' : 'Expand'}
                    isExpanded={isExpanded}
                    onClick={(e) => {
                        e.stopPropagation()
                        toggle()
                    }}
                />
            </div>

            <div ref={contentRef} className={styles.answerWrapper} style={{ maxHeight }}>
                <div className={styles.answer}>
                    <TextBlock blocks={item.answer} />
                </div>
            </div>
        </li>
    )
}
