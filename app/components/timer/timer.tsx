import { useEffect, useRef, useState } from "react";

import { P } from "~/components/typography/typography";

interface TimerProps {
  start: boolean;
}

export const Timer = ({ start }: TimerProps) => {
  const timer = useRef(0);
  const [time, setTime] = useState(0);

  useEffect(() => {
    if (!start) return;

    const id = setInterval(() => {
      timer.current = timer.current + 1;
      setTime(timer.current);
    }, 1000);

    return () => clearInterval(id);
  }, [start]);

  return <P>{new Date(time * 1000).toISOString().substring(11, 19)}</P>;
};
