export type Option = {
    title: string
    value: string
}

export type SelectProps = {
    options: Option[] | string[]
    selected: string | null
    placeholder?: string
    onChange: (value: string) => void
    onClose?: () => void
    hasError?: boolean
}
