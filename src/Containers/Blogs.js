import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx'

import { withMultipleStyles, breakpointsStyle, commonStyles, commonMotion } from '../Styles';
import { motion } from 'framer-motion'

import { Trans, withTranslation } from 'react-i18next'
import ID from '../Translations/ID.json'

import compose from 'recompose/compose'

import Utils from '../Utils'
import { withWidth, Typography, isWidthDown } from '@material-ui/core';

import InViewElement from '../Components/InViewElement'
import AspectRatio from '../Components/AspectRatio';

const styles = theme => ({

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
        color: theme.palette.text.secondary,

        [theme.breakpoints.only('xs')]: {
            fontSize: 32,
        }
    },

    section1_txt1_dim: {
        color: '#FFFFFF'
    },

    
});

class Blogs extends React.Component
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

        let ImageUrl = `url("${Utils.getUrl(t(ID.IMAGE.BACKGROUND_BLOG))}")`

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
                                i18nKey={isSmallScreen ? ID.BLOG.SECTION_1_TEXT_1_SMALL : ID.BLOG.SECTION_1_TEXT_1}
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
        // console.log('Blogs::render', this.props)
        return (
            <motion.div
                className={clsx(classes.root)}
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

Blogs.propTypes =
{
    classes: PropTypes.object.isRequired,
};

export default compose(
    withMultipleStyles(commonStyles, styles),
    withTranslation(),
    withWidth()
)(Blogs);

