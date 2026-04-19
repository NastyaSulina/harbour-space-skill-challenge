import { faker } from '@faker-js/faker'

import type { ScholarshipPageRaw, ScholarshipRaw } from '../model/raw'
import type { TextBlockType } from '../model/types'

const makeTextBlock = (): TextBlockType =>
    ({
        type: 'paragraph',
        data: faker.lorem.paragraph(),
    }) as TextBlockType

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
    ...overrides,
})

export const makeScholarshipPageRaw = (
    overrides?: Partial<ScholarshipRaw>,
): ScholarshipPageRaw => ({
    scholarship: makeScholarshipRaw(overrides),
})
