import React, { useState, useEffect } from 'react';

function Timer() {
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevSeconds) => prevSeconds - 1);
    }, 1000);
    if (timer === 0) {
      clearInterval(interval);
      console.log('ha terminado el tiempo');
    }
    return () => clearInterval(interval);
  }, [timer]);

  return (
    <div>
      <h1>Timer: {timer}s</h1>
    </div>
  );
}
export default Timer;
