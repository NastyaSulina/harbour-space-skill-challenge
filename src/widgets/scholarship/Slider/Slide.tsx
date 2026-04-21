import styles from './Slider.module.css'

import type { LearnItem } from '@entities/scholarship'

import { sliceBySentences } from '@shared/lib'

import type { FC } from 'react'

export const Slide: FC<{ item: LearnItem }> = ({ item }) => (
    <article className={styles.slide}>
        <h3 className={styles.slideTitle}>{item.title}</h3>

        <p className={styles.slideDescription}>{sliceBySentences(item.description, 2)}</p>
    </article>
)
