import  { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import ReactHowler from 'react-howler';



// // Add the function to extract video id here 🙋‍♀️
// function extractVideoId(url: string) {
//     if (!url) return ""; // If URL is empty return an empty string
  
//     const videoId = url.split('v=')[1];
//     if (!videoId) return ""; // If no videoId is found return an empty string
  
//     const ampersandPosition = videoId.indexOf('&');
//     if (ampersandPosition !== -1) {
//       return videoId.substring(0, ampersandPosition);
//     }
  
//     return videoId;
//   }
  



const  Timer = ( ) => {
  // Set the initial time to 25 minutes (in milliseconds)
  //   const initialTime = 25 * 60 * 1000;

  // 🌸🌸
  // 🤔🤔🤔🤔🤔what is * 60 * 1000; 🌸🌸🌸🌸🌸This is a way to convert minutes to milliseconds. This is because JavaScript uses milliseconds for time calculations, so if you want to represent 25 minutes, you multiply it by 60 (to convert to seconds) and then by 1000 (to convert to milliseconds).
  const mainTime = 25 * 60 * 1000;
  const breakTime = 5 * 60 * 1000;

  // Create a state variable for the remaining time            🌸🤬
  const [timeRemaining, setTimeRemaining] = useState<number>(mainTime);
  // 🌸 start the countdown only when a button is clicked.
  //🌸🤬
  const [isRunning, setIsRunning] = useState<boolean>(false);

  // 🌸🌸
  const [isBreak, setIsBreak] = useState<boolean>(false);

  // 🌸🌸🌸
  const [userStarted, setUserStarted] = useState<boolean>(false);

  // YouTube
  // const [youtubeUrl, setYoutubeUrl] = useState<string>('');

  // This effect runs once when the component mounts, setting up the interval
  useEffect(() => {
    // 🌸🤬
    // let intervalId: NodeJS.Timeout
    let intervalId: number;
    // 🌸🤬;
    if (isRunning) {
      intervalId = setInterval(() => {
        // Decrease timeRemaining by 1 second every second
        //   setTimeRemaining(time => time > 0 ? time - 1000 : 0);
        // 🌸🌸🌸                                                          // 🤔🤔🤔🤔🤔what is , 0?🌸🌸🌸🌸🌸This expression is used to ensure that time never goes below zero    例）console.log(Math.max(-1, -3, -2)); // Expected output: -1
        setTimeRemaining((time) => Math.max(time - 1000, 0)); // prevent time from going below 0
      }, 1000);
    }

    // This function is run when the component is unmounted, clearing the interval
    // 🤔🤔🤔🤔🤔what is clearInterval?🌸🌸🌸🌸🌸 When you don't need to run that code anymore, you call clearInterval,
    return () => clearInterval(intervalId);
    // }, []);  // Empty dependency array means this effect runs once on mount and not again
  }, [isRunning]); // This effect runs again whenever timerActive changes

  // Convert timeRemaining from milliseconds to minutes and seconds for display
  // 🤔🤔🤔🤔🤔how to do math?🌸🌸🌸🌸🌸This is how you convert milliseconds back to minutes. 
  const minutes = Math.floor(timeRemaining / (60 * 1000));
  const seconds = Math.floor((timeRemaining % (60 * 1000)) / 1000);
console.log(timeRemaining)
  // 🌸🌸
  const [playSound, setPlaySound] = useState(false);

  // 🌸
  const startTimer = () => {
    setTimeRemaining(isBreak ? breakTime : mainTime);
    setIsRunning(true);
    // 🌸🌸🌸
    setUserStarted(true);

    // if (minutes === 25) {
    //   console.log('25:00')
    // }

    if (minutes === 25 && seconds === 0) {
      setPlaySound(true);
    }
  };

  // 🤔
  const stopTimer = () => {
    setIsRunning(false);
  };

  const continueTimer = () => {
    setIsRunning(true);
  };

  // 🌸🌸
  // 🤔🤔🤔🤔🤔why there are so many dependency?  [timeRemaining, isBreak, isRunning]
  // 🌸🌸🌸🌸🌸 to make sure the effect is run whenever any of these variables changes. This is how useEffect knows when to rerun its side-effect (in this case, checking whether the timer has run out and if it has, switching the break/main timer and resetting the time).
  useEffect(() => {
    if (timeRemaining === 0 && isRunning) {
      //   setIsBreak(!isBreak); // Switch between break and main timer
      //   setTimeRemaining(isBreak ? mainTime : breakTime); // Reset the time
      //   🌸🌸🌸
      setIsRunning(false);
      setUserStarted(false);
      setIsBreak(!isBreak);
    }
  }, [timeRemaining, isBreak, isRunning]);


  // 🤔remaining timeが25:00の時だけstart buttonを押したらmp3再生
//  const soundEffect = () => {
//    console.log(minutes)
//  }



  return (
    // <div>
    //   <p>Time Remaining: {minutes}:{seconds < 10 ? '0' : ''}{seconds}</p>
    //   <button onClick={startTimer}>Start Timer</button>
    //   <button onClick={stopTimer}>Stop Timer</button>
    //   <button onClick={continueTimer}>Continue Timer</button>
    // </div>
    // 🌸🌸
    //     <div>
    //     <p>Time Remaining: {minutes}:{seconds < 10 ? '0' : ''}{seconds}</p>
    //     {!isBreak && <button onClick={startTimer}>Start Timer</button>}
    //     {!isBreak && <button onClick={stopTimer}>Stop Timer</button>}
    //     {!isBreak && <button onClick={continueTimer}>Continue Timer</button>}
    //   </div>
    // 🌸🌸🌸
    // {/* <div>
    //     {!userStarted ? (
    //       <p>{isBreak ? "Time for a break! 5 mins" : "Time to work! 25 mins"}</p>
    //     ) : (
    //       <p>Time Remaining: {minutes}:{seconds < 10 ? '0' : ''}{seconds}</p>
    //     )}
    //     <button onClick={startTimer}>Start Timer</button>
    //     {!isBreak && !userStarted && <button onClick={stopTimer}>Stop Timer</button>}
    //     {!isBreak && !userStarted && <button onClick={continueTimer}>Continue Timer</button>}
    //   </div> */}

    <div className='timer'>
       <ReactHowler
        src='/click.mp3'
        playing={playSound}
        onEnd={() => setPlaySound(false)}
      />
      {!userStarted ? (
        <h2 className='timer-message'>{isBreak ? 'Time for a break ! 5 mins' : 'Time to work for 25 mins !'}</h2>
      ) : (
        <p className='time'>
                                                                   {/* // 🤔🤔🤔🤔🤔why 10? 　　🌸🌸🌸🌸🌸This is a way to pad single digit seconds with a leading zero. */}
          Time Remaining: {minutes}:{seconds < 10 ? '0' : ''}{seconds}
        </p>
      )}

      <div className="timer-buttons">
          <Button variant="contained" className='start' onClick={startTimer}>Start </Button>
          <Button variant="outlined" className='stop' onClick={stopTimer}>Stop </Button>
          <Button variant="outlined" className='continue' onClick={continueTimer}>Continue</Button>
      </div>




    </div>
  );
}

export default Timer;

// import React, { useState, useEffect } from 'react';

// interface TimerProps {
//   initialTime: number;
//   onTimeEnd: () => void;
// }

// const Timer: React.FC<TimerProps> = ({ initialTime, onTimeEnd }) => {
//   const [timeRemaining, setTimeRemaining] = useState<number>(initialTime);
//   const [isRunning, setIsRunning] = useState<boolean>(false);

//   useEffect(() => {
//     let intervalId: number;

//     if (isRunning) {
//       intervalId = setInterval(() => {
//         setTimeRemaining(time => time > 0 ? time - 1000 : 0);
//       }, 1000);
//     }

//     return () => clearInterval(intervalId);
//   }, [isRunning]);

//   useEffect(() => {
//     if (timeRemaining === 0) {
//       setIsRunning(false);
//       onTimeEnd();
//     }
//   }, [timeRemaining, onTimeEnd]);

//   const startTimer = () => {
//     setTimeRemaining(initialTime);
//     setIsRunning(true);
//   }

//   const resetTimer = () => {
//     setTimeRemaining(initialTime);
//     setIsRunning(false);
//   }

//   const minutes = Math.floor(timeRemaining / (60 * 1000));
//   const seconds = Math.floor((timeRemaining % (60 * 1000)) / 1000);

//   return (
//     <div>
//       <p>Time Remaining: {minutes}:{seconds < 10 ? '0' : ''}{seconds}</p>
//       <button onClick={startTimer}>Start Timer</button>
//       <button onClick={resetTimer}>Reset Timer</button>
//     </div>
//   );
// }

// export default Timer;
