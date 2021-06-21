import React from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import compose from 'recompose/compose'
import { motion } from 'framer-motion'

import { withMultipleStyles, breakpointsStyle, commonMotion } from '../../Styles'
import { Typography } from '@material-ui/core'
import Utils from '../../Utils'
import { PageNotFoundLogo } from '../../Data/Defines'

import * as ActionGlobal from '../../Redux/Actions/ActionGlobal'

const styles = theme => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        minHeight: '200vh',
        backgroundColor: 'antiquewhite'
    },
    text: {
        ...breakpointsStyle(
            theme,
            {
                key: 'fontSize',
                value: 3,
                variant: 0.5,
                unit: 'rem'
            }
        )
    },
    imageBackground: {
        backgroundImage: `url(${Utils.getImageUrl(PageNotFoundLogo)})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        backgroundPosition: 'bottom',
        width: '100%',
        height: '100%',
        minHeight: '100vh'
    }
})

class PageNotFound extends React.Component
{
    componentDidMount()
    {
        this.props.SetTitle('Sorry, the page not found!')
    }
    render()
    {
        const {
            classes
        } = this.props

        return (
            <motion.div
                className={classes.container}
                initial={'in'}
                animate={'in'}
                exit={'out'}
                transition={commonMotion.transition}
                variants={commonMotion.pageTransition}
            >
                <Typography className={classes.text} color={'textPrimary'}>The link you followed probaly not correct.</Typography>
                <div className={classes.imageBackground}></div>
            </motion.div>
        )
    }
}

PageNotFound.propTypes =
{
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    ...state.global
})

const mapDispatchToProps = (dispatch) => ({
    SetTitle: (title) =>
    {
        dispatch(ActionGlobal.SetTitle(title))
    }
})

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withMultipleStyles(styles),
)(PageNotFound);