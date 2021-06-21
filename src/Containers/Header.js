import React from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose'
import { withMultipleStyles, breakpointsStyle, commonStyles, commonMotion } from '../Styles';
import clsx from 'clsx'

import { withWidth, isWidthDown, IconButton, Collapse } from '@material-ui/core'

import { motion } from "framer-motion"
import { MenuToggle } from '../Components/Menu/MenuToggle'

import Logo from './Logo'
import Menu from './Menu'
import Languages from './Languages'
import { withRouter } from 'react-router-dom';
import { withTranslation } from 'react-i18next';

import ID from '../Translations/ID.json'

const styles = theme => ({
    root: {
        width: '100%'
    }
});

class Header extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            menuOpened: false
        }
    }

    handleMenu = (evt) =>
    {
        this.setState((state) => ({
            menuOpened: !state.menuOpened
        }))
    }

    handleMenuItemClicked = (link) =>
    {
        const { width } = this.props
        // console.log('handleMenuItemClicked', link)
        if (isWidthDown('sm', width))
        {
            this.setState({
                menuOpened: false
            })
        }
    }

    renderShortHeader()
    {
        const { classes, secondary } = this.props;
        const { menuOpened } = this.state
        return (
            <div className={clsx(classes.root, classes.divColumn)}>
                <div className={clsx(classes.divRow, classes.divBetween)} >
                    <Logo secondary={secondary} />
                    <motion.div variants={commonMotion.posTransition(200, 0, 0, 0.5)} animate={'visible'} initial={'hidden'}>
                        <MenuToggle toggle={this.handleMenu} animate={menuOpened ? "open" : "closed"} />
                    </motion.div>
                </div>

                <Collapse in={menuOpened} collapsedHeight={menuOpened ? window.innerHeight : 0} timeout={{ exit: 2000 }} >
                    <Menu shortMenu={true} secondary={secondary} isOpen={menuOpened} handleClicked={this.handleMenuItemClicked} />
                </Collapse>
            </div>
        );
    }

    renderHeader()
    {
        const { classes, secondary } = this.props;

        return (
            <div className={clsx(classes.root, classes.divRow, classes.divBetween)}>
                <Logo secondary={secondary} />
                <Menu secondary={secondary} />
                <Languages />
            </div>
        );
    }

    render()
    {
        const {
            width,
            t
        } = this.props

        if (isWidthDown('sm', width))
        {
            return this.renderShortHeader()
        }

        return this.renderHeader()
    }
}

Header.propTypes =
{
    classes: PropTypes.object.isRequired,
    secondary: PropTypes.bool
};


Header.defaultProps = {
    secondary: false
}

export default compose(
    withMultipleStyles(commonStyles, styles),
    withWidth(),
    withTranslation()
)(Header);