import React from 'react'

import styles from './Hero.module.css'

import type { Scholarship } from '@entities/scholarship'

import { Button, TextBlock } from '@shared/ui'

interface HeroProps {
    scholarship: Scholarship
    onApply?: () => void
}

export const Hero: React.FC<HeroProps> = ({ scholarship, onApply }) => {
    const {
        name,
        description,
        position,
        company,
        location,
        duration,
        startDate,
        applicationEndDate,
    } = scholarship

    return (
        <section className={styles.root}>
            <div className={styles.container}>
                <div className={styles.leftColumn}>
                    <h1 className={styles.title}>{name}</h1>

                    <p className={styles.subtitle}>
                        A fully funded work-study program to launch your tech career
                    </p>

                    {!!description?.length && (
                        <TextBlock blocks={description} className={styles.description} />
                    )}

                    {position && (
                        <p className={styles.position}>
                            <strong>Position:</strong> {position}
                        </p>
                    )}

                    <Button onClick={onApply}>Apply now</Button>
                </div>

                <div className={styles.rightColumn}>
                    <div className={styles.companyLogo}>
                        <img src={company.logoSrc} alt={company.name} />
                        <p className={styles.companyName}>
                            <p>Powered by:</p>
                            {company.name}
                        </p>
                    </div>

                    <div className={styles.infoCard}>
                        <div className={styles.infoRow}>
                            <p className={styles.infoItem}>
                                <strong>Location</strong>
                                {location}
                            </p>
                            <p className={styles.infoItem}>
                                <strong>Duration</strong>
                                {duration} {duration > 1 ? 'Years' : 'Year'}
                            </p>
                        </div>

                        <div className={styles.infoRow}>
                            <p className={styles.infoItem}>
                                <strong>Start date</strong>
                                {startDate.toLocaleDateString()}
                            </p>
                            <p className={styles.infoItem}>
                                <strong>End date</strong>
                                {applicationEndDate.toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
