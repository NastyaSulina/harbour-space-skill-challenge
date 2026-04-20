import { renderHook, waitFor } from '@testing-library/react'

import { useScholarship } from './useScholarship'
import { LoadStatus } from './types'

import { normalizeScholarshipPage } from '../api/normalize'
import { makeScholarshipPageRaw } from '../__testing__'

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

    it('transitions to Loading state after mount', async () => {
        getPageMock.mockImplementation(() => new Promise(() => {}))

        const { result } = renderHook(() => useScholarship('some-slug'))

        await waitFor(() => {
            expect(result.current.status).toBe(LoadStatus.Loading)
        })
    })

    it('transitions to Success on successful fetch', async () => {
        const page = normalizeScholarshipPage(makeScholarshipPageRaw())
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
        getPageMock.mockResolvedValue(normalizeScholarshipPage(makeScholarshipPageRaw()))

        renderHook(() => useScholarship('some-slug'))

        await waitFor(() => {
            expect(getPageMock).toHaveBeenCalledWith('some-slug', expect.any(AbortSignal))
        })
    })

    it('aborts pending request on unmount', async () => {
        const { unmount } = renderHook(() => useScholarship('some-slug'))

        await waitFor(() => {
            expect(getPageMock).toHaveBeenCalled()
        })

        const signal = getPageMock.mock.calls[0]![1] as AbortSignal
        unmount()

        expect(signal.aborted).toBe(true)
    })
})
