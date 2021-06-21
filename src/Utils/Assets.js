import axios from 'axios'

export const getUrl = (path) =>
{

    let PUBLIC_URL = `${process.env.PUBLIC_URL}`

    if (path.startsWith(`${PUBLIC_URL}/`))
    {
        path = path.slice(PUBLIC_URL.length + 1)
    }

    let finalPath = path.startsWith('/')
        ? `${PUBLIC_URL}${path}`
        : `${PUBLIC_URL}/${path}`

    return finalPath
}

export const getBufferAsync = (url, responseType = 'arraybuffer') =>
{
    let config = {
        method: 'get',
        url: getUrl(url),
        responseType: responseType
    }
    return axios(config).then(response =>
    {
        // due to API::PostProcessing
        return response
    })
}

export const getIconUrl = (asset) =>
{
    return getUrl('icons/' + asset)
}

export const getImageUrl = (asset) =>
{
    return getUrl('images/' + asset)
}

export const getLogoUrl = (asset) =>
{
    return getUrl('logos/' + asset)
}

