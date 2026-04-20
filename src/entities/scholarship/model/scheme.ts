import type { TextBlockType } from './types'

export interface ScholarshipPageRaw {
    scholarship: ScholarshipRaw
}

export interface FaqItemRaw {
    type: string
    question: string
    answer: TextBlockType[]
}

export interface FaqsRaw {
    items: FaqItemRaw[]
    categories: string[]
}

export interface WhatYouWillLearnRaw {
    title: string
    data: string
}

export interface ScholarshipRaw {
    id: number
    name: string
    description: TextBlockType[]
    position: string
    duration: number
    location: LocationRaw
    scholarship_start_date: string
    application_end_date: string
    company: CompanyRaw
    faqs: FaqsRaw
    what_you_will_learn: WhatYouWillLearnRaw[]
}

export interface LocationRaw {
    name: string
}

export interface CompanyRaw {
    name: string
    logo_dark: { src: string }
}
