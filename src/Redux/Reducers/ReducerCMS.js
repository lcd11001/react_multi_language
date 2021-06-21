import { ActionType } from 'redux-promise-middleware'

const defaultState = {
    languages: [
        {
            EN: {
                flag: 'images/US.png',
                key: 'language'
            }
        },
        {
            VN: {
                flag: 'images/VN.png',
                key: 'language'
            }
        }
    ],
    currentLang: 'EN'
}

const ReducerCMS = (state = defaultState, action) =>
{
    switch (action.type)
    {
        case `CHANGE_LANGUAGE_${ActionType.Fulfilled}`: {
            return {
                ...state,
                currentLang: action.payload.language
            }
        }

        case `SEND_EMAIL_${ActionType.Fulfilled}`: {
            console.log('SEND_EMAIL OK', action)
            return {
                ...state,
                email: action.payload
            }
        }

        default:
            return state
    }
}

export default ReducerCMS