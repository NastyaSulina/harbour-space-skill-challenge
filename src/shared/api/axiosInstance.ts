import axios from 'axios'

const API_BASE_URL = 'https://harbour.space/api/v1'

export const apiClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10_000,
    headers: {
        'Content-Type': 'application/json',
    },
})
