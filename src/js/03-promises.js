import Notiflix from 'notiflix';
const submitFormRef = document.querySelector('.form');

function submitHandler(event) {
  event.preventDefault();
  const { delay, step, amount } = event.currentTarget.elements;
  const formData = {
    delay: delay.value,
    step: step.value,
    amount: amount.value,
  };
  let currentDelay = Number(formData.delay);
  for (
    let idPromise = 1;
    idPromise <= Number(formData.amount);
    idPromise += 1
  ) {
    createPromise(idPromise, currentDelay)
      .then(object => {
        const { position, delay } = object;
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(object => {
        const { position, delay } = object;
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
    currentDelay += Number(formData.step);
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

submitFormRef.addEventListener('submit', submitHandler);
