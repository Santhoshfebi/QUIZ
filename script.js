// Array of question objects
const questions = [
    {
        question: "What is the capital of France?",
        answers: ["Berlin", "Madrid", "Paris", "Lisbon"],
        correct: "Paris"
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: ["Earth", "Mars", "Jupiter", "Saturn"],
        correct: "Mars"
    },
    {
        question: "Who wrote 'To Kill a Mockingbird'?",
        answers: ["Harper Lee", "Mark Twain", "Ernest Hemingway", "Jane Austen"],
        correct: "Harper Lee"
    },
    {
        question: "What is the largest ocean on Earth?",
        answers: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        correct: "Pacific Ocean"
    },
    {
        question: "What is the hardest natural substance on Earth?",
        answers: ["Gold", "Iron", "Diamond", "Platinum"],
        correct: "Diamond"
    }
];

let currentQuestionIndex = 0;
let score = 0;

// Elements
const questionText = document.getElementById('question-text');
const answersContainer = document.getElementById('answers-container');
const submitBtn = document.getElementById('submit-btn');
const feedback = document.getElementById('feedback');
const scoreDisplay = document.getElementById('score');

// Load question
function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionText.textContent = currentQuestion.question;
    
    answersContainer.innerHTML = '';
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.textContent = answer;
        button.addEventListener('click', () => selectAnswer(answer));
        answersContainer.appendChild(button);
    });
}

// Handle answer selection
function selectAnswer(selectedAnswer) {
    const correctAnswer = questions[currentQuestionIndex].correct;
    if (selectedAnswer === correctAnswer) {
        feedback.textContent = 'Correct!';
        score++;
    } else {
        feedback.textContent = 'Incorrect!';
    }
    scoreDisplay.textContent = `Score: ${score}`;
}

// Handle submit
function handleSubmit() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        feedback.textContent = 'Quiz completed!';
        submitBtn.disabled = true;
    }
}

// Initialize
loadQuestion();
submitBtn.addEventListener('click', handleSubmit);
