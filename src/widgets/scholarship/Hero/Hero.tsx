import React from 'react'

import styles from './Hero.module.css'

import type { Scholarship } from '@entities/scholarship'

import { Button, TextBlock } from '@shared/ui'
import { formatDate } from '@shared/lib'

interface HeroProps {
    name: Scholarship['name']
    description: Scholarship['description']
    position: Scholarship['position']
    company: Scholarship['company']
    location: Scholarship['location']
    duration: Scholarship['duration']
    startDate: Scholarship['startDate']
    onApply?: () => void
}

export const Hero: React.FC<HeroProps> = ({
    name,
    description,
    position,
    company,
    location,
    duration,
    startDate,
    onApply,
}) => {
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
                            <span>Powered by:</span>
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
                                {formatDate(startDate)}
                            </p>
                            <p className={styles.infoItem}>
                                <strong>End date</strong>
                                {formatDate(
                                    new Date(
                                        startDate.getFullYear() + duration,
                                        startDate.getMonth(),
                                        startDate.getDate(),
                                    ),
                                )}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
