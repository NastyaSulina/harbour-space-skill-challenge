import { useState, useCallback } from 'react'
import cn from 'clsx'

import styles from './Select.module.css'

import { useOutsideClick } from '@shared/lib'
import { KeyboardKeys } from '@shared/types'

import type { KeyboardEvent } from 'react'
import type { SelectProps, Option } from './Select.types'

export const Select = ({
    options,
    selected,
    placeholder = '',
    onChange,
    onClose,
    hasError = false,
}: SelectProps) => {
    const [isOpen, setIsOpen] = useState(false)

    const toggle = useCallback(() => setIsOpen((prev) => !prev), [])

    const close = useCallback(() => {
        setIsOpen(false)
        onClose?.()
    }, [onClose])

    const ref = useOutsideClick(close)

    const handleOptionClick = useCallback(
        (value: string) => {
            onChange(value)
            close()
        },
        [onChange, close],
    )

    const handleKeyDown = useCallback(
        (e: KeyboardEvent, action: () => void) => {
            if (e.key === KeyboardKeys.Enter || e.key === KeyboardKeys.Space) {
                e.preventDefault()

                action()
            } else if (e.key === KeyboardKeys.Escape) {
                close()
            }
        },
        [close],
    )

    const normalizedOptions: Option[] = options.map((opt) =>
        typeof opt === 'string' ? { value: opt, title: opt } : opt,
    )

    const selectedOption = normalizedOptions.find((opt) => opt.value === selected)

    return (
        <div ref={ref} className={cn(styles.select, { [styles.error]: hasError })}>
            <button
                className={cn(styles.trigger, { [styles.triggerOpen]: isOpen })}
                type='button'
                aria-haspopup='listbox'
                aria-expanded={isOpen}
                onClick={toggle}
                onKeyDown={(e) => handleKeyDown(e, toggle)}
            >
                <span>{selectedOption?.title ?? placeholder}</span>
                <span className={cn(styles.chevron, { [styles.chevronOpen]: isOpen })} />
            </button>

            {isOpen && (
                <div className={styles.optionsWrapper} role='listbox' tabIndex={-1}>
                    {normalizedOptions.map((option) => {
                        const isSelected = selected === option.value

                        return (
                            <button
                                key={option.value}
                                type='button'
                                role='option'
                                aria-selected={isSelected}
                                className={cn(styles.option, {
                                    [styles.optionSelected]: isSelected,
                                })}
                                onClick={() => handleOptionClick(option.value)}
                                onKeyDown={(e) =>
                                    handleKeyDown(e, () => handleOptionClick(option.value))
                                }
                            >
                                {option.title}
                            </button>
                        )
                    })}
                </div>
            )}
        </div>
    )
}
