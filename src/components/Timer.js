import React from 'react';

const Timer=(props)=>{

    const {time, mode}= props;

    let min= Math.floor(time/1000/60);
    let sec= Math.floor((time/1000)% 60);

    return(

        <div>
            <p id='timer-label'>{mode}</p>
            <p id='time-left'>
                {min.toString().length===1?'0'+min:min}:{sec.toString().length===1 ? '0' + sec : sec}
            </p>
        </div>
    )


}

export default Timer