class Timer {
  constructor() {
    // Global variables
    this.hoursEl = document.getElementById('hours');
    this.minutesEl = document.getElementById('minutes');
    this.secondsEl = document.getElementById('seconds');
    this.millisecondsEl = document.getElementById('milliseconds');

    this.startButton = document.getElementById('startBtn');
    this.stopButton = document.getElementById('stopBtn');
    this.pauseButton = document.getElementById('pauseBtn');
    this.resetButton = document.getElementById('resetBtn');

    this.lapList = document.getElementById('details-list');

    this.hours = 0;
    this.minutes = 0;
    this.seconds = 0;
    this.milliseconds = 0;
    this.interval = null;

    // Event listeners
    this.startButton.addEventListener('click', this.startTimer.bind(this));
    this.stopButton.addEventListener('click', this.stopTimer.bind(this));
    this.pauseButton.addEventListener('click', this.pauseTimer.bind(this));
    this.resetButton.addEventListener('click', this.resetTimer.bind(this));
  }

  // Update the timer
  startTimer() {
    this.interval = setInterval(this.updateTimer.bind(this), 10);
    this.startButton.disabled = true;
  }

  stopTimer() {
    clearInterval(this.interval);
    this.addToLapList();
    this.resetTimerData();
    this.startButton.disabled = false;
  }

  pauseTimer() {
    clearInterval(this.interval);
    this.startButton.disabled = false;
  }

  resetTimer() {
    clearInterval(this.interval);
    this.resetTimerData();
    this.startButton.disabled = false;
  }

  updateTimer() {
    this.milliseconds += 10;

    if (this.milliseconds === 1000) {
      this.milliseconds = 0;
      this.seconds++;

      if (this.seconds === 60) {
        this.seconds = 0;
        this.minutes++;

        if (this.minutes === 60) {
          this.minutes = 0;
          this.hours++;
        }
      }
    }

    this.displayTimer();
  }

  displayTimer() {
    this.millisecondsEl.textContent = this.padTime(this.milliseconds);
    this.secondsEl.textContent = this.padTime(this.seconds);
    this.minutesEl.textContent = this.padTime(this.minutes);
    this.hoursEl.textContent = this.padTime(this.hours);
  }

  padTime(time) {
    return time.toString().padStart(2, '0');
  }

  resetTimerData() {
    this.hours = 0;
    this.minutes = 0;
    this.seconds = 0;
    this.milliseconds = 0;
    this.displayTimer();
  }

  addToLapList() {
    const lapTime = `${this.padTime(this.hours)}:${this.padTime(
      this.minutes
    )}:${this.padTime(this.seconds)}:${this.padTime(this.milliseconds)}`;

    const listItem = document.createElement('li');
    listItem.innerHTML = `<span>Lap ${
      this.lapList.childElementCount + 1
    }: </span>${lapTime}`;
    this.lapList.appendChild(listItem);
  }
}

// Instantiate the Timer class
const timer = new Timer();
