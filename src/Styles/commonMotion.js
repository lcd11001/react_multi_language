const transition = {
    duration: 0.6,
    ease: [0.53, 0.13, 0.23, 0.96]
}

const pageTransition = {
    in: {
        opacity: 1
    },
    out: {
        opacity: 0
    }
}

const delayTransition = (delay) => ({
    hidden: {
        opacity: 0
    },
    visible: {
        opacity: 1,
        transition: {
            when: 'beforeChildren',
            delay: delay,
            staggerChildren: 0.5
        }
    },
    invisible: {
        opacity: 0,
        transition: {
            when: 'afterChildren',
            staggerChildren: 0.5
        }
    }
})

const groupTransition = {
    hidden: {
        opacity: 0
    },
    visible: {
        opacity: 1,
        transition: {
            when: 'beforeChildren',
            staggerChildren: 0.5
        }
    },
    invisible: {
        opacity: 0,
        transition: {
            when: 'afterChildren',
            staggerChildren: 0.5
        }
    }
}

const elementTransition = {
    hidden: {
        opacity: 0,
        y: '50px'
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            ease: 'easeOut',
            duration: 0.8,

            when: 'beforeChildren',
            staggerChildren: 0.5
        }
    },
    invisible: {
        opacity: 0,
        y: '50px',
        transition: {
            when: 'afterChildren',
            staggerChildren: 0.5
        }
    }
}

const groupHeaderTransition = (speed = 0) => ({
    hidden: {
        opacity: 0
    },
    visible: {
        opacity: 1,
        transition: {
            when: 'beforeChildren',
            staggerChildren: speed
        }
    },
    invisible: {
        opacity: 0,
        transition: {
            when: 'afterChildren',
            staggerChildren: speed
        }
    }
})

const headerTransition = {
    hidden: {
        y: '-50px',
        opacity: 0
    },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            ease: 'easeOut',
            duration: 0.8,

            when: 'beforeChildren',
            staggerChildren: 0
        }
    },
    invisible: {
        y: '-50px',
        opacity: 0,
        transition: {
            when: 'afterChildren',
            staggerChildren: 0
        }
    }
}

const headerTransitionX = {
    hidden: {
        x: '-100%',
        opacity: 0
    },
    visible: {
        x: 0,
        opacity: 1,
        transition: {
            ease: 'easeOut',
            duration: 0.5,

            when: 'beforeChildren',
            staggerChildren: 0
        }
    },
    invisible: {
        x: '-100%',
        opacity: 0,
        transition: {
            ease: 'easeIn',
            duration: 0.5,

            when: 'afterChildren',
            staggerChildren: 0
        }
    }
}

const groupFooterTransition = {
    hidden: {
        opacity: 0
    },
    visible: {
        opacity: 1,
        transition: {
            when: 'beforeChildren',
            staggerChildren: 0.8
        }
    },
    invisible: {
        opacity: 0,
        transition: {
            when: 'afterChildren',
            staggerChildren: 0.8
        }
    }
}

const footerTransition = {
    hidden: {
        y: '50px',
        opacity: 0
    },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            ease: 'easeOut',
            duration: 0.8,

            when: 'beforeChildren',
            staggerChildren: 0.8
        }
    },
    invisible: {
        y: '50px',
        opacity: 0,
        transition: {
            when: 'afterChildren',
            staggerChildren: 0.8
        }
    }
}

const footerTransitionZ1 = {
    hidden: {
        opacity: 0,
        y: '50px',
        zIndex: 1
    },
    visible: {
        opacity: 1,
        y: 0,
        zIndex: 1,
        transition: {
            ease: 'easeOut',
            duration: 0.8,

            when: 'beforeChildren',
            staggerChildren: 0.8
        }
    },
    invisible: {
        opacity: 0,
        y: '50px',
        zIndex: 1,
        transition: {
            when: 'afterChildren',
            staggerChildren: 0.8
        }
    }
}

const specializeTransition = {
    hidden: {
        x: '3%',
        // opacity: 0,
        scale: 0.97
    },
    out: {
        // opacity: 0,
        x: '3%',
        scale: 0.97,
        transition: {
            duration: .5,
            ease: 'easeOut'
        }
    },
    in: {
        // opacity: 1,
        x: 0,
        scale: 1,
        transition: {
            duration: .5,
            ease: 'easeIn'
        }
    },
}

const backgroundTransition = {
    hidden: {
        opacity: 0,
    },
    in: {
        opacity: 1,
        transition: {
            when: 'beforeChildren',
            duration: .5,
            ease: 'easeIn'
            // ease: 'linear'
        }
    },
    out: {
        opacity: 0,
        transition: {
            when: 'afterChildren',
            duration: .5,
            ease: 'easeOut'
            // ease: 'linear'
        }
    }
}

const posTransition = (x, y, delay, duration) => ({
    hidden: {
        opacity: 0,
        x: `${x}px`,
        y: `${y}px`,
        transition: {
            delay: 0
        }
    },
    visible: {
        opacity: 1,
        x: 0,
        y: 0,
        transition: {
            duration,
            delay
        }
    },
    invisible: {
        opacity: 0,
        x: `${x}px`,
        y: `${y}px`,
        transition: {
            delay,
            duration
        }
    }
})

const hashTagTransition = {
    hidden: {
        // opacity: 0,
        y: 5
    },
    visible: {
        // opacity: [0, 1, 0],
        y: [5, -5, 5],
        transition: {
            loop: Infinity,
            ease: 'easeInOut',
            duration: 2.0,

            when: 'beforeChildren',
            staggerChildren: 0.5
        }
    },
    invisible: {
        // opacity: 0,
        y: 5,
        transition: {
            when: 'afterChildren',
            staggerChildren: 0.5
        }
    }

}

const groupTextTransition = (speed = 0.08) => ({
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
        transition: {
            when: 'beforeChildren',
            staggerChildren: speed
        }
    },
    invisible: {
        opacity: 0,
        transition: {
            when: 'afterChildren',
            staggerChildren: speed
        }
    }
})

const textTransition = {
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 1
    },
    invisible: {
        opacity: 0
    }
}

export default {
    transition,
    pageTransition,
    delayTransition,
    groupTransition,
    elementTransition,
    groupHeaderTransition,
    headerTransition,
    headerTransitionX,
    groupFooterTransition,
    footerTransition,
    footerTransitionZ1,
    specializeTransition,
    backgroundTransition,
    posTransition,
    hashTagTransition,
    groupTextTransition,
    textTransition
}