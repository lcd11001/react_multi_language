const defaultState = {
    title: 'TITLE',
    isLoading: 0,
    loadingMessage: '',
    error: null,
    notifyMessage: '',
    notifyErrorMessage: '',
}

const ReducerGlobal = (state = defaultState, action) =>
{
    switch (action.type)
    {
        case 'GLOBAL_TITLE':
            {
                return {
                    ...state,
                    title: action.payload
                }
            }

        case 'GLOBAL_CLEAR_ERROR':
            {
                return {
                    ...state,
                    error: null
                }
            }

        case 'GLOBAL_ERROR':
            {
                return {
                    ...state,
                    error: action.payload
                }
            }

        case 'GLOBAL_CLEAR_LOADING':
            {
                return {
                    ...state,
                    isLoading: state.isLoading - 1
                }
            }

        case 'GLOBAL_LOADING':
            {
                return {
                    ...state,
                    isLoading: state.isLoading + 1,
                    loadingMessage: action.payload
                }
            }

        case 'GLOBAL_CLEAR_NOTIFY':
            {
                return {
                    ...state,
                    notifyMessage: '',
                    notifyErrorMessage: ''
                }
            }

        default:
            return state
    }
}

export default ReducerGlobal