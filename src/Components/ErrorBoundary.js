// https://reactjs.org/docs/error-boundaries.html
import React from 'react'
import PropTypes from 'prop-types';

class ErrorBoundary extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            hasError: false,
            errMessage: '',
            infoStack: ''
        }
    }

    static getDerivedStateFromError(error)
    {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(err, info)
    {
        this.props.errorHandle && this.props.errorHandle(err, info)
        this.setState({
            hasError: true,
            errMessage: err.message ? err.message : err,
            infoStack: info.componentStack ? info.componentStack : info
        })
    }

    render()
    {
        const {
            hasError,
            errMessage,
            infoStack
        } = this.state


        if (hasError)
        {
            if (this.props.errorComponent)
            {
                return (
                    this.props.errorComponent
                )
            }

            return (
                <div>
                    <span style={{ color: 'red' }}>{errMessage}</span>
                    <br />
                    <span style={{ whiteSpace: 'pre-line' }}>{infoStack}</span>
                </div >
            )
        }

        return (
            this.props.children
        )
    }
}

ErrorBoundary.propTypes =
{
    errorComponent: PropTypes.node,
    errorHandle: PropTypes.func
};

export default ErrorBoundary