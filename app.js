// Add this at the beginning of your app.js file
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('sw.js')
      .then(registration => {
        console.log('Service Worker registered:', registration);
      })
      .catch(error => {
        console.error('Service Worker registration failed:', error);
      });
  });
}
const startBtn = document.getElementById('startBtn');
const timerDisplay = document.getElementById('timerDisplay');
const durationInput = document.getElementById('duration');

startBtn.addEventListener('click', () => {
  const duration = parseInt(durationInput.value, 10);
  if (duration && duration > 0) {
    startTimer(duration);
  }
});

function startTimer(duration) {
  const endTime = Date.now() + duration * 1000;
  updateTimerDisplay(duration);

  const timerInterval = setInterval(() => {
    const remainingTime = Math.round((endTime - Date.now()) / 1000);
    if (remainingTime <= 0) {
      clearInterval(timerInterval);
      updateTimerDisplay(0);
    } else {
      updateTimerDisplay(remainingTime);
    }
  }, 1000);
}

function updateTimerDisplay(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(
    remainingSeconds
  ).padStart(2, '0')}`;
}
