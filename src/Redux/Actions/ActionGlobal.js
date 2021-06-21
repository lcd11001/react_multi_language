export const SetTitle = (title) => ({
    type: 'GLOBAL_TITLE',
    payload: title
})

export const ClearError = () => ({
    type: 'GLOBAL_CLEAR_ERROR'
})

export const SetError = (error) => ({
    type: 'GLOBAL_ERROR',
    payload: error
})

export const ClearLoading = () => ({
    type: 'GLOBAL_CLEAR_LOADING'
})

export const SetLoading = (loadingMessage = '') => ({
    type: 'GLOBAL_LOADING',
    payload: loadingMessage
})

export const ClearNotify = () => ({
    type: 'GLOBAL_CLEAR_NOTIFY'
})