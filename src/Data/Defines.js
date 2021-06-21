import * as Icons from '../Components/NekoIcons'
import ID from '../Translations/ID.json'

export const HeaderMenu = [
    {
        text: ID.MENU.HOMEPAGE, link: ID.LINK.HOME,
    },
    {
        text: ID.MENU.ABOUT, link: ID.LINK.ABOUT,
    },
    {
        text: ID.MENU.CAPABILITIES, link: ID.LINK.CAPABILITIES,
    },
    {
        text: ID.MENU.BLOG, link: ID.LINK.BLOG,
    },
    {
        text: ID.MENU.CONTACT, link: ID.LINK.CONTACT,
        customStyle: {
            border: 'custom-border-1',
            icon: 'custom-icon-1'
        },
        icon: Icons.IconMenuArrow,
        underline: 'disable'
    },
]


export const AppLogo = 'neko_logo.png'

export const PageNotFoundLogo = 'WebPageNotFound.jpg'
export const PageUnderConstructionLogo = 'WebPageConstruction.jpg'
export const NoCampaignImgFound = 'noimage.png'
export const NoQRCodeImgFound = 'noqrcode.png'