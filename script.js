const questions = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Lisbon"],
        answer: "Paris"
    },
    {
        question: "Who wrote 'To Kill a Mockingbird'?",
        options: ["Harper Lee", "George Orwell", "Mark Twain", "Jane Austen"],
        answer: "Harper Lee"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Saturn"],
        answer: "Mars"
    },
    {
        question: "What is the largest ocean on Earth?",
        options: ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean", "Arctic Ocean"],
        answer: "Pacific Ocean"
    },
    {
        question: "What is the square root of 64?",
        options: ["6", "7", "8", "9"],
        answer: "8"
    }
];

let currentQuestionIndex = 0;  //question count 
let score = 0;    // score count 
let timeLeft = 190;  // for changing the timer count
let timerInterval;

const questionElement = document.getElementById('question');
const optionsContainer = document.getElementById('options');
const submitButton = document.getElementById('submit-btn');
const feedbackElement = document.getElementById('feedback');
const scoreElement = document.getElementById('score');
const timerElement = document.getElementById('timer');

function startQuiz() {
    displayQuestion();
    startTimer();
}

function displayQuestion() {
    // Clear previous options
    optionsContainer.innerHTML = '';
    feedbackElement.textContent = '';

    // Display current question
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;

    // Display options
    currentQuestion.options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('option-btn');
        button.addEventListener('click', () => selectOption(option));
        optionsContainer.appendChild(button);
    });
}

let selectedOption = null;

function selectOption(option) {
    selectedOption = option;
    const buttons = document.querySelectorAll('.option-btn');
    buttons.forEach(btn => {
        btn.style.backgroundColor = btn.textContent === option ? '#007bff' : '#6c757d';
    });
}

submitButton.addEventListener('click', submitAnswer);

function submitAnswer() {
    if (!selectedOption) {
        feedbackElement.textContent = "Please select an answer!";
        feedbackElement.style.color = 'red';
        return;
    }

    const correctAnswer = questions[currentQuestionIndex].answer;
    if (selectedOption === correctAnswer) {
        score++;
        feedbackElement.textContent = "Correct!";
        feedbackElement.style.color = 'green';
    } else {
        feedbackElement.textContent = "Incorrect!";
        feedbackElement.style.color = 'red';
    }

    scoreElement.textContent = `Score: ${score}`;

    // Move to the next question after a short delay
    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            selectedOption = null;
            displayQuestion();
        } else {
            endQuiz();
        }
    }, 1000);
}

function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        timerElement.textContent = `Time Left: ${timeLeft}s`;
        if (timeLeft === 0) {
            endQuiz();
        }
    }, 1000);
}

function endQuiz() {
    clearInterval(timerInterval);
    questionElement.textContent = "Quiz Over!";
    optionsContainer.innerHTML = '';
    submitButton.style.display = 'none';
    feedbackElement.textContent = `Final Score: ${score}/${questions.length}`;
    feedbackElement.style.color = 'blue';
}

// Start the quiz when the page loads
window.onload = startQuiz;
