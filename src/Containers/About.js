import React from 'react';
import PropTypes from 'prop-types';
import { withMultipleStyles, breakpointsStyle, commonStyles, commonMotion } from '../Styles';
import clsx from 'clsx'
import { motion } from 'framer-motion'

import { Trans, withTranslation } from 'react-i18next'
import ID from '../Translations/ID.json'

import compose from 'recompose/compose'

import Utils from '../Utils'

import { Typography, withWidth, isWidthDown } from '@material-ui/core';

import AspectRatio from '../Components/AspectRatio';
import InViewElement from '../Components/InViewElement';

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
        //         variant: [40],
        //         unit: ['px']
        //     }
        // ),
        height: '100%',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },

    section1_txt1: {
        color: theme.palette.text.secondary
    },

    section1_txt1_dim: {
        color: '#FFFFFF'
    },

    
})

class About extends React.Component
{
    constructor(props)
    {
        super(props)

        this.refContactBox1 = React.createRef()
    }
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    renderSection1()
    {
        const {
            classes,
            t,
            width
        } = this.props;

        let ImageUrl = `url("${Utils.getUrl(t(ID.IMAGE.BACKGROUND_ABOUT))}")`
        const isSmallScreen = isWidthDown('sm', width)
        const ratio = isSmallScreen ? (600 / 380) : (1920 / 600)

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
                                i18nKey={isSmallScreen ? ID.ABOUT.SECTION_1_TEXT_1_SMALL : ID.ABOUT.SECTION_1_TEXT_1}
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
        const { classes } = this.props;
        // console.log('About::render', this.props)
        return (
            <motion.div
                className={classes.root}
                initial={'in'}
                animate={'in'}
                exit={'out'}
                transition={commonMotion.transition}
                variants={commonMotion.pageTransition}
            >
                {this.renderSection1()}
            </motion.div>
        );
    }
}

About.propTypes =
{
    classes: PropTypes.object.isRequired,
};


export default compose(
    withMultipleStyles(commonStyles, styles),
    withTranslation(),
    withWidth()
)(About);