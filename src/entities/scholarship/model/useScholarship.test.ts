import { renderHook, waitFor } from '@testing-library/react'

import { useScholarship } from './useScholarship'
import { LoadStatus } from './types'

import { makeScholarshipPage } from '../__testing__'

const { getPageMock } = vi.hoisted(() => ({
    getPageMock: vi.fn(),
}))

vi.mock('../api', () => ({
    ScholarshipService: class {
        getPage = getPageMock
    },
}))

describe('useScholarship', () => {
    beforeEach(() => {
        getPageMock.mockReset()
    })

    it('transitions to Success on successful fetch', async () => {
        const page = makeScholarshipPage()
        getPageMock.mockResolvedValue(page)

        const { result } = renderHook(() => useScholarship('some-slug'))

        await waitFor(() => {
            expect(result.current.status).toBe(LoadStatus.Success)
        })

        expect(result.current.data).toEqual(page)
        expect(result.current.error).toBeNull()
    })

    it('transitions to Error on failed fetch', async () => {
        const error = new Error('Network Error')
        getPageMock.mockRejectedValue(error)

        const { result } = renderHook(() => useScholarship('some-slug'))

        await waitFor(() => {
            expect(result.current.status).toBe(LoadStatus.Error)
        })

        expect(result.current.data).toBeNull()
        expect(result.current.error).toEqual(error)
    })

    it('calls service with given slug', async () => {
        getPageMock.mockResolvedValue(makeScholarshipPage())

        renderHook(() => useScholarship('some-slug'))

        await waitFor(() => {
            expect(getPageMock).toHaveBeenCalledWith('some-slug', expect.any(AbortSignal))
        })
    })

    it('aborts pending request on unmount', async () => {
        /* TODO: aborts pending request on unmount */
    })
})
