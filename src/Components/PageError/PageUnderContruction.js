import React from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import compose from 'recompose/compose'
import { withRouter } from 'react-router-dom'

import { withMultipleStyles, breakpointsStyle } from '../../Styles'
import { Typography } from '@material-ui/core'
import Utils from '../../Utils'
import { PageUnderConstructionLogo } from '../../Data/Defines'

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
        backgroundColor: 'aliceblue'
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
        backgroundImage: `url(${Utils.getImageUrl(PageUnderConstructionLogo)})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        backgroundPosition: 'bottom',
        width: '100%',
        height: '100%',
        minHeight: '100vh'
    }
})

class PageUnderContruction extends React.Component
{
    componentDidMount()
    {
        this.props.SetTitle(Utils.parseString(this.props.pageName, this.props.location.pathname))
    }
    render()
    {
        const {
            classes
        } = this.props

        return (
            <div className={classes.container}>
                <Typography className={classes.text} color={'textPrimary'}>Coming soon!</Typography>
                <div className={classes.imageBackground}></div>
            </div>
        )
    }
}

PageUnderContruction.propTypes =
{
    classes: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    pageName: PropTypes.string
};

PageUnderContruction.defaultProps = {
    pageName: 'Sorry, this page [{%s}] is under construction.'
}

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
    withRouter
)(PageUnderContruction);