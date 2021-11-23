import React from 'react';
import {useState} from 'react';
import './App.css';
import {useRef,useEffect} from 'react';

const App = () => {
  const [dayTime, setdayTime] = useState('00');
  const [hourTime, sethourTime] = useState('00');
  const [minTime, setminTime] = useState('00');
  const [secTime, setsecTime] = useState('00');
  
  let interval = useRef();

  const startTimer = () => {
    const countdownDate = new Date('January 11, 2022 00:00:00').getTime();

    interval = setInterval(() => {
      const now = new Date().getTime();
      const distdate = countdownDate - now;
      const day = Math.floor(distdate / (1000 * 60 * 60 * 24));
      const hour = Math.floor((distdate % (1000 * 60 * 60 * 24) / (1000 * 60 * 60)));
      const min = Math.floor((distdate % (1000 * 60 * 60 )) / (1000 * 60 ));
      const secs  = Math.floor((distdate % (1000 * 60 )) / 1000);
            
      if (distdate < 0) {
       clearInterval(interval.current);
      }else {
        setdayTime(day);
        sethourTime(hour);
        setminTime(min);
        setsecTime(secs);
      }

    }, 1000);
  };

  useEffect(() => {
    startTimer();
    return ()=> {
clearInterval(interval.current);
    };
  });
  return (
    <section className="timer-container">
      <section className="timer">
        <div>
          <span className="mdi mdi-calnedar-clock timer-icon"></span>
          <h3>Count Down Timer
          </h3>        
          
          </div>
          <div>
            <section>
              <p>{dayTime}</p>
              <p><small>Days</small></p>
            </section>
            <span>:</span>
            <section>
              <p>{hourTime}</p>
              <p><small>Hours</small></p>
            </section>
            <span>:</span>
            <section>
              <p>{minTime}</p>
              <p><small>Minutes</small></p>
            </section>
            <span>:</span>
            <section>
              <p>{secTime}</p>
              <p><small>Second</small></p>
            </section>
            <span>:</span>
          </div>
          
           </section>
    </section>
  )
}
export default App;
