export enum LoadStatus {
    Initial = 'initial',
    Loading = 'loading',
    Success = 'success',
    Error = 'error',
}

export type TextBlockType = { type: 'paragraph'; data: string } | { type: 'list'; data: string[] }

export interface ScholarshipPage {
    scholarship: Scholarship
}

export interface FaqItem {
    category: string
    question: string
    answer: TextBlockType[]
}

export interface Faqs {
    items: FaqItem[]
    categories: string[]
}

export interface Scholarship {
    id: number
    name: string
    description: TextBlockType[]
    position: string
    duration: number
    location: string
    startDate: Date
    applicationEndDate: Date
    company: Company
    faqs: Faqs
}

export interface Company {
    name: string
    logoSrc: string
}
