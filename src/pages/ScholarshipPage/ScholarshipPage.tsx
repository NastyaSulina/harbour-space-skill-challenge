import { useCallback, type FC } from 'react'

import styles from './ScholarshipPage.module.css'

import { Faqs, Hero, Slider } from '@widgets/scholarship'

import { useScholarship } from '@entities/scholarship'

import { LoadStatus } from '@shared/types'

interface ScholarshipPageProps {
    slug: string
}

export const ScholarshipPage: FC<ScholarshipPageProps> = ({ slug }) => {
    const { status, data } = useScholarship(slug)
    const { scholarship } = data || {}

    const onApply = useCallback(() => {
        console.log('Apply')
    }, [])

    const renderContent = () => {
        if (status === LoadStatus.Initial || status === LoadStatus.Loading) {
            return (
                <section className={styles.centeredSection}>
                    <div className={styles.loader} aria-label='Loading' />
                </section>
            )
        }

        if (status === LoadStatus.Error || !scholarship) {
            return (
                <section className={styles.centeredSection}>
                    <div className={styles.errorBlock}>
                        <h1 className={styles.errorTitle}>Something went wrong</h1>
                        <p className={styles.errorText}>
                            We could not load this scholarship page :(
                        </p>
                    </div>
                </section>
            )
        }

        return (
            <>
                <Hero
                    name={scholarship.name}
                    description={scholarship.description}
                    position={scholarship.position}
                    company={scholarship.company}
                    location={scholarship.location}
                    duration={scholarship.duration}
                    startDate={scholarship.startDate}
                    onApply={onApply}
                />

                <Slider items={scholarship.whatYouWillLearn} title='What you will learn' />

                <Faqs faqs={scholarship.faqs} />
            </>
        )
    }

    return (
        <main className={styles.page}>
            <header className={styles.header}>Harbour.Space</header>
            {renderContent()}
        </main>
    )
}
