import React from 'react';
import PropTypes from 'prop-types';
import { withMultipleStyles, breakpointsStyle } from '../../Styles'
import Typography from '@material-ui/core/Typography'
import { Modal, Button, IconButton } from '@material-ui/core'
import ClearIcon from '@material-ui/icons/Clear'

const top = 50
const left = 50

const styles = theme => ({
    paper: {
        position: 'absolute',
        ...breakpointsStyle(
            theme,
            {
                key: ['minWidth', 'width'],
                value: [theme.spacing(50), 35],
                variant: [theme.spacing(5), -15],
                unit: ['px', '%']
            }
        ),
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        outline: 'none',
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
        borderRadius: 5
    },

    title: {
        borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
        padding: theme.spacing(3),
        paddingBottom: theme.spacing(2),
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    content: {
        padding: theme.spacing(3),

    },

    action: {
        textAlign: 'right',
        padding: theme.spacing(3),
    },

    titleTypo: {
        fontSize: '1.125rem',
        fontWeight: theme.typography.fontWeightBold,
        textTransform: 'capitalize'
    },

    button: {
        margin: theme.spacing(1),
        padding: '5px 20px',
        textTransform: 'uppercase'
    },
})

class ModalDialog extends React.Component
{

    render()
    {
        const {
            classes,
            open,
            confirmDisable,

            titleText,
            confirmText,
            cancelText,
            abortText,

            cancelButton,

            handleCancelClick,
            handleConfirmClick,
            handleAbortClick
        } = this.props;
        return (
            <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
                open={open}
                disableBackdropClick
            >
                <div className={classes.paper}>
                    <div id="modal-title" className={classes.title}>
                        <Typography className={classes.titleTypo} id="modal-title">
                            {titleText}
                        </Typography>
                        {
                            cancelButton && (
                                <IconButton onClick={handleCancelClick}>
                                    <ClearIcon />
                                </IconButton>
                            )
                        }
                    </div>

                    <div id="modal-content" className={classes.content}>
                        {this.props.children}
                    </div>

                    <div id="modal-action" className={classes.action}>
                        {
                            abortText && (
                                <Button
                                    id='abort-button'
                                    variant={cancelText ? 'contained' : 'outlined'}
                                    className={classes.button}
                                    onClick={handleAbortClick}
                                >
                                    {abortText}
                                </Button>
                            )
                        }
                        {
                            cancelText && (
                                <Button
                                    id='cancel-button'
                                    variant={abortText ? 'contained' : 'outlined'}
                                    className={classes.button}
                                    onClick={handleCancelClick}
                                >
                                    {cancelText}
                                </Button>
                            )
                        }
                        {
                            confirmText && (
                                <Button
                                    id='confirm-button'
                                    disabled={confirmDisable}     //Button is disabled if there are still no selected style
                                    variant='contained'
                                    className={classes.button}
                                    onClick={handleConfirmClick}
                                >
                                    {confirmText}
                                </Button>
                            )
                        }

                    </div>
                </div>
            </Modal>
        )
    }
}

ModalDialog.propTypes = {
    classes: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    confirmDisable: PropTypes.bool,
    titleText: PropTypes.string,
    confirmText: PropTypes.string,
    cancelText: PropTypes.string,
    abortText: PropTypes.string,

    cancelButton: PropTypes.bool,

    handleCancelClick: PropTypes.func,
    handleConfirmClick: PropTypes.func,
    handleAbortClick: PropTypes.func,
}

ModalDialog.defaultProps = {
    cancelText: null,
    confirmText: null,
    abortText: null,

    cancelButton: false
}

export default withMultipleStyles(styles)(ModalDialog)