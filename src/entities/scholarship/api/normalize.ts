import type { ScholarshipPageRaw } from '../model/raw'
import type { ScholarshipPage } from '../model/types'

export const normalizeScholarshipPage = (raw: ScholarshipPageRaw): ScholarshipPage => {
    const { scholarship } = raw

    return {
        scholarship: {
            id: scholarship.id,
            name: scholarship.name,
            description: scholarship.description,
            position: scholarship.position,
            duration: scholarship.duration,
            location: scholarship.location.name,
            startDate: new Date(scholarship.scholarship_start_date),
            applicationEndDate: new Date(scholarship.application_end_date),
            company: {
                name: scholarship.company.name,
                logoSrc: scholarship.company.logo_dark.src,
            },
            faqs: {
                categories: raw.scholarship.faqs.categories,
                items: raw.scholarship.faqs.items.map((item) => ({
                    category: item.type,
                    question: item.question,
                    answer: item.answer,
                })),
            },
        },
    }
}
