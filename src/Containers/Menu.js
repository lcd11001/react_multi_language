import React from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose'

import { motion } from 'framer-motion'

import { Link, withRouter } from 'react-router-dom';
import { withMultipleStyles, breakpointsStyle, commonStyles, commonMotion } from '../Styles';
import { Divider, Typography, withWidth, isWidthDown } from '@material-ui/core';
import { HeaderMenu } from '../Data/Defines'

import clsx from 'clsx'
import { Trans, withTranslation } from 'react-i18next';

const OPACITY = '7F'

const diagonalFrames = (color1 = 'black', color2 = 'transparent', angle = 'to right top', step = 1) =>
{
    let result = Array.apply(0, Array((100 * step) + 1))
        .reduce((frames, _, index) =>
        {
            let key = `${index / step}%`
            let value = {
                backgroundImage: `linear-gradient(${angle}, ${color1} ${key}, ${color2} 0%)`
            }
            frames[key] = value

            return frames
        }, {})

    console.log('diagonalFrames', result)
    return result
}


const styles = theme => ({
    root: {
        // > means only apply to div.root instead of all div
        // '& > div:first-child': {
        //     paddingLeft: 0
        // },

        '& > div:last-child': {
            paddingRight: 0
        },
    },

    menu: {
        ...breakpointsStyle(theme,
            {
                key: ['paddingLeft', 'paddingRight'],
                value: [18, 18],
                variant: [3, 3],
                unit: ['px', 'px']
            }
        ),
        paddingTop: 5,
        paddingBottom: 5,
        position: 'relative',


    },

    menuItem: {
        fontWeight: 'bold',
        textAlign: 'left',
        textTransform: 'uppercase',
        color: 'inherit'
    },

    menuIcon: {
        color: 'inherit',
        ...breakpointsStyle(theme,
            {
                key: ['width'],
                value: [63],
                variant: [7],
                unit: ['px']
            }
        ),

        '&--custom-icon-1': {
            ...breakpointsStyle(theme,
                {
                    key: ['marginLeft'],
                    value: [30],
                    variant: [5],
                    unit: ['px']
                }
            )
        }

        // transition: theme.transitions.create(['color'], {
        //     duration: 300
        // }),

        // '&--hover': {
        //     color: 'white'
        // }
    },

    menuBorder: {
        border: 'none',

        '&--custom-border-1': {
            border: `1px solid ${theme.palette.text.primary}`,
            ...breakpointsStyle(theme,
                {
                    key: ['paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight'],
                    value: [11, 11, 25, 25],
                    variant: [2, 2, 2, 2],
                    unit: ['px', 'px', 'px', 'px']
                }
            ),
            borderRadius: 0,

            '&--selected': {
                border: `1px solid transparent`,
                backgroundColor: theme.palette.text.primary,
                color: 'white'
            }
        },

        '&--secondary': {
            '&--custom-border-1': {
                border: '1px solid #FFFFFF',
            }
        }
    },

    menuLink: {
        color: theme.palette.text.primary,
        transition: theme.transitions.create(['color'], {
            duration: 300
        }),

        '&--selected': {
            color: `${theme.palette.text.primary}${OPACITY}`,
            pointerEvents: 'none'
        },

        '&--custom-color-1': {
            color: theme.palette.primary.secondary,

            '&--selected': {
                color: `${theme.palette.primary.secondary}${OPACITY}`,
            },
        },

        '&--secondary': {
            color: '#FFFFFF',

            '&--selected': {
                color: `#FFFFFF${OPACITY}`,
            },

            '&--custom-color-1': {
                color: '#000000',

                '&--selected': {
                    color: `#000000${OPACITY}`,
                },
            }
        },
    },

    underline: {
        width: 0,
        height: 2,
        maxWidth: '100%',
        backgroundColor: theme.palette.text.primary,
        transition: theme.transitions.create(['width'], {
            duration: 300
        }),
        pointerEvents: 'none',
        userSelect: 'none',

        '&--hover': {
            width: '100%'
        },

        '&--custom-underline-color-1': {
            backgroundColor: theme.palette.primary.secondary
        },

        '&--secondary': {
            backgroundColor: 'white',

            '&--custom-underline-color-1': {
                backgroundColor: 'black'
            }
        },
    },

    underbackground: {
        overflow: 'hidden',
        position: 'relative',
        transition: theme.transitions.create(['color', 'border-top-color', 'border-left-color', 'border-right-color', 'border-bottom-color'], {
            duration: 300
        }),

        '&--hover': {
            color: 'white',
            // border: `1px solid ${theme.palette.primary.main}`
            border: '1px solid transparent'
        },

        '&--secondary': {
            '&--hover': {
                color: 'white',
                // border: '1px solid black'
                border: '1px solid transparent'
            },
        }
    },

    diagonalBackground: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundImage: `linear-gradient(to right top, ${theme.palette.text.primary} 0%, transparent 0%)`,
        zIndex: -1,

        '&--hover-forward': {
            animationName: '$diagonal-hover',
            animationDuration: '0.3s',
            animationTimingFunction: 'linear',
            animationIterationCount: '1',
            animationFillMode: 'forwards',
            animationDirection: 'alternate'
        },

        '&--hover-backward': {
            animationName: '$diagonal-hover',
            animationDuration: '0.3s',
            animationTimingFunction: 'linear',
            animationIterationCount: '1',
            animationFillMode: 'forwards',
            animationDirection: 'reverse'
        },

        '&--secondary': {
            '&--hover-forward': {
                animationName: '$diagonal-hover-secondary',
            },
            '&--hover-backward': {
                animationName: '$diagonal-hover-secondary',
            }
        }
    },

    '@keyframes diagonal-hover': diagonalFrames(theme.palette.text.primary, 'transparent', 'to right top', 10),
    '@keyframes diagonal-hover-secondary': diagonalFrames('black', 'transparent', 'to right top', 10),

});

class Menu extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            last_hover_link: ''
        }
    }

    handleMouseClick = (link) => (evt) =>
    {
        this.setState(
            {
                // fixed: after change menu, anim diagonal-hover still play
                last_hover_link: ''
            },
            () =>
            {
                const { handleClicked } = this.props
                handleClicked && handleClicked(link)
            }
        )
    }

    handleMouseEnter = (link) => (evt) =>
    {
        this.setState({
            [`hover_${link}`]: true,
        })
    }

    handleMouseLeave = (link) => (evt) =>
    {
        this.setState(
            {
                [`hover_${link}`]: false,
                last_hover_link: link
            }
        )
    }

    renderMenu(menu)
    {
        const {
            classes,
            location: {
                pathname
            },
            shortMenu,
            t,
            secondary,
            width
        } = this.props

        const isSmallScreen = isWidthDown('sm', width)

        let menuLink = t(menu.link)

        let isSelected = pathname.includes(menuLink)
        let isHover = this.state[`hover_${menuLink}`] === true
        let isLastHover = this.state.last_hover_link === menuLink

        let classMenuItem = clsx(classes.menuItem)

        let classMenuIcon = clsx(classes.menuIcon, {
            [classes.menuIcon + '--hover']: isHover,
            [classes.menuIcon + '--' + ((menu.customStyle && menu.customStyle.icon) || 'undefined')]: (menu.customStyle && menu.customStyle.icon)
        })

        let classMenuBorder = clsx(classes.menuBorder, {
            [classes.menuBorder + '--' + ((menu.customStyle && menu.customStyle.border) || 'undefined')]: (!shortMenu && menu.customStyle && menu.customStyle.border),
            [classes.menuBorder + '--' + ((menu.customStyle && menu.customStyle.border) || 'undefined') + '--selected']: (!shortMenu && menu.customStyle && menu.customStyle.border && isSelected),

            [classes.menuBorder + '--secondary']: secondary,
            [classes.menuBorder + '--secondary--' + ((menu.customStyle && menu.customStyle.border) || 'undefined')]: (secondary && menu.customStyle && menu.customStyle.border)
        })

        let classUnderline = clsx(classes.underline, {
            [classes.underline + '--hover']: isHover,
            [classes.underline + '--' + ((menu.customStyle && menu.customStyle.underlineColor) || 'undefined')]: (menu.customStyle && menu.customStyle.underlineColor),

            [classes.underline + '--secondary']: secondary,
            [classes.underline + '--secondary--' + ((menu.customStyle && menu.customStyle.underlineColor) || 'undefined')]: (secondary && menu.customStyle && menu.customStyle.underlineColor),
        })

        let classUnderbackground = clsx(classes.underbackground, {
            [classes.underbackground + '--hover']: (!shortMenu && isHover && menu.underline === 'disable'),

            [classes.underbackground + '--secondary']: !shortMenu && secondary && menu.underline === 'disable',
            [classes.underbackground + '--secondary--hover']: (!shortMenu && secondary && isHover && menu.underline === 'disable')
        })

        let classDiagonalBackground = clsx(classes.diagonalBackground, {
            [classes.diagonalBackground + '--hover-forward']: (!shortMenu && isHover && menu.underline === 'disable'),
            [classes.diagonalBackground + '--hover-backward']: (!shortMenu && !isHover && isLastHover && menu.underline === 'disable'),

            [classes.diagonalBackground + '--secondary--hover-forward']: (!shortMenu && secondary && isHover && menu.underline === 'disable'),
            [classes.diagonalBackground + '--secondary--hover-backward']: (!shortMenu && secondary && !isHover && isLastHover && menu.underline === 'disable'),
        })

        let classMenuLink = clsx(classes.menuLink, {
            [classes.menuLink + '--selected']: isSelected,

            [classes.menuLink + '--' + ((menu.customStyle && menu.customStyle.color) || 'undefined')]: (menu.customStyle && menu.customStyle.color),
            [classes.menuLink + '--' + ((menu.customStyle && menu.customStyle.color) || 'undefined') + '--selected']: (isSelected && menu.customStyle && menu.customStyle.color),

            [classes.menuLink + '--secondary']: secondary,
            [classes.menuLink + '--secondary--selected']: (isSelected && secondary),

            [classes.menuLink + '--secondary--' + ((menu.customStyle && menu.customStyle.color) || 'undefined')]: (secondary && menu.customStyle && menu.customStyle.color),
            [classes.menuLink + '--secondary--' + ((menu.customStyle && menu.customStyle.color) || 'undefined') + '--selected']: (isSelected && secondary && menu.customStyle && menu.customStyle.color)
        })

        return (

            <motion.div variants={isSmallScreen ? commonMotion.headerTransitionX : commonMotion.headerTransition} key={menu.text} className={clsx(classes.divColumn, classes.divCenter, classes.menu)}>
                <Link to={menuLink} className={clsx(classMenuLink, classes.textLinkHidden)} onClick={this.handleMouseClick(menuLink)} onMouseEnter={this.handleMouseEnter(menuLink)} onMouseLeave={this.handleMouseLeave(menuLink)}>
                    <div className={clsx(classes.divRow, classes.divCenter, classUnderbackground, classMenuBorder)}>
                        {
                            menu.underline === 'disable' &&
                            <div key={`${menuLink}-${isHover}`} className={classDiagonalBackground} />
                        }
                        <Typography className={clsx(classMenuItem, shortMenu ? classes.text25 : classes.text12)} noWrap >
                            <Trans i18nKey={menu.text} />
                        </Typography>
                        {
                            !shortMenu && menu.icon &&
                            <menu.icon className={classMenuIcon} />
                        }
                    </div>
                </Link>
                {
                    (shortMenu || menu.underline !== 'disable') &&
                    <Divider className={classUnderline} />
                }
            </motion.div>
        )
    }

    render()
    {
        const {
            classes,
            shortMenu,
            width,
            isOpen
        } = this.props

        const isSmallScreen = isWidthDown('sm', width)

        let classRoot = shortMenu
            ? clsx(classes.root, classes.divColumn, classes.divLeft)
            : clsx(classes.root, classes.divRow, classes.divCenter)

        return (
            <motion.div variants={isSmallScreen ? commonMotion.groupHeaderTransition(0.1) : commonMotion.groupHeaderTransition(0)} animate={isOpen ? 'visible' : 'invisible'} initial={'hidden'} className={classRoot}>
                {
                    HeaderMenu
                        .filter(menu =>
                        {
                            if (menu.disable !== undefined)
                            {
                                return !!!menu.disable
                            }
                            return true
                        })
                        .map(menu => (
                            this.renderMenu(menu)
                        ))
                }
            </motion.div>
        );
    }


}

Menu.propTypes =
{
    classes: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    shortMenu: PropTypes.bool,
    secondary: PropTypes.bool,
    handleClicked: PropTypes.func,
    isOpen: PropTypes.bool
};

Menu.defaultProps = {
    shortMenu: false,
    secondary: false,
    handleClicked: null,
    isOpen: true
}

export default compose(
    withMultipleStyles(commonStyles, styles),
    withTranslation(),
    withWidth(),
    withRouter
)(Menu);
