import { faker } from '@faker-js/faker'

import type { Company, Scholarship, ScholarshipPage, TextBlock } from '../model/types'

const makeTextBlock = (): TextBlock =>
    ({
        type: 'paragraph',
        data: faker.lorem.paragraph(),
    }) as TextBlock

const makeCompany = (): Company => ({
    name: faker.company.name(),
    logoDarkSrc: faker.image.url(),
})

const makeScholarship = (): Scholarship => ({
    id: faker.number.int({ min: 1, max: 1000 }),
    name: faker.lorem.words(3),
    description: [makeTextBlock()],
    position: faker.person.jobTitle(),
    duration: faker.number.int({ min: 1, max: 2 }),
    location: faker.location.city(),
    startDate: faker.date.future(),
    applicationEndDate: faker.date.soon(),
    company: makeCompany(),
})

export const makeScholarshipPage = (): ScholarshipPage => ({
    scholarship: makeScholarship(),
})
