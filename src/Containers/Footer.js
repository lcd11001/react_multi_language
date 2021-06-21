import React from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose'
import { Link, withRouter } from 'react-router-dom'

import { withMultipleStyles, breakpointsStyle, commonStyles, commonMotion } from '../Styles';
import clsx from 'clsx'

import { Trans, withTranslation } from 'react-i18next'
import ID from '../Translations/ID.json'

import Logo from './Logo'

import { IconButton, isWidthDown, withWidth, Typography } from '@material-ui/core';
import Utils from '../Utils';
// import InViewElement from '../Components/InViewElement';
import { motion } from 'framer-motion'

import AspectRatio from '../Components/AspectRatio'

const COPYRIGHT_LINE_HEIGHT = 15

const RATIO_BACKGROUND_BIG = (1577 / 572)

const RATIO_BACKGROUND_SMALL = (928 / 672)

const screenSizes = [
    'default', // extra-large
    'lg', // large
    'md', // medium
    'sm', // small
    'xs', // extra small
]

const styles = theme => ({
    root: {
        position: 'relative',
        backgroundColor: '#FFFFFF'
    },

    rootPrimary: {
        backgroundColor: theme.palette.primary.main,
        width: '100%',
        ...breakpointsStyle(theme,
            {
                key: ['paddingLeft', 'paddingRight'],
                value: [200, 200],
                variant: [48, 48],
                unit: ['px', 'px']
            }
        ),
        paddingBottom: 0
    },

    rootSecondary: {
        position: 'absolute',
        width: '100%',
        height: '100%'
    },

    bgSecondary: {
        borderRadius: 9,
        backgroundColor: theme.palette.primary.secondary,
        backgroundRepeat: 'no-repeat',

        ...breakpointsStyle(theme,
            {
                key: ['padding'],
                value: [100],
                variant: [40],
                variantSM: [25],
                unit: ['px']
            }
        ),
    },

    bgSecondaryPosition: {
        backgroundPosition: 'left top',

        [theme.breakpoints.down('sm')]: {
            backgroundPosition: 'top center'
        }
    },

    bgSecondarySize: {
        backgroundSize: 'cover',

        [theme.breakpoints.down('sm')]: {
            backgroundSize: 'contain'
        }
    },

    txtWhite: {
        color: '#FFF',
        padding: '5px 0'
    },

    txtContact: {
        padding: '5px 0'
    },

    copyrightContainer: {
        backgroundColor: theme.palette.primary.main,
        paddingTop: 45,
        // Fixed: 1px white line when moving up
        top: -1,
        position: 'relative'
    },

    copyright: {
        width: '100%',
        backgroundColor: '#3C4570',
        paddingTop: COPYRIGHT_LINE_HEIGHT,
        paddingBottom: COPYRIGHT_LINE_HEIGHT,
        color: '#FFFFFF7F'
    },

    caption: {
        ...breakpointsStyle(theme,
            {
                key: ['paddingBottom'],
                value: [30],
                variant: [4],
                unit: ['px']
            }
        ),
    },

    logo: {
        display: 'flex',
        justifyContent: 'flex-start',
        position: 'relative'
    },

    logoRoot: {
        // transform: 'translate(0, -50%) scale(1.0)',
        transformOrigin: 'left'
    },

    contactRoot: {
        transform: 'translate(0, -30%)',

        [theme.breakpoints.down('sm')]: {
            transform: 'translate(0, 0)',
        }
    },

    icon: {
        ...breakpointsStyle(theme,
            {
                key: ['height'],
                value: [24],
                variant: [2],
                unit: ['px']
            }
        ),
        width: 'auto',
        objectFit: 'cover'
    },

    iconButton: {
        padding: 5,
        '&:hover': {
            backgroundColor: 'transparent'
        },
    },

    title: {
        ...breakpointsStyle(theme,
            {
                key: ['lineHeight'],
                value: [40],
                variant: [5],
                unit: ['px', 'px']
            }
        )
    },

    subTitle: {
        ...breakpointsStyle(theme,
            {
                key: ['paddingLeft', 'lineHeight'],
                value: [75, 40],
                variant: [18.75, 5],
                unit: ['px', 'px']
            }
        ),
        textTransform: 'uppercase',
        color: 'inherit',
        letterSpacing: 'inherit'
    },

    iconContainer: {
        borderRadius: '50%',
        ...breakpointsStyle(theme,
            {
                key: ['width', 'height'],
                value: [63, 60],
                variant: [10, 10],
                unit: ['px', 'px']
            }
        ),
    },

    iconArrow: {
        color: 'inherit',
        ...breakpointsStyle(theme,
            {
                key: ['width', 'marginLeft'],
                value: [63, 30],
                variant: [10, 5],
                unit: ['px', 'px']
            }
        ),

        transition: theme.transitions.create(['width'], {
            duration: 300
        }),

        '&--hover': {
            ...breakpointsStyle(theme,
                {
                    key: ['width'],
                    value: [43],
                    variant: [8],
                    unit: ['px']
                }
            ),
        }
    },

    footerLink: {
        color: 'white',
        letterSpacing: '1px',
        transition: theme.transitions.create(['letter-spacing'], {
            duration: 300
        }),

        '&--hover': {
            letterSpacing: '3px',
        }
    }
});

class Footer extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            isHover: false
        }
    }

    handleOpenUrl = (url) => (evt) =>
    {
        console.log(url)
        window.open(url, '_blank', undefined, false)
    }

    handleMouseEnter = (evt) =>
    {
        this.setState({
            isHover: true
        })
    }

    handleMouseLeave = (evt) =>
    {
        this.setState({
            isHover: false
        })
    }

    renderSecondary()
    {
        const { classes,
            location: {
                pathname
            },
            t,
            width
        } = this.props;

        let classFooterLink = clsx(classes.footerLink, classes.textLinkHidden, {
            [classes.footerLink + '--hover']: this.state.isHover
        })

        let classIconArrow = clsx(classes.iconArrow, {
            [classes.iconArrow + '--hover']: this.state.isHover
        })

        const isSmall = isWidthDown('sm', width)

        const classTitleRoot = clsx(classes.divColumn, classes.divCenter, classes.fullHeight, classes.fullWidth,
            isSmall ? classes.divBottom : classes.divRight
        )
        const classTitleContainer = clsx(classes.divColumn,
            isSmall ? classes.divCenter : classes.divLeft,
            isSmall ? classes.fullWidth : ''
        )

        const classTitle = clsx(classes.txtWhite, classes.title,
            isSmall ? classes.text50 : classes.text62
        )

        const rootPadding = screenSizes.reduce((padding, value, index) =>
        {
            if (value === width)
            {
                return padding - index * 48;
            }
            return padding
        }, 200)

        const rootRatio = isSmall ? RATIO_BACKGROUND_SMALL : RATIO_BACKGROUND_BIG

        return (
            <motion.div variants={commonMotion.footerTransitionZ1} className={classes.fullWidth} >
                <AspectRatio ratio={rootRatio} padding={rootPadding}>
                    <div id={'footer-secondary'} className={classes.rootSecondary} >
                        <div className={clsx(classes.divColumn, classes.divCenter, classes.bgSecondary, classes.bgSecondaryPosition, classes.bgSecondarySize, classes.fullHeight)}>
                            <div className={classTitleRoot} style={{ marginBottom: isSmall ? 10 : 0 }}>
                                <div className={classTitleContainer}>
                                    <Typography className={classTitle}>
                                        <Trans i18nKey={ID.FOOTER.SECONDARY_TITLE} />
                                    </Typography>
                                </div>
                            </div>
                        </div>
                    </div>
                </AspectRatio>
            </motion.div>
        )
    }

    renderPrimary()
    {
        const { classes, t, simpleFooter, width } = this.props;

        let classRootPrimary = clsx(classes.rootPrimary, {
            [classes.rootPrimary + '--simple']: simpleFooter
        })

        let isSmallScreen = isWidthDown('sm', width)

        const rootRatio = isSmallScreen ? RATIO_BACKGROUND_SMALL : RATIO_BACKGROUND_BIG

        const rootMarginTop = simpleFooter
            ? 0
            : 0.5 * window.innerWidth / rootRatio

        return (
            <motion.div variants={commonMotion.footerTransition} className={clsx(classes.divColumn, classes.divCenter, classes.fullWidth)}>
                <div id={'footer-primary'} className={clsx(classRootPrimary, classes.divColumn, classes.divBetween)} style={{ marginTop: -rootMarginTop, paddingTop: rootMarginTop }}>
                    <div className={clsx(classes.divRow2Column, isSmallScreen ? classes.divCenter : classes.divTop, classes.fullWidth)} style={{ flex: isSmallScreen ? 4 : 7, marginTop: 45 }}>
                        <div id={'group1'} className={clsx(classes.divRow, isSmallScreen ? classes.divCenter : classes.divTop, classes.fullWidth)} style={{ flex: isSmallScreen ? 3 : 4 }}>
                            <div id={'logo'} className={clsx(classes.divColumn, isSmallScreen ? classes.divCenter : classes.divTop, classes.fullHeight, classes.fullWidth)} style={{ position: "relative" }}>
                                <div className={classes.logo} style={{ flex: 2 }}>
                                    <Logo secondary classes={{ root: classes.logoRoot }} />
                                </div>
                                <div className={clsx(classes.divColumn, classes.divCenter, isSmallScreen ? null : classes.divLeft, classes.fullHeight, classes.contactRoot)} style={{ flex: 1 }}>
                                    <Typography className={clsx(classes.txtWhite, classes.text12, classes.txtContact)}>
                                        <Trans i18nKey={ID.FOOTER.PRIMARY_CONTACT} />
                                    </Typography>
                                    <Typography className={clsx(classes.txtWhite, classes.text12, classes.txtContact)}>
                                        <Trans i18nKey={ID.FOOTER.PRIMARY_CONTACT_EMAIL} />
                                    </Typography>
                                    <Typography className={clsx(classes.txtWhite, classes.text12, classes.txtContact)}>
                                        <Trans i18nKey={ID.FOOTER.PRIMARY_CONTACT_PHONE} />
                                    </Typography>
                                </div>
                            </div>
                        </div>

                        {
                            !isSmallScreen &&
                            <div id={'group2'} className={clsx(classes.divRow, classes.divTop, classes.fullWidth)} style={{ flex: 3 }}>
                                <div id={'work'} className={clsx(classes.divColumn, classes.divTop, classes.fullHeight)} style={{ flex: 1, minHeight: 200 }}>
                                    <div>
                                        <Typography className={clsx(classes.txtWhite, classes.text12, classes.caption)}>
                                            <Trans i18nKey={ID.FOOTER.PRIMARY_WORKS} />
                                        </Typography>
                                    </div>
                                    <div>
                                        <Typography className={clsx(classes.txtWhite, classes.text12)}>
                                            <Trans i18nKey={ID.FOOTER.PRIMARY_WORKS_BRAND} />
                                        </Typography>
                                        <Typography className={clsx(classes.txtWhite, classes.text12)}>
                                            <Trans i18nKey={ID.FOOTER.PRIMARY_WORKS_MOTION} />
                                        </Typography>
                                        <Typography className={clsx(classes.txtWhite, classes.text12)}>
                                            <Trans i18nKey={ID.FOOTER.PRIMARY_WORKS_WEB} />
                                        </Typography>
                                        <Typography className={clsx(classes.txtWhite, classes.text12)}>
                                            <Trans i18nKey={ID.FOOTER.PRIMARY_WORKS_2D} />
                                        </Typography>
                                        <Typography className={clsx(classes.txtWhite, classes.text12)}>
                                            <Trans i18nKey={ID.FOOTER.PRIMARY_WORKS_DIGITAL} />
                                        </Typography>
                                    </div>
                                </div>
                                <div id={'support'} className={clsx(classes.divColumn, classes.divTop, classes.fullHeight)} style={{ flex: 1, minHeight: 200 }}>
                                    <div>
                                        <Typography className={clsx(classes.txtWhite, classes.text12, classes.caption)}>
                                            <Trans i18nKey={ID.FOOTER.PRIMARY_SUPPORT} />
                                        </Typography>
                                    </div>
                                    <div>
                                        <Typography className={clsx(classes.txtWhite, classes.text12)}>
                                            <Trans i18nKey={ID.FOOTER.PRIMARY_SUPPORT_CONTACT} />
                                        </Typography>
                                        <Typography className={clsx(classes.txtWhite, classes.text12)}>
                                            <Trans i18nKey={ID.FOOTER.PRIMARY_SUPPORT_POLICY} />
                                        </Typography>
                                        <Typography className={clsx(classes.txtWhite, classes.text12)}>
                                            <Trans i18nKey={ID.FOOTER.PRIMARY_SUPPORT_TERMS} />
                                        </Typography>
                                    </div>
                                </div>
                                <div id={'social'} className={clsx(classes.divColumn, classes.divTop, classes.fullHeight)} style={{ flex: 1, minHeight: 200 }}>
                                    <div>
                                        <Typography className={clsx(classes.txtWhite, classes.text12, classes.caption)}>
                                            <Trans i18nKey={ID.FOOTER.PRIMARY_SOCIAL} />
                                        </Typography>
                                    </div>
                                    <div>
                                        <IconButton
                                            className={classes.iconButton}
                                            onClick={this.handleOpenUrl(t(ID.LINK.FACEBOOK))}
                                        >
                                            <img className={classes.icon} alt='facebook' src={Utils.getIconUrl('fb.svg')} />
                                        </IconButton>
                                        <IconButton
                                            className={classes.iconButton}
                                            onClick={this.handleOpenUrl(t(ID.LINK.INSTAGRAM))}
                                        >
                                            <img className={classes.icon} alt='instagram' src={Utils.getIconUrl('IG.svg')} />
                                        </IconButton>
                                        <IconButton
                                            className={classes.iconButton}
                                            onClick={this.handleOpenUrl(t(ID.LINK.YOUTUBE))}
                                        >
                                            <img className={classes.icon} alt='youtube' src={Utils.getIconUrl('youtube.svg')} />
                                        </IconButton>
                                    </div>
                                </div>
                            </div>
                        }

                        {
                            isSmallScreen &&
                            <div id={'group2'} className={clsx(classes.divRow, classes.divCenter, classes.fullWidth)} style={{ flex: 1 }}>
                                <IconButton
                                    className={classes.iconButton}
                                    onClick={this.handleOpenUrl(t(ID.LINK.FACEBOOK))}
                                >
                                    <img className={classes.icon} alt='facebook' src={Utils.getIconUrl('fb.svg')} />
                                </IconButton>
                                <IconButton
                                    className={classes.iconButton}
                                    onClick={this.handleOpenUrl(t(ID.LINK.INSTAGRAM))}
                                >
                                    <img className={classes.icon} alt='instagram' src={Utils.getIconUrl('IG.svg')} />
                                </IconButton>
                                <IconButton
                                    className={classes.iconButton}
                                    onClick={this.handleOpenUrl(t(ID.LINK.YOUTUBE))}
                                >
                                    <img className={classes.icon} alt='youtube' src={Utils.getIconUrl('youtube.svg')} />
                                </IconButton>
                            </div>
                        }
                    </div>
                </div>
                <div id={'group3'} className={clsx(classes.divRow, classes.divCenter, classes.fullWidth, classes.copyrightContainer)}>
                    <Typography className={clsx(classes.txtWhite, classes.text12, classes.copyright)} align={'center'}>
                        <Trans i18nKey={ID.FOOTER.PRIMARY_COPYRIGHT} />
                    </Typography>
                </div>
            </motion.div>
        )
    }

    render()
    {
        const {
            classes,
            simpleFooter,
            location: {
                pathname
            }
        } = this.props;

        let classRoot = clsx(classes.root, {
            [classes.root + '--simple']: simpleFooter
        })

        return (
            // <InViewElement key={pathname} variants={commonMotion.groupFooterTransition} options={{ triggerOnce: true }}>
            <div className={clsx(classRoot, classes.divColumn, classes.divBetween)}>
                {
                    !simpleFooter &&
                    this.renderSecondary()
                }
                {
                    this.renderPrimary()
                }
            </div>
            // </InViewElement>
        );
    }
}

Footer.propTypes =
{
    classes: PropTypes.object.isRequired,
    simpleFooter: PropTypes.bool
};

Footer.defaultProps =
{
    simpleFooter: false
}

export default compose(
    withMultipleStyles(commonStyles, styles),
    withTranslation(),
    withRouter,
    withWidth()
)(Footer);