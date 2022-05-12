import { useEffect, useState } from 'react';

function useTimer() {
  const [counter, setCounter] = useState(0);
  const [second, setSecond] = useState('00');
  const [minute, setMinute] = useState('00');

  useEffect(() => {
    const intervalId = setInterval(() => {
      const secondCounter = counter % 60;
      const minuteCounter = Math.floor(counter / 60);

      const computedSecond = String(secondCounter).length === 1 ? `0${secondCounter}` : String(secondCounter);
      const computedMinute = String(minuteCounter).length === 1 ? `0${minuteCounter}` : String(minuteCounter);

      setSecond(computedSecond);
      setMinute(computedMinute);

      setCounter((counter) => counter + 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [counter]);

  const time = `${minute}:${second}`;

  return time;
}

export default useTimer;
