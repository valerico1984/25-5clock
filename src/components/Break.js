import React from 'react'
import {Col} from 'react-bootstrap'


const Break =(props)=>{
    
    const {increment, decrement, length} = props
 
    
    return (
        <Col className="timer-control">
        
            <p id="break-label">Break Length</p>
            <div className="container_length">
                <button id="break-decrement" value="-" onClick={decrement}><i className="fa fa-arrow-down fa-2x"/></button>
                <div id="break-length" value="break">{length/60}</div>
                <button id="break-increment" onClick={increment} value="+"><i className="fa fa-arrow-up fa-2x"/></button>
            </div>
        </Col>   
)
}

export default Break