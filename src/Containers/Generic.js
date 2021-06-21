import React from 'react';
import PropTypes from 'prop-types';
import { withMultipleStyles, breakpointsStyle, commonStyles, commonMotion } from '../Styles';
import { withRouter } from 'react-router-dom'
import { motion } from 'framer-motion'
import clsx from 'clsx'

import { Trans, withTranslation } from 'react-i18next'
import ID from '../Translations/ID.json'

import compose from 'recompose/compose'

import Utils from '../Utils'
import PageUnderContruction from '../Components/PageError/PageUnderContruction';
import { withWidth, Typography } from '@material-ui/core';

import InViewElement from '../Components/InViewElement'
import AspectRatio from '../Components/AspectRatio';

const styles = theme => ({
    section1: {
        backgroundColor: theme.palette.primary.main,
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

class Generic extends React.Component
{
    renderSection1() 
    {
        const {
            classes,
            t,
            width
        } = this.props;

        return (
            <InViewElement variants={commonMotion.groupTransition} key={`section1-${width}`}>
                <AspectRatio ratio={1920 / 600}>
                    <motion.div
                        variants={commonMotion.groupTransition} 
                        id={'section1'}
                        className={clsx(classes.section, classes.section1)}
                    >
                        <Typography className={clsx(classes.textBreak, classes.text62, classes.section1_txt1, classes.section1_txt1_dim)} >
                            <Trans
                                i18nKey={ID.COMMON.PAGE_TITLE}
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
        // console.log('Generic::render', this.props)
        return (
            <motion.div
                className={classes.root}
                initial={'in'}
                animate={'in'}
                exit={'out'}
                transition={commonMotion.transition}
                variants={commonMotion.pageTransition}
            >
                {
                    this.renderSection1()
                }
                <PageUnderContruction />
            </motion.div>
        );
    }
}

Generic.propTypes =
{
    classes: PropTypes.object.isRequired,
};

export default compose(
    withMultipleStyles(commonStyles, styles),
    withTranslation(),
    withWidth()
)(Generic);

