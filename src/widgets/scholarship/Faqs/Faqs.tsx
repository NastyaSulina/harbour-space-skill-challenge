import { useState, useMemo, useCallback, useRef, useEffect } from 'react'

import styles from './Faqs.module.css'

import type { Faqs as FaqsType, FaqItem } from '@entities/scholarship'

import { IconButton, Select, TextBlock } from '@shared/ui'

import type { FC } from 'react'

interface FaqItemProps {
    item: FaqItem
}

const ALL_CATEGORIES = 'All'

const FaqsItem: FC<FaqItemProps> = ({ item }) => {
    const [isExpanded, setIsExpanded] = useState(false)
    const [maxHeight, setMaxHeight] = useState('0')

    const contentRef = useRef<HTMLDivElement>(null)

    const handleToggle = useCallback(() => {
        setIsExpanded((prev) => !prev)
    }, [])

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
                onClick={handleToggle}
                role='button'
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && handleToggle()}
                aria-expanded={isExpanded}
            >
                <span className={styles.category}>{item.category}</span>
                <span className={styles.question}>{item.question}</span>
                <IconButton
                    ariaLabel={isExpanded ? 'Collapse' : 'Expand'}
                    isExpanded={isExpanded}
                    onClick={(e) => {
                        e.stopPropagation()
                        handleToggle()
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
interface FaqsProps {
    faqs: FaqsType
}

export const Faqs: FC<FaqsProps> = ({ faqs }) => {
    const [selectedCategory, setSelectedCategory] = useState<string>(ALL_CATEGORIES)

    const filteredItems = useMemo(() => {
        if (selectedCategory === ALL_CATEGORIES) {
            return faqs.items
        }

        return faqs.items.filter((item) => item.category === selectedCategory)
    }, [faqs.items, selectedCategory])

    const handleCategoryChange = useCallback((value: string) => {
        setSelectedCategory(value)
    }, [])

    const categoryOptions = useMemo(() => [ALL_CATEGORIES, ...faqs.categories], [faqs.categories])

    return (
        <section className={styles.root}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.title}>Frequently asked questions</h2>

                    <div className={styles.filter}>
                        <span className={styles.filterLabel}>Filter by:</span>
                        <Select
                            options={categoryOptions}
                            selected={selectedCategory}
                            onChange={handleCategoryChange}
                        />
                    </div>
                </div>

                <ul className={styles.list}>
                    {filteredItems.map((item) => (
                        <FaqsItem key={item.question} item={item} />
                    ))}
                </ul>
            </div>
        </section>
    )
}
