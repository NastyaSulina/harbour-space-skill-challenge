export enum LoadStatus {
    Initial = 'initial',
    Loading = 'loading',
    Success = 'success',
    Error = 'error',
}

export type TextBlock = { type: 'paragraph'; data: string } | { type: 'list'; data: string[] }

export interface ScholarshipPage {
    scholarship: Scholarship
}

export interface Scholarship {
    id: number
    name: string
    description: TextBlock[]
    position: string
    duration: number
    location: string
    startDate: Date
    applicationEndDate: Date
    company: Company
}

export interface Company {
    name: string
    logoSrc: string
}
