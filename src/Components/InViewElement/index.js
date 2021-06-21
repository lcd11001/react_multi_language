import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import { useInView } from 'react-intersection-observer'
import { AnimatePresence, motion, useAnimation } from 'framer-motion'

import { withMultipleStyles, commonMotion } from '../../Styles'
import { compose } from 'recompose'
import { withWidth } from '@material-ui/core'

import uniqueId from 'lodash/uniqueId'

const styles = theme => ({
    root: {
        // overflow: 'hidden'
        width: '100%',
        height: '100%'
    }
})

const InViewElement = (props) =>
{
    const [id] = useState(uniqueId('InViewElement-'))
    const [isDidMount, setDidMount] = useState(false)
    useEffect(() =>
    {
        setDidMount(true)

        return () =>
        {
            setDidMount(false)
        }
    }, [])

    const controls = useAnimation()
    const [ref, inView] = useInView(props.options)

    useEffect(() =>
    {
        if (isDidMount)
        {
            if (inView)
            {
                controls.start(props.animate, props.transition)
            }
            else
            {
                controls.start(props.exit, props.transition)
            }
        }
        else
        {
            controls.stop()
        }
    }, [controls, inView, isDidMount, props.animate, props.exit, props.transition])

    return (
        <AnimatePresence key={`${id}-${props.width}-${isDidMount}-${inView}`}>
            {
                // inView &&
                <motion.div
                    id={`${id}-${props.width}`}
                    key={`${id}-${props.width}`}
                    className={props.classes.root}
                    animate={controls}
                    initial={props.initial}
                    variants={props.variants}
                    // transition={props.transition}
                    ref={ref}
                    style={{ ...props.style }}
                >
                    {
                        props.children
                    }
                </motion.div>
            }
        </AnimatePresence>
    )
}

InViewElement.propTypes = {
    children: PropTypes.node.isRequired,
    // use withWidth() when export
    width: PropTypes.string.isRequired,
    variants: PropTypes.object,
    transition: PropTypes.object,
    initial: PropTypes.string,
    animate: PropTypes.string,
    exit: PropTypes.string,
    options: PropTypes.shape({
        root: PropTypes.element,
        rootMargin: PropTypes.string,
        threshold: PropTypes.oneOfType([PropTypes.number, PropTypes.arrayOf(PropTypes.number)]),
        triggerOnce: PropTypes.bool,
        skip: PropTypes.bool,
        initialInView: PropTypes.bool,
        trackVisibility: PropTypes.bool,
        delay: PropTypes.number
    })
}

InViewElement.defaultProps = {
    variants: commonMotion.inViewTransition,
    transition: commonMotion.transition,
    initial: 'hidden',
    animate: 'visible',
    exit: 'invisible',
    options: {
        triggerOnce: true
    }
}

export default compose(
    withMultipleStyles(styles),
    withWidth()
)(InViewElement)