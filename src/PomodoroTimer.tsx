import  { useState, useEffect } from 'react';

function Break() {
  // Set the initial time to 5 minutes (in milliseconds)
  const initialTime = 5 * 60 * 1000;

  // Create a state variable for the remaining time            🌸🤬
  const [timeRemaining, setTimeRemaining] = useState<number>(initialTime);
  // 🌸 start the countdown only when a button is clicked.
                                                                        //🌸🤬 
  const [isRunning, setIsRunning] = useState<boolean>(false);

  // This effect runs once when the component mounts, setting up the interval
  useEffect(() => {
    // 🌸🤬
    // let intervalId: NodeJS.Timeout
    let intervalId: number;
    // 🌸🤬;
    if (isRunning) {
     intervalId = setInterval(() => {

      // Decrease timeRemaining by 1 second every second
      setTimeRemaining(time => time > 0 ? time - 1000 : 0);
    }, 1000);
  }

    // This function is run when the component is unmounted, clearing the interval
    return () => clearInterval(intervalId);
  // }, []);  // Empty dependency array means this effect runs once on mount and not again
}, [isRunning]); // This effect runs again whenever timerActive changes


  // Convert timeRemaining from milliseconds to minutes and seconds for display
  const minutes = Math.floor(timeRemaining / (60 * 1000));
  const seconds = Math.floor((timeRemaining % (60 * 1000)) / 1000);

// 🌸
const startTimer = () => {
  setTimeRemaining(initialTime);
  setIsRunning(true);
}

// 🤔
// const stopTimer = () => {
//   setIsRunning(false);
// }

// const continueTimer = () => {
//   setIsRunning(true);
// }

  return (
    <div>
      <p>Time Remaining: {minutes}:{seconds < 10 ? '0' : ''}{seconds}</p>
      <button onClick={startTimer}>Start Timer</button>
    </div>
  );
}

export default Break;








// import React, { useState, useEffect } from 'react';
// import Timer from './Timer';

// const PomodoroTimer: React.FC = () => {
//   const [isWorkTime, setIsWorkTime] = useState<boolean>(true);

//   useEffect(() => {
//     setIsWorkTime(true);
//   }, []);

//   const toggleTimer = () => {
//     setIsWorkTime(!isWorkTime);
//   }

//   return (
//     <div>
//       {isWorkTime
//         ? <Timer initialTime={25 * 60 * 1000} onTimeEnd={toggleTimer} />
//         : <Timer initialTime={5 * 60 * 1000} onTimeEnd={toggleTimer} />
//       }
//     </div>
//   )
// }

// export default PomodoroTimer;
