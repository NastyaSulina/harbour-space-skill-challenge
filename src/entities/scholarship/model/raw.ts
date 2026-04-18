import type { TextBlock } from './types'

export interface ScholarshipPageRaw {
    scholarship: ScholarshipRaw
}

export interface ScholarshipRaw {
    id: number
    name: string
    description: TextBlock[]
    position: string
    duration: number
    location: LocationRaw
    scholarship_start_date: string
    application_end_date: string
    company: CompanyRaw
}

export interface LocationRaw {
    name: string
}

export interface CompanyRaw {
    name: string
    logo_light: { src: string }
    logo_dark: { src: string }
}
