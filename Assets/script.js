const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0
let questionCounter = 0;
let availableQuestions = []

let questions = [
    {
        question: "Who wore #13 during the 2021-2022 NHL season?",
        choice1: "Nico Hischier",
        choice2: "Jack Hughes",
        choice3: "Dougie Hamilton",
        choice4: "Damon Severson",
        answer: 1
    },
    {
        question: "What were the New Jersey Devils originally called?",
        choice1: "Ice Demons",
        choice2: "Rockies",
        choice3: "Comets",
        choice4: "Scouts",
        answer: 4
    },
    {
        question: "What was the first jersey number retired by the New Jersey Devils?",
        choice1: "3",
        choice2: "27",
        choice3: "4",
        choice4: "26",
        answer: 3
    },
    {
        question: "Which goaltender is the Devils' career leader in wins?",
        choice1: "Cory Schneider",
        choice2: "Martin Brodeur",
        choice3: "Glenn Resch",
        choice4: "Chris Terreri",
        answer: 2
    },
    {
        question: "Who did the Devils defeat to win their first Stanley Cup championship?",
        choice1: "Colorado Avalanche",
        choice2: "Detroit Red Wings",
        choice3: "Anaheim Ducks",
        choice4: "Dallas Stars",
        answer: 2
    },
]

// Constants
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 5;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    console.log(availableQuestions);
    getNewQuestion();
};

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        document.getElementById("score").innerText = "Final Score: " + score;
        return window.location.assign("done.html")
    };
    questionCounter++;
    document.getElementById("question-counter").innerText = "Question: " + questionCounter + "/" + MAX_QUESTIONS;
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];
    });

    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
        selectedChoice.parentElement.classList.add(classToApply);

        if (classToApply === "correct") {
            // Increase score if answer is CORRECT //
            score += CORRECT_BONUS;
        } else {
            // Remove 10 seconds from timer if answer is INCORRECT //
            counter -= 10;
        }

        // DISPLAY SCORE //
        document.getElementById("score").innerText = "Score: " + score;

        // DELAY NEXT QUESTION //
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
});

startGame();

