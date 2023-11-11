//Global variables
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const millisecondsEl = document.getElementById('milliseconds');

const startButton = document.getElementById('startBtn');
const stopButton = document.getElementById('stopBtn');
const pauseButton = document.getElementById('pauseBtn');
const resetButton = document.getElementById('resetBtn');

const lapList = document.getElementById('details-list');

let hours = 0;
let minutes = 0;
let seconds = 0;
let milliseconds = 0;
let interval;

// Event listeners
startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);

// Update the timer
function startTimer() {
  interval = setInterval(updateTimer, 10);
  startButton.disabled = true;
}

function stopTimer() {
  clearInterval(interval);
  addToLapList();
  resetTimerData();
  startButton.disabled = false;
}

function pauseTimer() {
  clearInterval(interval);
  startButton.disabled = false;
}

function resetTimer() {
  clearInterval(interval);
  resetTimerData();
  startButton.disabled = false;
}

function updateTimer() {
  milliseconds += 10;

  if (milliseconds == 1000) {
    milliseconds = 0;
    seconds++;

    if (seconds == 60) {
      seconds = 0;
      minutes++;

      if (minutes == 60) {
        minutes = 0;
        hours++;
      }
    }
  }

  displayTimer();
}

function displayTimer() {
  millisecondsEl.textContent = padTime(milliseconds);
  secondsEl.textContent = padTime(seconds);
  minutesEl.textContent = padTime(minutes);
  hoursEl.textContent = padTime(hours);
}

function padTime(time) {
  return time.toString().padStart(2, '0');
}

function resetTimerData() {
  hours = 0;
  minutes = 0;
  seconds = 0;
  milliseconds = 0;
  displayTimer();
}

function addToLapList() {
  const lapTime = `${padTime(hours)}:${padTime(minutes)}:${padTime(
    seconds
  )}:${padTime(milliseconds)}`;

  const listItem = document.createElement('li');
  listItem.innerHTML = `<span>Lap ${
    lapList.childElementCount + 1
  }: </span>${lapTime}`;
  lapList.appendChild(listItem);
}
