import './App.css';
import React, { useState, useEffect } from 'react'
import {Container, Row} from 'react-bootstrap'
import Break from './components/Break'
import Session from './components/Session'
import Timer from './components/Timer';


const App = () => {

    const [brkLength, setBkrLength]= useState(5*60);
    const [sessLength, setSessLength]= useState(25*60);
    const [mode, setMode]= useState("Session");
    const [timeLeft, setTimeLeft] = useState();
    const [isActive, setIsActive] = useState(false);
    const [timeSpent, setTimeSpent] = useState(0);
    const [beepPlaying, setBeepPlaying] = useState(false);
    const audio=document.getElementById('beep')
   

    function decrementBrkLength(){

        const decreasedBrkLength= brkLength-60 >60 ? brkLength - 60 : 60;
        setBkrLength(decreasedBrkLength);
    }

    function incrementBrkLength(){
        const incrementedBrkLength= brkLength+60<=60 *60 ? brkLength +60 : 60*60;
        setBkrLength(incrementedBrkLength)
    }

    
    function decrementSessLength(){

        const decreasedSessLength= sessLength-60 >60 ? sessLength - 60 : 60;
        setSessLength(decreasedSessLength);
    }

    function incrementSessLength(){
        const incrementedSessLength= sessLength+60<=60 *60 ? sessLength +60 : 60*60;
        setSessLength(incrementedSessLength)
    }

    useEffect(()=>{
      setTimeLeft(mode==='Session'? sessLength * 1000 : brkLength *1000);},
      [sessLength, brkLength]
            )

    useEffect(()=>{

      let interval=null;

      if (isActive && timeLeft > 1) {
        setTimeLeft(
          mode === "Session"
            ? sessLength * 1000 - timeSpent
            : brkLength * 1000 - timeSpent
        );
  
        interval = setInterval(() => {
          setTimeSpent((timeSpent) => timeSpent + 1000);
        }, 1000);
      } else {
        clearInterval(interval);
      }
      
      if (timeLeft===0){
        
        audio.play();
        setBeepPlaying(true);
        setTimeSpent(0);
        setMode((mode)=> (mode==='Session'? 'Break':'Session'));
        setTimeLeft(mode==='Session'? sessLength*1000: brkLength*1000);}

        return ()=> clearInterval(interval);},[isActive, timeSpent]);


        

      function reset(){
        setBkrLength(5*60);
        setSessLength(25*60);
        setTimeLeft(sessLength*1000);
        setMode('Session');
        audio.pause();
        audio.currentTime=0;
        setBeepPlaying(false)
        
        if (isActive){
          setIsActive(false);
          setTimeSpent(0)
        }
              
        if(beepPlaying){
          audio.pause();
          audio.currentTime=0;
          setBeepPlaying(false);
        }
      }

        function toggleIsActive(){
          setIsActive(!isActive)
        }

      
    return (

        <Container fluid id="container_general">
             <Row id="container_timer1">
                    <Break
                    increment={incrementBrkLength}
                    decrement={decrementBrkLength}
                    length={brkLength}
                    />
                    <Session
                    increment={incrementSessLength}
                    decrement={decrementSessLength}
                    length={sessLength}
                    />
              </Row>
              <Row>
                <section id="container_timer2">
                      <Timer time={timeLeft} mode={mode}/>
                 </section>
                  <section id="timer-control-general">
                      <button id="start_stop" onClick={toggleIsActive}><i className="fa fa-play fa-2x"/><i className="fa fa-pause fa-2x"/></button>
                      <button id="reset" onClick={reset} ><i className="fa fa-refresh fa-2x"/></button>
                  </section>
                  <audio
          id="beep"
          preload="auto"
          src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
         
           />
                </Row>
        </Container>

    )
}

export default App;
