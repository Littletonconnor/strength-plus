import { useEffect, useState } from 'react';

function useTimer(start: boolean) {
  const [counter, setCounter] = useState(0);
  const [second, setSecond] = useState('00');
  const [minute, setMinute] = useState('00');

  useEffect(() => {
    setCounter(0);
    setSecond('00');
    setMinute('00');
  }, [start]);

  useEffect(() => {
    if (!start) return;

    const intervalId = setInterval(() => {
      const secondCounter = counter % 60;
      const minuteCounter = Math.floor(counter / 60);

      const computedSecond = String(secondCounter).length === 1 ? `0${secondCounter}` : String(secondCounter);
      const computedMinute = String(minuteCounter).length === 1 ? `0${minuteCounter}` : String(minuteCounter);

      setSecond(computedSecond);
      setMinute(computedMinute);

      setCounter((counter) => counter + 1);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [counter, start]);

  const time = `${minute}:${second}`;

  return time;
}

export default useTimer;
