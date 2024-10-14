let clockInterval;

startClock();


function startClock() {

  const now = new Date();
  document.getElementById('clock').textContent = now.toLocaleTimeString();


  clockInterval = setInterval(() => {
    const now = new Date();
    document.getElementById('clock').textContent = now.toLocaleTimeString();
  }, 1000);
}


function stopClock() {
  clearInterval(clockInterval);
}


document.getElementById('startBtn').addEventListener('click', startClock);
document.getElementById('stopBtn').addEventListener('click', stopClock);


