import cn from 'clsx'
import { memo, type ButtonHTMLAttributes, type Ref } from 'react'

import styles from './IconButton.module.css'

export type IconButtonProps = {
    ariaLabel: string
    isExpanded?: boolean
    ref?: Ref<HTMLButtonElement>
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'aria-label' | 'aria-expanded' | 'children'>

export const IconButton = memo(
    ({
        ariaLabel,
        isExpanded = false,
        onClick,
        ref,
        className,
        type = 'button',
        ...rest
    }: IconButtonProps) => {
        const btnClass = cn(styles.root, { [styles.expanded!]: isExpanded }, className)

        return (
            <button
                {...rest}
                ref={ref}
                type={type}
                className={btnClass}
                onClick={onClick}
                aria-label={ariaLabel}
                aria-expanded={isExpanded}
            >
                <span className={styles.bg} aria-hidden='true' />
                <span className={styles.icon} aria-hidden='true' />
            </button>
        )
    },
)

IconButton.displayName = 'IconButton'
