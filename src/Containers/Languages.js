import React from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose'

import { withMultipleStyles, breakpointsStyle, commonStyles } from '../Styles';

import ID from '../Translations/ID.json'
import Utils from '../Utils'

import clsx from 'clsx'
import { withTranslation } from 'react-i18next';
import { Icon, IconButton } from '@material-ui/core';


const styles = theme => ({
    root: {

    },

    buttonRoot: {
        '&:hover': {
            backgroundColor: 'transparent'
        },
        padding: 5
    },
    icon: {
        ...breakpointsStyle(theme,
            {
                key: ['height'],
                value: [25],
                variant: [2],
                unit: ['px']
            }
        ),
        width: 'auto',
        objectFit: 'cover'
    }
});

class Languages extends React.Component
{
    render()
    {
        const {
            classes,
            i18n,
            t
        } = this.props

        const ENFlag = Utils.getUrl(t(ID.IMAGE.LANGUAGE_EN))
        const VNFlag = Utils.getUrl(t(ID.IMAGE.LANGUAGE_VN))

        return (
            <div className={clsx(classes.root, classes.divRow, classes.divCenter)}>
                <IconButton
                    classes={{ root: classes.buttonRoot }}
                    onClick={() => i18n.changeLanguage(ID.COMMON.LANGUAGE_EN)}
                >
                    <img className={classes.icon} alt={'EN'} src={ENFlag} />
                </IconButton>
                <IconButton
                    classes={{ root: classes.buttonRoot }}
                    onClick={() => i18n.changeLanguage(ID.COMMON.LANGUAGE_VN)}
                >
                    <img className={classes.icon} alt={'VN'} src={VNFlag} />
                </IconButton>
            </div>
        );
    }
}

Languages.propTypes =
{
    classes: PropTypes.object.isRequired
};

export default compose(
    withMultipleStyles(commonStyles, styles),
    withTranslation()
)(Languages);
