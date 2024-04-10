import { useState } from "react";

const Timer = () => {

  const [inputElementDays, setDays] = useState();
  const [inputElementH, setHours] = useState();
  const [inputElementMin, setMin] = useState();
  const [inputElementSec, setSec] = useState();
  const [userInputElement, setInput] = useState(0);
  const [intervalId, setIntervalId] = useState(null);

  const inputFieldTime = () => {

    const daysInSeconds = (inputElementDays * 86400) || 0;
    const hoursInSeconds = (inputElementH * 3600) || 0;
    const minutesInSeconds = (inputElementMin * 60) || 0;
    const seconds = (inputElementSec * 1) || 0;

    setInput(daysInSeconds + hoursInSeconds + minutesInSeconds + seconds);
  };

  const checkIntervals = () => {
    inputFieldTime();
    const funcInterval = () => {
      setInput(time => {
        if (time <= 0) {
          clearInterval(intervalId);
          return 0;
        }
        return time - 1;
      });
    };
    const id = setInterval(funcInterval, 1000);
    setIntervalId(id);
  };

  const formatedTime = (seconds) => {
    let days = Math.floor(seconds / 86400);
    let hours = Math.floor((seconds % 86400) / 3600);
    let min = Math.floor((seconds % 3600) / 60);
    let sec = seconds % 60;
    if (days === 0 && hours !== 0) {
      return hours + "hours. " + min + "min. " + sec + "sec.";
    }
    if (days === 0 && hours === 0 && min !== 0) {
      return min + "min. " + sec + "sec.";
    }
    if (days === 0 && hours === 0 && min === 0 && sec !== 0) {
      return sec + "sec.";
    }
    return days + "days. " + hours + "hours. " + min + "min. " + sec + "sec.";
  };

  return (
    <>
    <main className="main-container">
        <div className="main-timer">
            <h1>Timer</h1>

            <div className="in_out">
                <input type="text" id="inputDays" onChange={(evt) => {setDays(evt.target.value); inputFieldTime();}} placeholder="Set amount of time in days"></input>
            </div>

            <div className="in_out">
                <input type="text" id="inputH" onChange={(evt) => {setHours(evt.target.value); inputFieldTime();}} placeholder="Set amount of time in hours"></input>
                <input type="text" id="inputMin" onChange={(evt) => {setMin(evt.target.value); inputFieldTime();}} placeholder="Set amount of time in minutes"></input>
                <input type="text" id="inputSec" onChange={(evt) => {setSec(evt.target.value); inputFieldTime();}} placeholder="Set amount of time in seconds"></input>
            </div>

            <div className="in_out">
                <div className="output" id="timer">
                  {formatedTime(userInputElement)}
                </div>
            </div>

            <div className="button" id="btn">
                <button className="button-timer" onClick={checkIntervals}>Start</button>
            </div>
        </div>
    </main>
    </>
  );
};

export default Timer;
