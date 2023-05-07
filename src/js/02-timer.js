import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  pickerInput: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  daysValue: document.querySelector('[data-days]'),
  hoursValue: document.querySelector('[data-hours]'),
  minutesValue: document.querySelector('[data-minutes]'),
  secondsValue: document.querySelector('[data-seconds]'),
};

refs.startBtn.setAttribute('disabled', 'true');
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const today = new Date();
    if (selectedDate < today) {
      Notiflix.Notify.failure('Please choose a date in the future');
    }
    refs.startBtn.removeAttribute('disabled');

    refs.startBtn.addEventListener('click', () => {
      const timerId = setInterval(() => {
        const differInterval = selectedDate - new Date();
        const resultDiffer = convertMs(differInterval);
        if (differInterval >= 0) {
          refs.daysValue.textContent = addLeadingZero(resultDiffer.days);
          refs.hoursValue.textContent = addLeadingZero(resultDiffer.hours);
          refs.minutesValue.textContent = addLeadingZero(resultDiffer.minutes);
          refs.secondsValue.textContent = addLeadingZero(resultDiffer.seconds);
        } else {
          clearInterval(timerId);
          return;
        }
      }, 1000);
    });
  },
};
flatpickr(refs.pickerInput, options);
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
