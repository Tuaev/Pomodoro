import { intervalToDuration } from 'date-fns';
import './timer.css';
function Clock({ cycle, workInterval }) {
  const formatTime = () => {
    const minutesInterval = intervalToDuration({
      start: 0,
      end: workInterval * 1000,
    }).minutes.toString();
    const secondsInterval = intervalToDuration({
      start: 0,
      end: workInterval * 1000,
    }).seconds.toString();

    const minutes =
      minutesInterval.length === 1 ? '0' + minutesInterval : minutesInterval;
    const seconds =
      secondsInterval.length === 1 ? '0' + secondsInterval : secondsInterval;

    return `${minutes}:${seconds}`;
  };

  return (
    <div>
      <h1>{cycle}</h1>
      <p className="time">{formatTime()}</p>
    </div>
  );
}

export default Clock;
