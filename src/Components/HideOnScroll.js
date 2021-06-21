import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Slide } from '@material-ui/core'
import { useScrollPosition } from '@n8tb1t/use-scroll-position'

function HideOnScroll(props)
{
    const { children, window } = props
    const [isShow, setShow] = useState(false)
    const [timerID, setTimerID] = useState(null)

    const setTimer = (timeout) =>
    {
        if (timerID !== null)
        {
            clearTimeout(timerID)
        }

        isShow && setTimerID(
            setTimeout(() =>
            {
                setShow(false)
            }, timeout)
        )
    }

    useScrollPosition(({ prevPos, currPos }) =>
    {
        const willShow = currPos.y > prevPos.y && currPos.y < props.offsetY
        if (willShow !== isShow)
        {
            setShow(willShow)
        }
    }, [isShow])

    useEffect(() =>
    {
        props.timeout && setTimer(props.timeout)
    }, [props.timeout, isShow])

    return (
        <Slide appear={false} direction={'down'} in={isShow}>
            {children}
        </Slide>
    )
}

HideOnScroll.propTypes = {
    children: PropTypes.element.isRequired,
    window: PropTypes.func,
    offsetY: PropTypes.number,
    timeout: PropTypes.number
}

HideOnScroll.defaultProps = {
    offsetY: Number.POSITIVE_INFINITY,
    timeout: 5000
}

export default HideOnScroll