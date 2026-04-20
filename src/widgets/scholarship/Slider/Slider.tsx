import { useEffect, useRef, useState } from 'react'
import cn from 'clsx'

import styles from './Slider.module.css'

import type { LearnItem } from '@entities/scholarship'

import { sliceBySentences, useIsMobile } from '@shared/lib'

import type { FC } from 'react'

interface SliderProps {
    items: LearnItem[]
    title?: string
}

interface SlideProps {
    item: LearnItem
}

const CARD_WIDTH_DESKTOP = 320
const CARD_WIDTH_MOBILE = 280
const CARD_GAP_DESKTOP = 24
const CARD_GAP_MOBILE = 16
const EDGE_TOLERANCE = 10

const Slide: FC<SlideProps> = ({ item }) => (
    <article className={styles.slide}>
        <h3 className={styles.slideTitle}>{item.title}</h3>
        <p className={styles.slideDescription}>{sliceBySentences(item.description, 2)}</p>
    </article>
)

export const Slider: FC<SliderProps> = ({ items, title }) => {
    const trackRef = useRef<HTMLDivElement>(null)

    const [canScrollPrev, setCanScrollPrev] = useState(false)
    const [canScrollNext, setCanScrollNext] = useState(false)

    const isMobile = useIsMobile()

    const cardWidth = isMobile ? CARD_WIDTH_MOBILE : CARD_WIDTH_DESKTOP
    const cardGap = isMobile ? CARD_GAP_MOBILE : CARD_GAP_DESKTOP
    const scrollStep = cardWidth + cardGap

    const updateNavigation = () => {
        const track = trackRef.current
        if (!track) return

        const maxScrollLeft = track.scrollWidth - track.clientWidth

        setCanScrollPrev(track.scrollLeft > EDGE_TOLERANCE)
        setCanScrollNext(track.scrollLeft < maxScrollLeft - EDGE_TOLERANCE)
    }

    useEffect(() => {
        const track = trackRef.current
        if (!track) return

        updateNavigation()

        track.addEventListener('scroll', updateNavigation, { passive: true })
        window.addEventListener('resize', updateNavigation)

        return () => {
            track.removeEventListener('scroll', updateNavigation)
            window.removeEventListener('resize', updateNavigation)
        }
    }, [items.length, isMobile])

    const scrollByCard = (direction: 'prev' | 'next') => {
        const track = trackRef.current
        if (!track) return

        track.scrollBy({
            left: direction === 'next' ? scrollStep : -scrollStep,
            behavior: 'smooth',
        })
    }

    return (
        <section className={styles.root}>
            {title && <h2 className={styles.heading}>{title}</h2>}

            <div className={styles.trackWrap}>
                <div ref={trackRef} className={styles.track}>
                    {items.map((item) => (
                        <div key={item.id} className={styles.slideWrap}>
                            <Slide item={item} />
                        </div>
                    ))}
                </div>
            </div>

            <div className={styles.navigation}>
                <button
                    className={cn(styles.navButton, styles.navButtonPrev)}
                    onClick={() => scrollByCard('prev')}
                    aria-label='previous slide'
                    disabled={!canScrollPrev}
                >
                    ←
                </button>

                <button
                    className={cn(styles.navButton, styles.navButtonNext)}
                    onClick={() => scrollByCard('next')}
                    aria-label='next slide'
                    disabled={!canScrollNext}
                >
                    →
                </button>
            </div>
        </section>
    )
}
