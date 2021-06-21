import axios from 'axios'

const BASE_URL = process.env.REACT_APP_API_URL
const SEND_API = '/send'

const SERVICE_ID = process.env.REACT_APP_EMAIL_SERVICE_ID
const USER_ID = process.env.REACT_APP_EMAIL_USER_ID

axios.interceptors.request.use(
    config =>
    {
        return ConfigRequest(config)
    },
    error =>
    {
        return Promise.reject(error)
    }
)

axios.interceptors.response.use(
    response =>
    {
        return PostProcessing(response)
    },
    error =>
    {
        return HandleError(error)
    }
)

const ConfigRequest = (config) =>
{
    // console.log('config before send1', config)
    if (config.hasOwnProperty('payload') === false)
    {
        return config
    }

    if (config.payload.hasOwnProperty('headers'))
    {
        config['headers'] = {
            ...config['headers'],
            ...config.payload['headers']
        }
    }

    let fullUrl = config.baseURL + config.url

    if (config['headers']['Content-Type'] === 'multipart/form-data')
    {
        let formData = config['payload'].data
        config['data'] = formData
    }
    else
    {
        config['data'] = {
            ...config['payload'].data
        }
    }

    // console.log('config before send2', config)

    return config
}

const PostProcessing = (res) =>
{
    console.log('PostProcessing', res)

    if (res.status !== 200)
    {
        return Promise.reject({
            code: res.status || -1,
            title: res.statusText || 'Warning !',
            message: `invalid status ${res.status}`
        })
    }

    if (res.data)
    {
        return res.data
    }

    if (res.status === 200 && res.statusText)
    {
        return res.statusText
    }

    return Promise.reject({
        code: -2,
        message: `wrong response format ${JSON.stringify(res)}`,
        title: res.statusText || 'Warning !'
    })
}

const HandleError = (payload) =>
{
    // backend has changed the way throw error
    let response = payload.response || {}
    return Promise.reject({
        code: response.status || -3,
        title: response.statusText || 'Warning !',
        message: (response.data && response.data.error) || (payload.message) || 'unknown reason'
    })
}

const Request = (method, url, payload, contentType = 'application/json', responseType = 'json') =>
{
    let config = {}
    config['baseURL'] = BASE_URL
    config['method'] = method
    config['url'] = url
    config['responseType'] = responseType

    config['headers'] = {
        'Content-Type': contentType
    }

    config['payload'] = payload || {}

    // https://blog.logrocket.com/how-to-make-http-requests-like-a-pro-with-axios/
    return axios(config)
}

const SendEmail = (templateID, params) =>
{
    const payload = {
        data: {
            service_id: SERVICE_ID,
            user_id: USER_ID,
            template_id: templateID,
            template_params: params
        }
    }

    return Request('post', SEND_API, payload)
}

export {
    SendEmail
}