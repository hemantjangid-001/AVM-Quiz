import React from "react";
import { useState, useEffect } from "react";

export default function Timer({ setStop, questionNumber }) {
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    if (timer === 0) {
      return setStop(true);
    }

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [setStop, timer]);

  useEffect(() => {
    setTimer(60);
  }, [questionNumber]);

  return <p>{timer}</p>;
}
