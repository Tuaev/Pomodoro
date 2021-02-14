import { intervalToDuration } from 'date-fns';
import { useState } from 'react';

function Clock({ workInterval }) {
  const [formatMinutes, setFormatMinutes] = useState(10);
  const [formatSeconds, setFormatSeconds] = useState(0);

  const formatTime = () => {
    const minutesInterval = intervalToDuration({ start: 0, end: workInterval * 1000 })
      .minutes;
    const secondsInterval = intervalToDuration({ start: 0, end: workInterval * 1000 })
      .seconds;

    const minutes =
      minutesInterval.toString().length === 1 ? '0' + minutesInterval : minutesInterval;
    const seconds =
      secondsInterval.toString().length === 1 ? '0' + secondsInterval : secondsInterval;

    console.log();
    return `${minutes} : ${seconds}`;
  };

  return (
    <div>
      <p>{formatTime()}</p>
      <span>
        {intervalToDuration({ start: 0, end: workInterval * 1000 }).minutes} :{' '}
        {intervalToDuration({ start: 0, end: workInterval * 1000 }).seconds}
      </span>
    </div>
  );
}

export default Clock;
