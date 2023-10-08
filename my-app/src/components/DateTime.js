import React, { useState, useEffect } from 'react';
import './seatBooking.css';


function DateTime() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <div className='ctime'>
        <div >{currentTime.toLocaleDateString()} {currentTime.toLocaleTimeString()}</div>
      </div>
    </>
  );
}

export default DateTime;