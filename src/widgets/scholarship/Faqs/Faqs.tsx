import { useState, useMemo, useCallback } from 'react'

import styles from './Faqs.module.css'

import type { Faqs as FaqsType, FaqItem } from '@entities/scholarship'

import { IconButton, TextBlock } from '@shared/ui'

import type { FC, ChangeEvent } from 'react'

interface FaqItemProps {
    item: FaqItem
}

const ALL_CATEGORIES = 'All'

const FaqsItem: FC<FaqItemProps> = ({ item }) => {
    const [isExpanded, setIsExpanded] = useState(false)

    const handleToggle = useCallback(() => {
        setIsExpanded((prev) => !prev)
    }, [])

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

            {isExpanded && (
                <div className={styles.answer}>
                    <TextBlock blocks={item.answer} />
                </div>
            )}
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

    const handleCategoryChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(e.target.value)
    }, [])

    return (
        <section className={styles.root}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.title}>Frequently asked questions</h2>

                    <div className={styles.filter}>
                        <span className={styles.filterLabel}>Filter by:</span>
                        <select
                            className={styles.select}
                            value={selectedCategory}
                            onChange={handleCategoryChange}
                        >
                            <option value={ALL_CATEGORIES}>All</option>

                            {faqs.categories.map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
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
