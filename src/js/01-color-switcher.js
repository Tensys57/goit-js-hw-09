function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
const refs = {
  body: document.body,
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
};
let timerId = 0;
function startHandler() {
  timerId = setInterval(() => {
    refs.body.style.backgroundColor = `${getRandomHexColor()}`;
  }, 1000);
  refs.startBtn.setAttribute('disabled', 'true');
  refs.stopBtn.style.backgroundColor = 'lightyellow';
  refs.startBtn.style.backgroundColor = 'gray';
  // refs.startBtn.removeEventListener('click', startHandler);
  refs.stopBtn.addEventListener('click', stopHandler);
}
function stopHandler() {
  clearInterval(timerId);
  refs.startBtn.removeAttribute('disabled');
  refs.startBtn.style.backgroundColor = 'lightyellow';
  refs.stopBtn.style.backgroundColor = 'gray';
  // refs.stopBtn.removeEventListener('click', stopHandler);
  // refs.startBtn.addEventListener('click', startHandler);
}

refs.startBtn.addEventListener('click', startHandler);
