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

    it('maps faq items from raw type/question/answer to category/question/answer', () => {
        const raw = makeScholarshipPageRaw({
            faqs: {
                categories: ['Program conditions'],
                items: [
                    {
                        type: 'Program conditions',
                        question: 'Do I need a visa?',
                        answer: [{ type: 'paragraph', data: 'No.' }],
                    },
                ],
            },
        })

        const result = normalizeScholarshipPage(raw)

        expect(result.scholarship.faqs.items[0]).toEqual({
            category: 'Program conditions',
            question: 'Do I need a visa?',
            answer: [{ type: 'paragraph', data: 'No.' }],
        })
    })

    it('preserves faq categories as is', () => {
        const raw = makeScholarshipPageRaw()

        const result = normalizeScholarshipPage(raw)

        expect(result.scholarship.faqs.categories).toEqual(raw.scholarship.faqs.categories)
    })

    it('maps all faq items', () => {
        const raw = makeScholarshipPageRaw()

        const result = normalizeScholarshipPage(raw)

        const expectedItems = raw.scholarship.faqs.items.map((item) => ({
            category: item.type,
            question: item.question,
            answer: item.answer,
        }))

        expect(result.scholarship.faqs.items).toEqual(expectedItems)
    })

    it('maps "What you will learn" items from raw title/data to title/description with id', () => {
        const raw = makeScholarshipPageRaw()

        const result = normalizeScholarshipPage(raw)

        const expectedItems = raw.scholarship.what_you_will_learn.map((item, index) => ({
            id: String(index),
            title: item.title,
            description: item.data,
        }))

        expect(result.scholarship.whatYouWillLearn).toEqual(expectedItems)
    })
})
