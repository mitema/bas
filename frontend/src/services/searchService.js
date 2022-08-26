import api from './api'

export const createSearch = async (newSearch) => {
    const res = await api.post('/search', newSearch)
    return res.data
}
export const revokeSearchTask = async (task_id) => {
    const res = await api.post('/revoke', {task_id})
    return res.status
}

// TODO need to abort polling endpoint if response.status is not 200
export const updateProgress = async (task_id) => {
    const res = await api.get(`/status/${task_id}`)
    return res.data
}

