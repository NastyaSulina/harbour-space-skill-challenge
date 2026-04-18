import { ScholarshipService } from './scholarshipService'

import type { AxiosInstance } from 'axios'
import type { ScholarshipPageRaw } from '../model/raw'

describe('ScholarshipService', () => {
    const rawResponse: ScholarshipPageRaw = {
        scholarship: {
            id: 3,
            name: 'Data Science Apprenticeship',
            description: [{ type: 'paragraph', data: 'About the program.' }],
            position: 'Game Analyst Intern',
            duration: 1,
            location: { name: 'Barcelona' },
            scholarship_start_date: '2026-11-30 00:00:00',
            application_end_date: '2026-11-22 00:00:00',
            company: {
                name: 'Zeptolab',
                logo_dark: { src: 'https://test.com/test.svg' },
            },
        },
    }

    const createMockHttp = () =>
        ({
            get: vi.fn(),
        }) as unknown as AxiosInstance

    it('requests the correct endpoint using the given slug', async () => {
        const http = createMockHttp()
        vi.mocked(http.get).mockResolvedValue({ data: rawResponse })

        const service = new ScholarshipService(http)
        await service.getPage('data-science-apprenticeship-zeptolab')

        expect(http.get).toHaveBeenCalledWith(
            '/scholarship_pages/data-science-apprenticeship-zeptolab',
            expect.any(Object),
        )
    })

    it('passes abort signal to axios', async () => {
        const http = createMockHttp()
        vi.mocked(http.get).mockResolvedValue({ data: rawResponse })

        const service = new ScholarshipService(http)
        const controller = new AbortController()
        await service.getPage('some-slug', controller.signal)

        expect(http.get).toHaveBeenCalledWith(expect.any(String), { signal: controller.signal })
    })

    it('returns normalized scholarship data', async () => {
        const http = createMockHttp()
        vi.mocked(http.get).mockResolvedValue({ data: rawResponse })

        const service = new ScholarshipService(http)
        const result = await service.getPage('some-slug')

        expect(result.scholarship.name).toBe('Data Science Apprenticeship')
        expect(result.scholarship.location).toBe('Barcelona')
        expect(result.scholarship.startDate).toBeInstanceOf(Date)
        expect(result.scholarship.company.logoSrc).toBe('https://test.com/test.svg')
    })

    it('throws when request fails', async () => {
        const http = createMockHttp()
        const networkError = new Error('Network Error')
        vi.mocked(http.get).mockRejectedValue(networkError)

        const service = new ScholarshipService(http)

        await expect(service.getPage('some-slug')).rejects.toThrow('Network Error')
    })
})
