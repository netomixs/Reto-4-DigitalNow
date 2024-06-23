function getNextNewYear() {
  const now = new Date();
  const nextYear = now.getFullYear() + 1;
  return new Date(`January 1, ${nextYear} 00:00:00`);
}
function updateCountdown() {
  const now = new Date();
  const newYear = getNextNewYear();
  const timeDifference = newYear - now;
   
    
  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

  document.getElementById("dias").textContent = days;
  document.getElementById("horas").textContent = hours;
  document.getElementById("minutos").textContent = minutes;
  document.getElementById("segundos").textContent = seconds;
}
setInterval(updateCountdown, 500);
updateCountdown();
 
