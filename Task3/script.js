let quizData = [
  {
    question: "What does HTML stand for?",
    options: ["Hyper Text Markup Language", "High Tech Machine Learning", "Hyper Tool Meta Language", "None of the above"],
    answer: "Hyper Text Markup Language"
  },
  {
    question: "Which language runs in a web browser?",
    options: ["Java", "C", "Python", "JavaScript"],
    answer: "JavaScript"
  },
  {
    question: "What year was JavaScript created?",
    options: ["1995", "2000", "1989", "1997"],
    answer: "1995"
  }
];

let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 30;
let answers = new Array(quizData.length).fill(null);

const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const feedbackEl = document.getElementById('feedback');
const scoreEl = document.getElementById('score');
const timerEl = document.getElementById('timer');
const previousBtn = document.getElementById('previous');
const submitBtn = document.getElementById('submit');
const nextBtn = document.getElementById('next');
const restartBtn = document.getElementById('restart');
const skipBtn = document.getElementById('skip');
const loadingEl = document.getElementById('loading');
const errorEl = document.getElementById('error');

function startTimer() {
  clearInterval(timer);
  timeLeft = 30;
  timerEl.textContent = `Time: ${timeLeft}s`;
  timer = setInterval(() => {
    timeLeft--;
    timerEl.textContent = `Time: ${timeLeft}s`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      handleTimeout();
    }
  }, 1000);
}

function handleTimeout() {
  answers[currentQuestion] = null;
  feedbackEl.textContent = `Time's up! Correct answer: ${quizData[currentQuestion].answer}`;
  feedbackEl.style.color = '#f00';
  feedbackEl.style.display = 'block';
  optionsEl.querySelectorAll('.option').forEach(opt => {
    if (opt.querySelector('input').value === quizData[currentQuestion].answer) {
      opt.classList.add('correct');
    }
  });
  submitBtn.disabled = true;
  nextBtn.disabled = false;
}

function loadQuestion() {
  clearInterval(timer);
  startTimer();
  const q = quizData[currentQuestion];
  questionEl.textContent = `${currentQuestion + 1}. ${q.question}`;
  optionsEl.innerHTML = '';

  q.options.forEach(option => {
    const div = document.createElement('div');
    div.classList.add('option');
    const input = document.createElement('input');
    input.type = 'radio';
    input.name = 'option';
    input.value = option;
    input.id = option;
    if (answers[currentQuestion] === option) input.checked = true;
    input.addEventListener('change', () => submitBtn.disabled = false);
    const label = document.createElement('label');
    label.htmlFor = option;
    label.textContent = option;
    div.appendChild(input);
    div.appendChild(label);
    optionsEl.appendChild(div);
  });

  feedbackEl.style.display = 'none';
  previousBtn.disabled = currentQuestion === 0;
  nextBtn.disabled = answers[currentQuestion] === null && answers[currentQuestion] !== 'skipped';
  submitBtn.disabled = !document.querySelector('input[name="option"]:checked');
}

submitBtn.addEventListener('click', () => {
  const selected = document.querySelector('input[name="option"]:checked');
  if (!selected) return;
  clearInterval(timer);
  const selectedAnswer = selected.value;
  const correctAnswer = quizData[currentQuestion].answer;
  answers[currentQuestion] = selectedAnswer;

  if (selectedAnswer === correctAnswer) {
    score++;
    scoreEl.textContent = score;
    feedbackEl.textContent = "Correct!";
    feedbackEl.style.color = '#0f0';
  } else {
    feedbackEl.textContent = `Incorrect! Correct: ${correctAnswer}`;
    feedbackEl.style.color = '#f00';
  }

  optionsEl.querySelectorAll('.option').forEach(opt => {
    const val = opt.querySelector('input').value;
    if (val === correctAnswer) opt.classList.add('correct');
    else if (val === selectedAnswer) opt.classList.add('incorrect');
  });

  feedbackEl.style.display = 'block';
  submitBtn.disabled = true;
  nextBtn.disabled = false;
});

nextBtn.addEventListener('click', () => {
  if (currentQuestion < quizData.length - 1) {
    currentQuestion++;
    loadQuestion();
  } else {
    questionEl.textContent = 'Quiz Completed!';
    optionsEl.innerHTML = '';
    timerEl.style.display = 'none';
    feedbackEl.textContent = `Final Score: ${score} out of ${quizData.length}`;
    feedbackEl.style.display = 'block';
    previousBtn.disabled = true;
    submitBtn.disabled = true;
    nextBtn.disabled = true;
    skipBtn.disabled = true;
    restartBtn.style.display = 'block';
  }
});

previousBtn.addEventListener('click', () => {
  if (currentQuestion > 0) {
    currentQuestion--;
    loadQuestion();
  }
});

skipBtn.addEventListener('click', () => {
  clearInterval(timer);
  answers[currentQuestion] = 'skipped';
  feedbackEl.textContent = 'Question skipped!';
  feedbackEl.style.color = '#888';
  feedbackEl.style.display = 'block';
  submitBtn.disabled = true;
  nextBtn.disabled = false;
});

restartBtn.addEventListener('click', () => {
  currentQuestion = 0;
  score = 0;
  scoreEl.textContent = score;
  timerEl.style.display = 'block';
  restartBtn.style.display = 'none';
  skipBtn.disabled = false;
  answers = new Array(quizData.length).fill(null);
  loadQuestion();
});

loadQuestion();
