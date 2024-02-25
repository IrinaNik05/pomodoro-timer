const start = document.querySelector('#start');
const timer = document.querySelector('#pomodoro-time');
const btnBreak = document.querySelector('#break');
const btnPomodoro = document.querySelector('#pomodoro');
const btnReset = document.querySelector('#reset');

let timerId;
let minutes = 24;
let seconds = 59;
let isStarted = false;
let timerMode = "pomodoro";

function startTimer() {
    if (isStarted) {
        stopTimer();
        return;
    }
    timerId = setInterval(function reduceTime() {
        timer.textContent = (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds);
        returnOriginalValue();
    }, 10);
    start.textContent = "stop";
    isStarted = !isStarted;
};

function stopTimer() {
    isStarted = false;
    start.textContent = "start";
    clearInterval(timerId);
}

function returnOriginalValue() {
    if (seconds <= 0) {
        if (minutes <= 0) {
            resetTimer();
        } else {
            seconds = 60;
            minutes--;
        };
    };
    seconds--;
};

function switchMode() {
    start.textContent = "start";
    stopTimer();
    if (btnPomodoro.classList.contains('active')) {
        btnBreak.classList.add('active');
        btnPomodoro.classList.remove('active');
        timerMode = "break";
        minutes = 4;
        seconds = 59;
        timer.textContent = '05' + ':' + '00';
    } else {
        btnPomodoro.classList.add('active');
        btnBreak.classList.remove('active');
        timerMode = "pomodoro";
        timer.textContent = '25' + ':' + '00';
        minutes = 24;
        seconds = 59;
    }
};

function resetTimer() {
    if (timerMode === "pomodoro") {
        timer.textContent = "25:00";
        minutes = 24;
        seconds = 59;
    } else {
        timer.textContent = "05:00";
        minutes = 4;
        seconds = 59;
    }
    stopTimer();
}

start.addEventListener('click', startTimer);
btnBreak.addEventListener('click', switchMode);
btnPomodoro.addEventListener('click', switchMode);
btnReset.addEventListener('click', resetTimer);