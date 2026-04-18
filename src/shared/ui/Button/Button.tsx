import cn from 'clsx'
import { memo, type ButtonHTMLAttributes, type ReactNode, type Ref } from 'react'

import styles from './Button.module.css'

export type ButtonProps = {
    children: ReactNode
    isDisabled?: boolean
    ref?: Ref<HTMLButtonElement>
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'disabled'>

export const Button = memo(
    ({
        children,
        isDisabled = false,
        onClick,
        ref,
        className,
        type = 'button',
        ...rest
    }: ButtonProps) => {
        const btnClass = cn(styles.root, { [styles.disabled!]: isDisabled }, className)

        return (
            <button
                {...rest}
                ref={ref}
                type={type}
                className={btnClass}
                disabled={isDisabled}
                onClick={isDisabled ? undefined : onClick}
            >
                {children}
            </button>
        )
    },
)
