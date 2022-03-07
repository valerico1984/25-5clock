import React from 'react'
import {Col} from 'react-bootstrap'


const Session =(props)=>{

    const {increment, decrement, length} = props

    
    return (
        <Col className="timer-control">
        
            <p id="session-label">Session Length</p>
            <div className="container_length">
                <button id="session-decrement" value="-" onClick={decrement}><i className="fa fa-arrow-down fa-2x"/></button>
                <div id="session-length" value="session">{length/60}</div>
                <button id="session-increment" onClick={increment} value="+"><i className="fa fa-arrow-up fa-2x"/></button>
            </div>
        </Col>   
)
}

export default Session