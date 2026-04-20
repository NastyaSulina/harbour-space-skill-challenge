import { normalizeScholarshipPage } from './normalize'

import type { AxiosInstance } from 'axios'
import type { ScholarshipPageRaw } from '../model/scheme'
import type { ScholarshipPage } from '../model/types'

export class ScholarshipService {
    private http: AxiosInstance

    constructor(http: AxiosInstance) {
        this.http = http
    }

    async getPage(slug: string, signal?: AbortSignal): Promise<ScholarshipPage> {
        const response = await this.http.get<ScholarshipPageRaw>(`/scholarship_pages/${slug}`, {
            signal,
        })

        if (!response.data?.scholarship) {
            throw new Error('Invalid API response: missing scholarship data')
        }

        return normalizeScholarshipPage(response.data)
    }
}
