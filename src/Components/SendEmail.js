import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withMultipleStyles, breakpointsStyle, commonStyles, commonMotion } from '../Styles';
import { withRouter } from 'react-router-dom'
import { motion } from 'framer-motion'
import clsx from 'clsx'

import { connect } from 'react-redux'
import compose from 'recompose/compose'

import * as ActionCMS from '../Redux/Actions/ActionCMS'

import { Trans, withTranslation } from 'react-i18next'
import ID from '../Translations/ID.json'

import Utils from '../Utils'
import PageUnderContruction from '../Components/PageError/PageUnderContruction';
import { withWidth, Typography, FormControl, TextField, Button, Grid, Checkbox, FormControlLabel } from '@material-ui/core';

import InViewElement from '../Components/InViewElement'
import * as Icons from './NekoIcons'

const styles = theme => ({
    sectionDetail: {
        ...breakpointsStyle(theme,
            {
                key: ['paddingLeft', 'paddingRight'],
                value: [50, 50],
                variant: [5, 5],
                unit: ['px', 'px']
            }
        ),
    },

    sectionDetail_txt_header: {
        color: theme.palette.text.disabled
    },

    sectionDetail_txt_detail: {
        color: theme.palette.text.primary,
        paddingTop: 8,
        paddingLeft: 20
    },

    ///////////////////////////////////////////////////////////////////////////////////////////////////
    sectionSimple: {
        ...breakpointsStyle(theme,
            {
                key: ['paddingLeft', 'paddingRight'],
                value: [50, 50],
                variant: [5, 5],
                unit: ['px', 'px']
            }
        ),
        paddingTop: 'calc(var(--spacing) / 2)',
        paddingBottom: 'calc(var(--spacing) / 2)'
    },

    sectionSimple_txt_secondary: {
        color: theme.palette.text.secondary
    },

    sectionSimple_text_field: {
        marginBottom: 'calc(var(--spacing) / 2)'
    },

    ///////////////////////////////////////////////////////////////////////////////////////////////////
    sendButton: {
        // incase override CSS
    }
});

class SendEmail extends React.Component
{
    constructor(props) 
    {
        super(props)
        this.state = {
            [ID.FORM_CONTACT.SECTION_2_TEXT_1]: false,
            [ID.FORM_CONTACT.SECTION_2_TEXT_2]: false,
            [ID.FORM_CONTACT.SECTION_2_TEXT_3]: false,

            [ID.FORM_CONTACT.SECTION_3_TEXT_1]: false,
            [ID.FORM_CONTACT.SECTION_3_TEXT_2]: false,
            [ID.FORM_CONTACT.SECTION_3_TEXT_3]: false,
            [ID.FORM_CONTACT.SECTION_3_TEXT_4]: false,
            [ID.FORM_CONTACT.SECTION_3_TEXT_5]: false,
            [ID.FORM_CONTACT.SECTION_3_TEXT_6]: false,

            [ID.FORM_CONTACT.SECTION_4_NAME]: '',
            [ID.FORM_CONTACT.SECTION_4_COMPANY]: '',
            [ID.FORM_CONTACT.SECTION_4_EMAIL]: '',
            [ID.FORM_CONTACT.SECTION_4_PHONE]: '',
            [ID.FORM_CONTACT.SECTION_4_QUESTION]: '',
        }
    }

    handleCheckbox = (evt, checked) =>
    {
        const id = evt.target.id

        this.setState({
            [id]: checked
        })
    }

    handleTextbox = (useTrim) => (evt) =>
    {
        const id = evt.target.id
        const value = evt.target.value

        this.setState({
            [id]: useTrim ? value.replace(/ /g, '') : value
        })
    }

    handleSubmit = (evt) =>
    {
        evt.preventDefault()
        // https://stackoverflow.com/questions/55795125/how-to-send-email-from-my-react-web-application
        console.log('submit')

        const {
            templateID,
            SendEmailService
        } = this.props

        const params = {
            from_name: 'from_name',
            to_name: 'to_name',
            message: 'message',
            reply_to: 'reply_to',
            bcc: 'bcc',
            cc: 'cc'
        }

        SendEmailService(templateID, params)
    }

    renderDetailForm() 
    {
        const {
            classes,
            t,
            width
        } = this.props;

        const gridSpacing = {
            xl: 8,
            lg: 6,
            md: 4,
            sm: 3,
            xs: 2
        }

        return (
            <motion.div
                variants={commonMotion.elementTransition}
                id={'sectionDetail'}
                className={clsx(classes.sectionDetail)}
            >
                <Grid container spacing={gridSpacing[width]}>
                    <Grid item xs={12}>
                        <Typography className={clsx(classes.text18, classes.sectionDetail_txt_header)} >
                            <Trans
                                i18nKey={ID.FORM_CONTACT.SECTION_2_HEADER}
                            />
                        </Typography>
                    </Grid>

                    {
                        Array.apply(0, Array(3))
                            .map((_, index) => (
                                <Grid key={index} item xs={4}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                id={ID.FORM_CONTACT[`SECTION_2_TEXT_${index + 1}`]}
                                                checked={this.state[ID.FORM_CONTACT[`SECTION_2_TEXT_${index + 1}`]]}
                                                onChange={this.handleCheckbox}
                                            />
                                        }
                                        label={
                                            <Typography className={clsx(classes.text18, classes.sectionDetail_txt_detail)} >
                                                <Trans
                                                    i18nKey={ID.FORM_CONTACT[`SECTION_2_TEXT_${index + 1}`]}
                                                />
                                            </Typography>
                                        }
                                        className={clsx(classes.divLeft)}
                                    />
                                </Grid>
                            ))
                    }


                    <Grid item xs={12}>
                        <Typography className={clsx(classes.text18, classes.sectionDetail_txt_header)} >
                            <Trans
                                i18nKey={ID.FORM_CONTACT.SECTION_3_HEADER}
                            />
                        </Typography>
                    </Grid>

                    {
                        Array.apply(0, Array(6))
                            .map((_, index) => (
                                <Grid key={index} item xs={4}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                id={ID.FORM_CONTACT[`SECTION_3_TEXT_${index + 1}`]}
                                                checked={this.state[ID.FORM_CONTACT[`SECTION_3_TEXT_${index + 1}`]]}
                                                onChange={this.handleCheckbox}
                                            />
                                        }
                                        label={
                                            <Typography className={clsx(classes.text18, classes.sectionDetail_txt_detail)} >
                                                <Trans
                                                    i18nKey={ID.FORM_CONTACT[`SECTION_3_TEXT_${index + 1}`]}
                                                />
                                            </Typography>
                                        }
                                        className={clsx(classes.divLeft)}
                                    />
                                </Grid>
                            ))
                    }

                    <Grid item xs={12}>
                        <Typography className={clsx(classes.text18, classes.sectionDetail_txt_header)} >
                            <Trans
                                i18nKey={ID.FORM_CONTACT.SECTION_4_HEADER}
                            />
                        </Typography>
                    </Grid>
                </Grid>
            </motion.div>
        )
    }

    renderSimpleForm() 
    {
        const {
            classes,
            t,
        } = this.props;

        return (
            <motion.div
                variants={commonMotion.elementTransition}
                id={'sectionSimple'}
                className={clsx(classes.sectionSimple)}
            >
                <FormControl
                    component={'form'}
                    className={clsx(classes.divColumn, classes.divLeft)}
                    autoComplete={'on'}
                    onSubmit={this.handleSubmit}
                >
                    <TextField
                        id={ID.FORM_CONTACT.SECTION_4_NAME}
                        value={this.state[ID.FORM_CONTACT.SECTION_4_NAME]}
                        fullWidth={true}
                        required={true}
                        label={t(ID.FORM_CONTACT.SECTION_4_NAME)}
                        InputLabelProps={{
                            shrink: true,
                            classes: {
                                shrink: clsx(classes.text25)
                            }
                        }}
                        type={'text'}
                        className={classes.sectionSimple_text_field}
                        onChange={this.handleTextbox(false)}
                    />
                    <TextField
                        id={ID.FORM_CONTACT.SECTION_4_COMPANY}
                        value={this.state[ID.FORM_CONTACT.SECTION_4_COMPANY]}
                        fullWidth={true}
                        required={false}
                        label={t(ID.FORM_CONTACT.SECTION_4_COMPANY)}
                        InputLabelProps={{
                            shrink: true,
                            classes: {
                                shrink: clsx(classes.text25)
                            }
                        }}
                        type={'text'}
                        className={classes.sectionSimple_text_field}
                        onChange={this.handleTextbox(false)}
                    />
                    <TextField
                        id={ID.FORM_CONTACT.SECTION_4_EMAIL}
                        value={this.state[ID.FORM_CONTACT.SECTION_4_EMAIL]}
                        fullWidth={true}
                        required={true}
                        label={t(ID.FORM_CONTACT.SECTION_4_EMAIL)}
                        InputLabelProps={{
                            shrink: true,
                            classes: {
                                shrink: clsx(classes.text25)
                            }
                        }}
                        type={'text'}
                        inputProps={{
                            pattern: '[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'
                        }}
                        className={classes.sectionSimple_text_field}
                        onChange={this.handleTextbox(true)}
                    />
                    <TextField
                        id={ID.FORM_CONTACT.SECTION_4_PHONE}
                        value={this.state[ID.FORM_CONTACT.SECTION_4_PHONE]}
                        fullWidth={true}
                        required={true}
                        label={t(ID.FORM_CONTACT.SECTION_4_PHONE)}
                        InputLabelProps={{
                            shrink: true,
                            classes: {
                                shrink: clsx(classes.text25)
                            }
                        }}
                        type={'tel'}
                        inputProps={{
                            pattern: '[0-9]{10}'
                        }}
                        className={classes.sectionSimple_text_field}
                        onChange={this.handleTextbox(true)}
                    />
                    <TextField
                        id={ID.FORM_CONTACT.SECTION_4_QUESTION}
                        value={this.state[ID.FORM_CONTACT.SECTION_4_QUESTION]}
                        fullWidth={true}
                        required={true}
                        label={t(ID.FORM_CONTACT.SECTION_4_QUESTION)}
                        InputLabelProps={{
                            shrink: true,
                            classes: {
                                shrink: clsx(classes.text25, classes.sectionSimple_txt_secondary)
                            }
                        }}
                        multiline={true}
                        rows={5}
                        className={classes.sectionSimple_text_field}
                        onChange={this.handleTextbox(false)}
                    />
                    <div className={clsx(classes.divRow, classes.divCenter, classes.fullWidth)}>
                        <Button
                            variant={'contained'}
                            color={'secondary'}
                            endIcon={<Icons.IconMenuArrow className={classes.iconArrow} />}
                            type={'submit'}
                            classes={{
                                containedSecondary: classes.sendButton
                            }}
                        >
                            <Trans
                                i18nKey={ID.FORM_CONTACT.SECTION_4_SEND}
                            />
                        </Button>
                    </div>
                </FormControl>
            </motion.div>
        )
    }

    render()
    {
        const { simpleForm } = this.props;
        // console.log('SendEmail::render', this.props)
        return (
            <InViewElement transition={commonMotion.groupTransition}>
                {
                    !simpleForm &&
                    this.renderDetailForm()
                }
                {
                    this.renderSimpleForm()
                }
            </InViewElement>
        );
    }
}

SendEmail.propTypes =
{
    classes: PropTypes.object.isRequired,
    simpleForm: PropTypes.bool,
    templateID: PropTypes.string
};

SendEmail.defaultProps = {
    simpleForm: true,
    templateID: process.env.REACT_APP_EMAIL_TEMPLATE_TEST
}

const mapStateToProps = (state) => ({
    ...state.cms
})

const mapDispatchToProps = (dispatch) => ({
    SendEmailService: (templateID, params) =>
    {
        dispatch(ActionCMS.SendEmail(templateID, params))
    }
})

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withMultipleStyles(commonStyles, styles),
    withTranslation(),
    withWidth()
)(SendEmail);

