import { faker } from '@faker-js/faker'

import type { FaqsRaw, ScholarshipPageRaw, ScholarshipRaw, WhatYouWillLearnRaw } from '../model/raw'
import type { TextBlockType } from '../model/types'

const FAQ_CATEGORIES = ['Application process', 'Program conditions', 'Apprenticeship conditions']

const makeTextBlock = (): TextBlockType =>
    ({
        type: 'paragraph',
        data: faker.lorem.paragraph(),
    }) as TextBlockType

const makeFaqs = (): FaqsRaw => ({
    categories: FAQ_CATEGORIES,
    items: faker.helpers.multiple(
        () => ({
            type: faker.helpers.arrayElement(FAQ_CATEGORIES),
            question: `${faker.lorem.sentence().slice(0, -1)}?`,
            answer: [makeTextBlock()],
        }),
        { count: 6 },
    ),
})

const makeWhatYouWillLearn = (): WhatYouWillLearnRaw[] =>
    faker.helpers.multiple(
        () => ({
            title: faker.lorem.word(),
            data: faker.lorem.sentence(),
        }),
        { count: 3 },
    )

const makeScholarshipRaw = (overrides?: Partial<ScholarshipRaw>): ScholarshipRaw => ({
    id: faker.number.int({ min: 1, max: 1000 }),
    name: faker.lorem.words(3),
    description: [makeTextBlock()],
    position: faker.person.jobTitle(),
    duration: faker.number.int({ min: 1, max: 2 }),
    location: { name: faker.location.city() },
    scholarship_start_date: faker.date.future().toISOString(),
    application_end_date: faker.date.soon().toISOString(),
    company: {
        name: faker.company.name(),
        logo_dark: { src: faker.image.url() },
    },
    faqs: makeFaqs(),
    what_you_will_learn: makeWhatYouWillLearn(),
    ...overrides,
})

export const makeScholarshipPageRaw = (
    overrides?: Partial<ScholarshipRaw>,
): ScholarshipPageRaw => ({
    scholarship: makeScholarshipRaw(overrides),
})
