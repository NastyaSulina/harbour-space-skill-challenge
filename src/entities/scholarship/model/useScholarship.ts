import { useEffect, useState } from 'react'

import { LoadStatus, type ScholarshipPage } from './types'

import { ScholarshipService } from '../api'

import { apiClient } from '@shared/api'

const scholarshipService = new ScholarshipService(apiClient)

interface UseScholarshipResult {
    status: LoadStatus
    data: ScholarshipPage | null
    error: Error | null
}

export const useScholarship = (slug: string): UseScholarshipResult => {
    const [status, setStatus] = useState<LoadStatus>(LoadStatus.Initial)
    const [data, setData] = useState<ScholarshipPage | null>(null)
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
        const controller = new AbortController()

        const load = async () => {
            setStatus(LoadStatus.Loading)

            try {
                const page = await scholarshipService.getPage(slug, controller.signal)
                if (controller.signal.aborted) return

                setData(page)
                setStatus(LoadStatus.Success)
            } catch (err) {
                if (controller.signal.aborted) return

                setError(err instanceof Error ? err : new Error('Unknown error'))
                setStatus(LoadStatus.Error)
            }
        }

        load()

        return () => {
            controller.abort()
        }
    }, [slug])

    return { status, data, error }
}
