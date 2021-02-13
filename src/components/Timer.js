import React, { useState, useEffect } from 'react';
import { differenceInSeconds, addSeconds } from 'date-fns';
import './timer.css';

const Timer = () => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [workInterval, setWorkInterval] = useState(5);
  const [workTimer, setWorkTimer] = useState(5);
  const [futureTime, setFutureTime] = useState(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const pace = () => {
    const secondsRemaining = differenceInSeconds(futureTime, new Date());

    if (secondsRemaining !== workInterval || workInterval === 0) {
      setWorkInterval(workInterval - 1);
      setSeconds(secondsRemaining);
    }

    if (secondsRemaining <= 0) {
      setIsActive(!isActive);
      setWorkInterval(workTimer);
      console.log(workTimer, workInterval);
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

  return (
    <div className="app">
      <h1>Work Time: {workTimer}</h1>
      <h1>Work Interval: {workInterval}</h1>
      <h1>{seconds}</h1>

      <input
        type="number"
        onChange={(e) => handleWorkInterval(e)}
        defaultValue={workInterval}
      />
      <button onClick={toggleTimer}>{isActive ? 'Stop' : 'Start'}</button>
    </div>
  );
};

export default Timer;
