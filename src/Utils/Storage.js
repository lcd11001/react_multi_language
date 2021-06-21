import
    {
        EncryptData,
        DecryptData,
        Hash
    } from './Cryption'

class CmsStorage
{
    constructor()
    {
        this.REMEMBER_ME = Hash('remember_me')
        this.LOGIN_TOKEN = Hash('login_token')
        this.EMAIL = Hash('email')

        this.isRememberMe = this.getLocal(this.REMEMBER_ME) === true
        console.log('CmsStorage::constructor', this.isRememberMe)
    }

    encryptValue(value)
    {
        if (value === null)
        {
            value = 'null'
        }

        if (value === undefined)
        {
            value = 'undefined'
        }

        return EncryptData(JSON.stringify({
            value
        }))
    }

    decryptValue(value)
    {
        if (value === null || value === undefined)
        {
            return value
        }

        if (value === 'null')
        {
            return null
        }

        if (value === 'undefined')
        {
            return undefined
        }

        let decryptData = DecryptData(value)
        if (decryptData)
        {
            let obj = JSON.parse(decryptData)
            if (obj.value === 'null')
            {
                return null
            }
            if (obj.value === 'undefined')
            {
                return undefined
            }
            return obj.value
        }

        return decryptData
    }

    setLocal = (key, value) =>
    {
        localStorage.setItem(key, this.encryptValue(value))
    }

    getLocal = (key) =>
    {
        return this.decryptValue(localStorage.getItem(key))
    }

    clearLocal = (key) =>
    {
        let encryptValue = this.getLocal(key)
        localStorage.removeItem(key)
        return this.decryptValue(encryptValue)
    }

    setSession = (key, value) =>
    {
        sessionStorage.setItem(key, this.encryptValue(value))
    }

    getSession = (key) =>
    {
        return this.decryptValue(sessionStorage.getItem(key))
    }

    clearSession = (key) =>
    {
        let encryptValue = this.getSession(key)
        sessionStorage.removeItem(key)
        return this.decryptValue(encryptValue)
    }

    setItem(key, value)
    {
        if (key === this.REMEMBER_ME)
        {
            this.setLocal(key, value)
            this.isRememberMe = value

            if (value === false)
            {
                let login_token = this.clearLocal(this.LOGIN_TOKEN)
                this.setSession(this.LOGIN_TOKEN, login_token)

                let email = this.clearLocal(this.EMAIL)
                this.setSession(this.EMAIL, email)
            } 
            else
            {
                let login_token = this.clearSession(this.LOGIN_TOKEN)
                this.setLocal(this.LOGIN_TOKEN, login_token)

                let email = this.clearSession(this.EMAIL)
                this.setLocal(this.EMAIL, email)
            }

            return
        }

        if (this.isRememberMe)
        {
            this.setLocal(key, value)
        } 
        else
        {
            this.setSession(key, value)
        }
    }

    getItem(key)
    {
        if (this.isRememberMe)
        {
            return this.getLocal(key)
        }
        return this.getSession(key)
    }

    clearAllItems()
    {
        localStorage.clear()
        sessionStorage.clear()
        this.isRememberMe = false
    }
}



const storage = new CmsStorage()

export const getItem = (key) =>
{
    return storage.getItem(key)
}

export const setItem = (key, value) =>
{
    storage.setItem(key, value)
}

export const clearAllItems = () =>
{
    storage.clearAllItems()
}

export const REMEMBER_ME = storage.REMEMBER_ME
export const LOGIN_TOKEN = storage.LOGIN_TOKEN
export const EMAIL = storage.EMAIL
