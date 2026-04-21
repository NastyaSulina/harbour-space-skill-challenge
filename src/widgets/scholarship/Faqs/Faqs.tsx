import { useState, useMemo, type FC } from 'react'

import styles from './Faqs.module.css'
import { FaqsItem } from './FagsItem'

import type { Faqs as FaqsType } from '@entities/scholarship'

import { Select } from '@shared/ui'

const ALL_CATEGORIES = 'All'

export const Faqs: FC<{ faqs: FaqsType }> = ({ faqs }) => {
    const [selectedCategory, setSelectedCategory] = useState<string>(ALL_CATEGORIES)

    const categoryOptions = useMemo(() => [ALL_CATEGORIES, ...faqs.categories], [faqs.categories])

    const filteredItems = useMemo(() => {
        if (selectedCategory === ALL_CATEGORIES) {
            return faqs.items
        }

        return faqs.items.filter((item) => item.category === selectedCategory)
    }, [faqs.items, selectedCategory])

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
                            onChange={setSelectedCategory}
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
