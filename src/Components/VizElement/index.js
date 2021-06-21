import { Fade } from '@material-ui/core'
import React from 'react'
import VizSensor from 'react-visibility-sensor'

class VizElement extends React.Component
{
    constructor(props)
    {
        super(props)

        this.state = {
            eletViz: false
        }
    }

    render()
    {
        return (
            <VizSensor
                partialVisibility
                minTopValue={150}
                onChange={(isVisible) =>
                {
                    this.setState({
                        eletViz: isVisible
                    })

                }}
            >

                <Fade in={this.state.eletViz} timeout={1500}>

                    {
                        this.props.children
                    }

                </Fade>
            </VizSensor>
        )
    }
}

export default VizElement