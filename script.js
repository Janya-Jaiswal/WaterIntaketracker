const cupsContainer = document.getElementById('cupsContainer');
const progressText = document.getElementById('progressText');
const progressBar = document.getElementById('progressBar');
const totalCups = 8;
let filled = parseInt(localStorage.getItem('filledCups')) || 0;
let reminderInterval = null;
let unfilling = null;

// Create cups
for (let i = 0; i < totalCups; i++) {
  const cup = document.createElement('div');
  cup.classList.add('cup');
  cup.textContent = i + 1;
  cup.addEventListener('click', () => toggleCup(i));
  cupsContainer.appendChild(cup);
}

updateUI();

function toggleCup(index) {
  if (filled === index + 1) {
    filled = index;
    unfilling = true;
  } else {
    filled = index + 1;
    unfilling = false;
  }

  localStorage.setItem('filledCups', filled);
  updateUI();
}

function updateUI() {
  const cups = document.querySelectorAll('.cup');
  cups.forEach((cup, i) => {
    cup.classList.toggle('filled', i < filled);
  });

  progressText.textContent = `${filled}/${totalCups} cups filled`;

  const percentage = (filled / totalCups) * 100;
  progressBar.style.width = `${percentage}%`;

  updateMsg();

  console.log(`Filled: ${filled}, Progress: ${percentage}%`);
}

function updateMsg() {
  const fmsg = document.querySelector(".msg");
  if (!fmsg) return;

  if (unfilling === true) {
    fmsg.innerText = "Oops! Changed your mind? Don’t forget to stay hydrated! 💦";
  } else if (filled === 8) {
    fmsg.innerText = "🎉 You did it! 8 cups down – your body thanks you! 💧 Stay refreshed & proud!";
  } else if (unfilling === false) {
    fmsg.innerText = "Nice! You're fueling your body right. Keep going! 🚰";
  } else {
    fmsg.innerText = "Stay hydrated! 💧";
  }
}

function resetTracker() {
  filled = 0;
  localStorage.setItem('filledCups', filled);
  updateUI();
}

function toggleReminder() {
  if (reminderInterval) {
    clearInterval(reminderInterval);
    reminderInterval = null;
    alert("🔕 Reminder turned OFF");
  } else {
    reminderInterval = setInterval(() => {
      if (Notification.permission === "granted") {
        new Notification("💧 Time to drink water!");
      } else {
        alert("💧 Time to drink water!");
      }
    }, 60 * 60 * 1000);
    alert("⏰ Reminder set for every hour!");
  }
}

if ("Notification" in window) {
  Notification.requestPermission();
}

// Reset tracker at midnight
const now = new Date();
const msUntilMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1).getTime() - now.getTime();
setTimeout(() => {
  resetTracker();
}, msUntilMidnight);
