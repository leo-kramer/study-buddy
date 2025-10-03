const playBtn = document.querySelector<HTMLDivElement>(".play");
const stopBtn = document.querySelector<HTMLDivElement>(".stop");
const minutesInput = document.querySelector<HTMLInputElement>(".minutes");
const secondsInput = document.querySelector<HTMLInputElement>(".seconds");
const playSpan = document.querySelector<HTMLSpanElement>(".play span");

let timerOn = false;
let timer: number;
let initialMinutes: string;
let initialSeconds: string;

stopBtn?.addEventListener('click', () => {
  if(!minutesInput || !secondsInput) return;
  if(!initialMinutes || !initialSeconds) return;

  minutesInput.value = initialMinutes;
  secondsInput.value = initialSeconds;

  minutesInput.disabled = false;
  secondsInput.disabled = false;
})

playBtn?.addEventListener('click', () => {
  if(timerOn) {
    if (playSpan) {
      playSpan.innerText = "play_arrow";
    }
    timerOn = false;
    clearInterval(timer);
    return;
  }

  if (minutesInput && secondsInput) {
    initialMinutes = minutesInput.value;
    initialSeconds = secondsInput.value;

    minutesInput.disabled = true;
    secondsInput.disabled = true;
  }
  
  if (playSpan) {
    playSpan.innerText = "pause";
  }
  countDown();
})

const countDown = () => {
  if (!minutesInput || !secondsInput) return;

  let minutesRemaining = parseInt(minutesInput.value);
  let secondsRemaining = parseInt(secondsInput.value);

  timerOn = true;
  timer = window.setInterval(() => {
    secondsInput.value = String(secondsRemaining).padStart(2, "0");
    minutesInput.value = String(minutesRemaining).padStart(2, "0");
    secondsRemaining--

    if (secondsRemaining < 0) {
      secondsRemaining = 59;

      minutesRemaining--

      if(minutesRemaining < 0) {
        timerOn = false;
        clearInterval(timer)
        minutesInput.value = "25";
      }
    }
  }, 1000)
}
