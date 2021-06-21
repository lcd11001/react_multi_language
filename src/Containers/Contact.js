import React from 'react';
import PropTypes from 'prop-types';
import { withMultipleStyles, breakpointsStyle, commonStyles, commonMotion } from '../Styles';
import { withRouter } from 'react-router-dom'
import { motion } from 'framer-motion'
import clsx from 'clsx'

import { Trans, withTranslation } from 'react-i18next'

import * as Icons from '../Components/NekoIcons'

import ID from '../Translations/ID.json'

import compose from 'recompose/compose'

import Utils from '../Utils'

import { withWidth, Typography, FormControl, Button, Grid, TextField, isWidthDown } from '@material-ui/core';

import AspectRatio from '../Components/AspectRatio'
import InViewElement from '../Components/InViewElement'
import SendEmail from '../Components/SendEmail'

const styles = theme => ({
    pageRoot: {
        position: 'relative',
        backgroundColor: '#FFFFFF',
    },

    ///////////////////////////////////////////////////////////////////////////////////////////////////

    section1: {
        backgroundColor: theme.palette.primary.main,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        // ...breakpointsStyle(theme,
        //     {
        //         key: ['height'],
        //         value: [600],
        //         variant: [20],
        //         unit: ['px']
        //     }
        // ),
        height: '100%',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        // paddingTop: '5% !important'
    },

    section1_txt1: {
        color: theme.palette.text.secondary
    },

    section1_txt1_dim: {
        color: '#FFFFFF'
    },

});

class Contact extends React.Component
{
    renderSection1() 
    {
        const {
            classes,
            t,
            width
        } = this.props;

        const isSmallScreen = isWidthDown('sm', width)
        const ratio = isSmallScreen ? (600 / 380) : (1920 / 600)

        let ImageUrl = `url(${Utils.getUrl(t(ID.IMAGE.BACKGROUND_CONTACT))})`

        return (
            <InViewElement variants={commonMotion.groupTransition} key={`section1-${width}`}>
                <AspectRatio ratio={ratio}>
                    <motion.div
                        variants={commonMotion.groupTransition}
                        id={'section1'}
                        className={clsx(classes.section, classes.section1)}
                        style={{
                            backgroundImage: ImageUrl
                        }}
                    >
                        <Typography className={clsx(classes.textBreakForce, isSmallScreen ? classes.text50 : classes.text62, classes.section1_txt1, classes.section1_txt1_dim)} >
                            <Trans
                                i18nKey={ID.CONTACT.SECTION_1_TEXT_1}
                                components={{ span: <span /> }}
                                values={{
                                    custom: clsx(classes.section1_txt1)
                                }}
                            />
                        </Typography>
                    </motion.div>
                </AspectRatio>
            </InViewElement>
        )

    }

    

    render()
    {
        const { classes, t } = this.props;
        // console.log('Contact::render', this.props)
        return (
            <motion.div
                className={clsx(classes.root, classes.pageRoot, classes.spacing)}
                initial={'in'}
                animate={'in'}
                exit={'out'}
                transition={commonMotion.transition}
                variants={commonMotion.pageTransition}
            >
                {
                    this.renderSection1()
                }
            </motion.div>
        );
    }
}

Contact.propTypes =
{
    classes: PropTypes.object.isRequired,
};

export default compose(
    withMultipleStyles(commonStyles, styles),
    withTranslation(),
    withWidth()
)(Contact);

