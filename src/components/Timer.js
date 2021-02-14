import React, { useState, useEffect } from 'react';
import { differenceInSeconds, addSeconds, intervalToDuration } from 'date-fns';
import './timer.css';
import Clock from './Clock';

const Timer = () => {
  const [isActive, setIsActive] = useState(false);
  const [workInterval, setWorkInterval] = useState(5);
  const [workTimer, setWorkTimer] = useState(5);
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
        setCycle('break');
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
      {/* <h1>Cycle: {cycle}</h1> */}
      {/* <h1>Work Time: {workTimer}</h1> */}
      {/* <h1>Work Interval: {workInterval}</h1> */}

      <Clock cycle={cycle} workInterval={workInterval} />

      <input
        type="number"
        onChange={(e) => handleWorkInterval(e)}
        defaultValue={workInterval}
      />
      <button onClick={toggleTimer}>{isActive ? 'Stop' : 'Start'}</button>
      <button onClick={resetTimer}>Reset</button>
    </div>
  );
};

export default Timer;
