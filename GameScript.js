const holes = document.querySelectorAll('.hole');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const startButton = document.getElementById('start-btn');

let score = 0;
let currentHole = null;
let countdown;
let gameActive = false;

const issues = ['🛑', '🔫', '⚠️', '📉', '🌪️', '💣'];
const goodItems = ['💡', '📈', '🌱', '📲', '🤝']; 

function randomHole() {
  return holes[Math.floor(Math.random() * holes.length)];
}

function randomItem() {
  return Math.random() < 0.7 ? issues[Math.floor(Math.random() * issues.length)]
                             : goodItems[Math.floor(Math.random() * goodItems.length)];
}

function showIssue() {
  if (!gameActive) return;

  if (currentHole) {
    currentHole.textContent = '';
    currentHole.classList.add('hidden');
  }

  const hole = randomHole();
  const item = randomItem();
  hole.textContent = item;
  hole.classList.remove('hidden');
  currentHole = hole;

  hole.onclick = () => {
    if (!gameActive) return;
    if (issues.includes(hole.textContent)) {
      score++;
      scoreDisplay.textContent = score;
    } else {
      score--; 
      scoreDisplay.textContent = score;
    }
    hole.textContent = '';
    hole.classList.add('hidden');
  };

  setTimeout(showIssue, 800);
}

function startGame() {
  score = 0;
  scoreDisplay.textContent = score;
  timerDisplay.textContent = 30;
  gameActive = true;

  showIssue();

  let timeLeft = 30;
  countdown = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = timeLeft;
    if (timeLeft === 0) {
      clearInterval(countdown);
      gameActive = false;
      if (currentHole) {
        currentHole.textContent = '';
        currentHole.classList.add('hidden');
      }
    alert("Time's up! Final Score: " + score);
      
    }
  }, 1000);
}

startButton.addEventListener('click', startGame);