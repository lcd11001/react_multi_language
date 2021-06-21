import { ActionType } from 'redux-promise-middleware'
import * as ActionGlobal from './ActionGlobal'
import * as API from '../../API'

// Fixed: share state between 2 reducers
export const ChangeLanguage = (language) =>
{
    return (dispatch) =>
    {
        dispatch(ActionGlobal.SetLoading())

        return dispatch({
            type: 'CHANGE_LANGUAGE',
            payload: new Promise.resolve({ language })
                .catch(err =>
                {
                    dispatch(ActionGlobal.SetError(err))
                })
                .finally(() =>
                {
                    dispatch(ActionGlobal.ClearLoading())
                })
        })
    }
}

export const SendEmail = (templateID, params) =>
{
    return (dispatch) =>
    {
        dispatch(ActionGlobal.SetLoading())

        return dispatch({
            type: 'SEND_EMAIL',
            payload: API.SendEmail(templateID, params)
                .then(response =>
                {
                    return Promise.resolve(response)
                })
                .catch(err =>
                {
                    dispatch(ActionGlobal.SetError(err))
                    return Promise.reject(err)
                })
                .finally(() =>
                {
                    dispatch(ActionGlobal.ClearLoading())
                })
        })
    }
}


