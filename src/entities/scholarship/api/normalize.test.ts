import { normalizeScholarshipPage } from './normalize'

import { makeScholarshipPageRaw } from '../__testing__'

describe('normalize', () => {
    it('maps snake_case API fields to camelCase', () => {
        const raw = makeScholarshipPageRaw({
            scholarship_start_date: '2026-11-30 00:00:00',
            application_end_date: '2026-11-22 00:00:00',
            company: {
                name: 'Zeptolab',
                logo_dark: { src: 'https://test.com/test.svg' },
            },
        })

        const result = normalizeScholarshipPage(raw)

        expect(result.scholarship.startDate).toBeInstanceOf(Date)
        expect(result.scholarship.applicationEndDate).toBeInstanceOf(Date)
        expect(result.scholarship.company.logoSrc).toBe('https://test.com/test.svg')
    })

    it('flattens nested location object to a string', () => {
        const raw = makeScholarshipPageRaw({
            location: { name: 'Barcelona' },
        })

        const result = normalizeScholarshipPage(raw)

        expect(result.scholarship.location).toBe('Barcelona')
    })

    it('converts date strings to Date instances', () => {
        const raw = makeScholarshipPageRaw({
            scholarship_start_date: '2026-11-30 00:00:00',
        })

        const result = normalizeScholarshipPage(raw)

        expect(result.scholarship.startDate).toBeInstanceOf(Date)
        expect(result.scholarship.startDate.getFullYear()).toBe(2026)
    })

    it('preserves primitive fields as is', () => {
        const raw = makeScholarshipPageRaw({
            id: 42,
            name: 'Data Science Apprenticeship',
            duration: 1,
            position: 'Game Analyst Intern',
        })

        const result = normalizeScholarshipPage(raw)

        expect(result.scholarship.id).toBe(42)
        expect(result.scholarship.name).toBe('Data Science Apprenticeship')
        expect(result.scholarship.duration).toBe(1)
        expect(result.scholarship.position).toBe('Game Analyst Intern')
    })
})
