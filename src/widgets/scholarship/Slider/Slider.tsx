import { useEffect, useRef, useState, type FC } from 'react'
import cn from 'clsx'

import styles from './Slider.module.css'
import { Slide } from './Slide'

import type { LearnItem } from '@entities/scholarship'

import { useIsMobile } from '@shared/lib'

interface SliderProps {
    items: LearnItem[]
    title?: string
}

const DESKTOP_CARD_WIDTH = 320
const MOBILE_CARD_WIDTH = 280
const DESKTOP_GAP = 24
const MOBILE_GAP = 16

export const Slider: FC<SliderProps> = ({ items, title }) => {
    const trackRef = useRef<HTMLDivElement>(null)
    const [canScrollPrev, setCanScrollPrev] = useState(false)
    const [canScrollNext, setCanScrollNext] = useState(false)

    const isMobile = useIsMobile()
    const cardWidth = isMobile ? MOBILE_CARD_WIDTH : DESKTOP_CARD_WIDTH
    const gap = isMobile ? MOBILE_GAP : DESKTOP_GAP

    const updateNavigationButtons = () => {
        const track = trackRef.current
        if (!track) return

        const isAtStart = track.scrollLeft <= 0
        const isAtEnd = track.scrollLeft >= track.scrollWidth - track.clientWidth - 1

        setCanScrollPrev(!isAtStart)
        setCanScrollNext(!isAtEnd)
    }

    useEffect(() => {
        const track = trackRef.current
        if (!track) return

        updateNavigationButtons()

        track.addEventListener('scroll', updateNavigationButtons, { passive: true })
        window.addEventListener('resize', updateNavigationButtons)

        return () => {
            track.removeEventListener('scroll', updateNavigationButtons)
            window.removeEventListener('resize', updateNavigationButtons)
        }
    }, [])

    const scroll = (direction: 'prev' | 'next') => {
        const track = trackRef.current
        if (!track) return

        const distance = cardWidth + gap
        track.scrollBy({
            left: direction === 'next' ? distance : -distance,
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
                    onClick={() => scroll('prev')}
                    aria-label='Previous slide'
                    disabled={!canScrollPrev}
                >
                    ←
                </button>

                <button
                    className={cn(styles.navButton, styles.navButtonNext)}
                    onClick={() => scroll('next')}
                    aria-label='Next slide'
                    disabled={!canScrollNext}
                >
                    →
                </button>
            </div>
        </section>
    )
}
