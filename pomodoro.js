let countdown = 0;
let sec = 1500;
let focusTime = 25;
let breakTime = 5;
let lbkTime = 30;
let isBreak = true;
let isLbk = true;
let isPaused = true;
let step = 5;

const startBtn = document.querySelector("#start-btn");
const focusMin = document.querySelector("#focus-min");
const breakMin = document.querySelector("#break-min");
const lbkMin = document.querySelector("#lbk-min");
const resetBtn = document.querySelector("#reset");
const state = document.querySelector("#state");
const pmdtime = document.querySelector(".pmdtime");

startBtn.addEventListener('click', () => {
  clearInterval(countdown);
  isPaused = !isPaused;
  if (!isPaused) {
    countdown = setInterval(timer, 1000);
  }
})

resetBtn.addEventListener('click', () => {
  clearInterval(countdown);
  sec = focusTime * 60;
  countdown = 0;
  isPaused = true;
  isBreak = true;
  isLbk = true;
})

function timer() {
  sec --;
  if (sec < 0) {
    clearInterval(countdown);
    sec = (isBreak ? breakTime : focusTime) * 60;
    isBreak = !isBreak;
    countdown = setInterval(timer, 1000);
  }
}

function countdownDisplay() {
  let minutes = Math.floor(sec / 60);
  let remainderSec = sec % 60;
  pmdtime.textContent = `${minutes}:${remainderSec < 10 ? '0' : ''}${remainderSec}`;
}

function buttonDisplay() {
  if (isPaused && countdown === 0) {
    startBtn.textContent = "Start";
  } else if (isPaused && countdown !== 0) {
    startBtn.textContent = "Continue"; 
  } else {
    startBtn.textContent = "Pause";
  }
}

function countdownDisplay() {
  let minutes = Math.floor(sec / 60);
  let remainderSec = sec % 60;
  pmdtime.textContent = `${minutes}:${remainderSec < 10 ? '0' : ''}${remainderSec}`;
}

let stepFunctions =
    {"#focus-add": function () { focusTime = Math.min(focusTime + step, 60)},
     "#focus-sub": function () { focusTime = Math.max(focusTime - step, 5)},
     "#break-add": function () { breakTime = Math.min(breakTime + step, 60)},
     "#break-sub": function () { breakTime = Math.max(breakTime - step, 5)},
     "#lbk-add": function () { lbkTime = Math.min(lbkTime + step, 60)},
     "#lbk-sub": function () { lbkTime = Math.max(lbkTime - step, 5)}};

for (var key in stepFunctions) {
    if (stepFunctions.hasOwnProperty(key)) {
      document.querySelector(key).onclick = stepFunctions[key];
    }
}

function updateHTML() {
  countdownDisplay();
  buttonDisplay();
  isBreak? state.textContent = "Focus Time !" : state.textContent = "Break Time :)";
  focusMin.textContent = focusTime;
  breakMin.textContent = breakTime;
  lbkMin.textContent = lbkTime; 
}

window.setInterval(updateHTML, 100);
document.onclick = updateHTML;