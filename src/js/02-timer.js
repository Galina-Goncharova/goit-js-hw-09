import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
require('flatpickr/dist/themes/dark.css');
import Notiflix from 'notiflix';

const startBtn = document.querySelector('button[data-start]');
const daysEll = document.querySelector('span[data-days]');
const hoursEll = document.querySelector('span[data-hours]');
const minutesEll = document.querySelector('span[data-minutes]');
const secondsEll = document.querySelector('span[data-seconds]');
const timerRef = document.querySelector(".timer")

let selectedDate = 0;
startBtn.disabled = true;



const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] < options.defaultDate) {
            startBtn.disabled = true;
            return Notiflix.Notify.warning('Please choose a date in the future');
        };
        startBtn.disabled = false;
        selectedDate = selectedDates[0].getTime();
  },
};
flatpickr('#datetime-picker', options);
startBtn.addEventListener('click', startTimer);

function startTimer() {
    setInterval(() => {
    const currentTime = Date.now();
    const deltaTime = selectedDate - currentTime;
    const time = convertMs(deltaTime);
    updateClockface(time);
  }, 1000);
}

function pad(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  if (ms <= 0) {
    clearInterval(intervalId);
    ms = 0;
  }

  const days = pad(Math.floor(ms / day));
  const hours = pad(Math.floor((ms % day) / hour));
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function updateClockface({ days, hours, minutes, seconds }) {
  daysEll.textContent = days;
  hoursEll.textContent = hours;
  minutesEll.textContent = minutes;
  secondsEll.textContent = seconds;
}

timerRef.style = 'font-size: 40px; color: red; align-items: center;';
