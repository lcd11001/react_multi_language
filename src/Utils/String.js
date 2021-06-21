import * as _ from 'lodash'

export const parseString = (str, ...rest) =>
{
    var args = [].slice.call(rest, 0)
    var i = 0
    return str.replace(/{%s}/g, () => args[i++])
}

export const hasNumber = value =>
{
    return new RegExp(/[0-9]/).test(value)
}

export const hasUpperCase = value =>
{
    return new RegExp(/[A-Z]/).test(value)
}

export const hasLowerCase = value =>
{
    return new RegExp(/[a-z]/).test(value)
}

export const hasSpecial = value =>
{
    return new RegExp(/[!#@$%^&*)(+=._-]/).test(value)
}

export const isEmail = value =>
{
    return new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).test(value)
}

export const isVersion = value =>
{
    return new RegExp(/^\d+\.\d+(\.\d+)?[a-z]?$/).test(value)
}
