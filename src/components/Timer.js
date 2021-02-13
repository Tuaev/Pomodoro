import React, { useState, useEffect } from 'react';
import { differenceInSeconds, addSeconds } from 'date-fns';
import './timer.css';

const Timer = () => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [workInterval, setWorkInterval] = useState(10);
  const [time, setTime] = useState(null);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const pace = () => {
    const secondsRemaining = differenceInSeconds(time, new Date());

    if (secondsRemaining !== workInterval) {
      setWorkInterval(workInterval - 1);
      setSeconds(secondsRemaining);
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
    setTime(addSeconds(new Date(), workInterval));
    setIsActive(!isActive);
    // clearInterval();
  };
  return (
    <div className="app">
      <h1>{seconds}</h1>
      <input
        type="number"
        onChange={(e) => setWorkInterval(e.target.value * 60)}
        defaultValue={workInterval}
      />
      <button onClick={toggleTimer}>{isActive ? 'Stop' : 'Start'}</button>
    </div>
  );
};

export default Timer;
