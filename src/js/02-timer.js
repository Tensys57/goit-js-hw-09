// Напиши скрипт таймера, який здійснює зворотний відлік до певної дати.
// Вибір дати
// Метод onClose() з об'єкта параметрів викликається щоразу під час закриття елемента інтерфейсу, який створює flatpickr. Саме у ньому варто обробляти дату, обрану користувачем. Параметр selectedDates - це масив обраних дат, тому ми беремо перший елемент.

// Якщо користувач вибрав дату в минулому, покажи window.alert() з текстом "Please choose a date in the future".
// Якщо користувач вибрав валідну дату (в майбутньому), кнопка «Start» стає активною.
// Кнопка «Start» повинна бути неактивною доти, доки користувач не вибрав дату в майбутньому.
// Натисканням на кнопку «Start» починається відлік часу до обраної дати з моменту натискання.

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
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
