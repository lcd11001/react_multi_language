import React from 'react';
import PropTypes from 'prop-types';
import { withMultipleStyles, breakpointsStyle, commonStyles, commonMotion } from '../Styles';
import clsx from 'clsx'
import { motion } from 'framer-motion'

import { Trans, withTranslation } from 'react-i18next'

import ID from '../Translations/ID.json'

import compose from 'recompose/compose'

import { Typography, withWidth } from '@material-ui/core';


import "react-multi-carousel/lib/styles.css"

import InViewElement from '../Components/InViewElement';

const styles = theme => ({
    section1: {
        backgroundImage: `linear-gradient(${theme.palette.primary.secondary}, ${theme.palette.primary.main})`,
        ...breakpointsStyle(theme,
            {
                key: ['paddingTop'],
                value: [150],
                variant: [10],
                unit: ['px']
            }
        ),
        
        minHeight: '100vh',
    },



    section1_txt1: {
        color: 'white'
    },

    section1_txt1_dim: {
        color: '#231F20'
    },
});



class Home extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            caseIndex: 0,
            caseStudyNum: props.t(ID.HOME.SECTION_4_CASE_STUDY_NUM),
            lastHover: props.t(ID.LINK.WORKS_BRAND),
            countHover: 0
        }

        this.carouselCaseStudyRef = React.createRef()
    }


    ///////////////////////////////////////////////////////////////////////////////////////////////////

    renderSection1 = () => {
        const {
            classes,
            t
        } = this.props

        return (
            <div id={'section1'} className={clsx(classes.divColumn, classes.section, classes.section1)}>
                <InViewElement variants={commonMotion.groupTransition}>
                    <motion.div variants={commonMotion.delayTransition(0)} id={'section1.1'} className={clsx(classes.divRow2Column, classes.divCenter)}>
                        <motion.div variants={commonMotion.elementTransition} className={clsx(classes.divColumn, classes.divColumn)}>

                            <Typography className={clsx(classes.textBreak, classes.text62, classes.section1_txt1)}>
                                <Trans
                                    i18nKey={ID.HOME.SECTION_1_TEXT_1}
                                    components={{ span: <span /> }}
                                    values={{
                                        custom: clsx(classes.section1_txt1_dim)
                                    }}
                                />
                            </Typography>


                        </motion.div>


                    </motion.div>
                </InViewElement>

            </div >
        )
    }



    ///////////////////////////////////////////////////////////////////////////////////////////////////

    render() {
        const { classes } = this.props;
        // console.log('Home::render', this.props)
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

Home.propTypes =
{
    classes: PropTypes.object.isRequired,
};

export default compose(
    withMultipleStyles(commonStyles, styles),
    withTranslation(),
    withWidth()
)(Home);

