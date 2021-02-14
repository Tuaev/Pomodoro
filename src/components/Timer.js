import React, { useState, useEffect } from 'react';
import { differenceInSeconds, addSeconds, intervalToDuration } from 'date-fns';
import './timer.css';
import Clock from './Clock';

const Timer = () => {
  const [isActive, setIsActive] = useState(false);
  const [workInterval, setWorkInterval] = useState(1500);
  const [workTimer, setWorkTimer] = useState(25);
  const [breakTimer, setBreakTimer] = useState(3);
  const [futureTime, setFutureTime] = useState(null);
  const [cycle, setCycle] = useState('work');

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const pace = () => {
    const secondsRemaining = differenceInSeconds(futureTime, new Date());

    if (secondsRemaining !== workInterval || workInterval === 0) {
      setWorkInterval(workInterval - 1);
    }

    if (secondsRemaining <= 0) {
      if (cycle === 'work') {
        setCycle('short');
        setWorkInterval(breakTimer);
      } else {
        setCycle('work');
        setWorkInterval(workTimer);
      }

      setIsActive(!isActive);
    }
  };

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => pace(), 100);
    }
    return () => clearInterval(interval);
  }, [isActive, pace]);

  const toggleTimer = () => {
    setFutureTime(addSeconds(new Date(), workInterval));
    setIsActive(!isActive);
  };

  const handleWorkInterval = (e) => {
    e.preventDefault();
    setWorkTimer(e.target.value * 60);
    setWorkInterval(e.target.value * 60);
  };

  const resetTimer = () => {
    setFutureTime(addSeconds(new Date(), workInterval));
    setWorkInterval(workTimer);
  };

  return (
    <div className="app">
      <h3>Pomodoro</h3>
      <div className="stopwatch-card">
        <Clock cycle={cycle} workInterval={workInterval} />
        <select onChange={(e) => handleWorkInterval(e)} disabled={isActive}>
          <option value="25">25 minutes</option>
          <option value="35">35 minutes</option>
          <option value="45">45 minutes</option>
          <option value="55">55 minutes</option>
        </select>
        <div className="buttons">
          <span>
            <button className="button" onClick={toggleTimer}>
              {isActive ? 'Stop' : 'Start'}
            </button>
            {!isActive && (
              <button className="button" onClick={resetTimer}>
                Reset
              </button>
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Timer;
