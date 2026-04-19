import { ScholarshipService } from './scholarshipService'

import { makeScholarshipPageRaw } from '../__testing__'

import type { AxiosInstance } from 'axios'

describe('ScholarshipService', () => {
    const createMockHttp = () =>
        ({
            get: vi.fn(),
        }) as unknown as AxiosInstance

    it('requests the correct endpoint using the given slug', async () => {
        const http = createMockHttp()
        vi.mocked(http.get).mockResolvedValue({ data: makeScholarshipPageRaw() })

        const service = new ScholarshipService(http)
        await service.getPage('data-science-apprenticeship-zeptolab')

        expect(http.get).toHaveBeenCalledWith(
            '/scholarship_pages/data-science-apprenticeship-zeptolab',
            expect.any(Object),
        )
    })

    it('passes abort signal to axios', async () => {
        const http = createMockHttp()
        vi.mocked(http.get).mockResolvedValue({ data: makeScholarshipPageRaw() })

        const service = new ScholarshipService(http)
        const controller = new AbortController()
        await service.getPage('some-slug', controller.signal)

        expect(http.get).toHaveBeenCalledWith(expect.any(String), { signal: controller.signal })
    })

    it('throws when request fails', async () => {
        const http = createMockHttp()
        const networkError = new Error('Network Error')
        vi.mocked(http.get).mockRejectedValue(networkError)

        const service = new ScholarshipService(http)

        await expect(service.getPage('some-slug')).rejects.toThrow('Network Error')
    })
})
