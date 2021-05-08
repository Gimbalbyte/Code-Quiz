// Variables
let quizBody = document.getElementById("quiz");
let resultsEl = document.getElementById("result");
let finalScoreEl = document.getElementById("finalScore");
let gameoverDiv = document.getElementById("gameover");
let questionsEl = document.getElementById("questions");
let quizTimer = document.getElementById("timer");
let startQuizButton = document.getElementById("startbtn");
let startQuizDiv = document.getElementById("startpage");
let highscoreContainer = document.getElementById("highscoreContainer");
let highscoreDiv = document.getElementById("high-scorePage");
let highscoreInputName = document.getElementById("initials");
let highscoreDisplayName = document.getElementById("highscore-initials");
let endGameBtns = document.getElementById("endGameBtns");
let submitScoreBtn = document.getElementById("submitScore");
let highscoreDisplayScore = document.getElementById("highscore-score");
let buttonA = document.getElementById("a");
let buttonB = document.getElementById("b");
let buttonC = document.getElementById("c");
let buttonD = document.getElementById("d");

// Quiz questions
let quizQuestions = [{
    question: "What does HTML stand for?",
    choiceA: "Hyper Text Markup Language",
    choiceB: "Hyper Transition Makeup Language",
    choiceC: "How To Make Lettuce",
    choiceD: "Hyper Language Markup Text",
    correctAnswer: "a"},
    {
    question: "What is primarily used to add styling to a web page?",
    choiceA: "HTML",
    choiceB: "CSS",
    choiceC: "Python",
    choiceD: "React.js",
    correctAnswer: "b"},
    {
    question: "What does DOM stand for?",
    choiceA: "Document Object Model",
    choiceB: "Display Object Management",
    choiceC: "Digital Ordinance Model",
    choiceD: "Desktop Oriented Mode",
    correctAnswer: "a"},
    {
    question: "What HTML tags are JavaScript code wrapped in?",
    choiceA: "&lt;div&gt;",
    choiceB: "&lt;link&gt;",
    choiceC: "&lt;head&gt;",
    choiceD: "&lt;script&gt;",
    correctAnswer: "d"},
    {
    question: "Where is the correct place to insert a javascript?",
    choiceA: "Head",
    choiceB: "Body",
    choiceC: "Header",
    choiceD: "Head or Body",
    correctAnswer: "d"},  
    {
    question: "Alone the This keyword refers to which object?",
    choiceA: "Recieved Element",
    choiceB: "Owner",
    choiceC: "Global",
    choiceD: "Undefined",
    correctAnswer: "c"},
    {
    question: "What HTML attribute references an external JavaScript file?",
    choiceA: "href",
    choiceB: "src",
    choiceC: "class",
    choiceD: "index",
    correctAnswer: "b"},
        
    
];

// More Variables (global)
let finalQuestionIndex = quizQuestions.length;
let currentQuestionIndex = 0;
let timeLeft = 60;
let timerInterval;
let score = 0;
let correct;

// Used to generate the questions and answers.
function generateQuizQuestion(){
    gameoverDiv.style.display = "none";
    if (currentQuestionIndex === finalQuestionIndex){
        return showScore();
    } 
    let currentQuestion = quizQuestions[currentQuestionIndex];
    questionsEl.innerHTML = "<p>" + currentQuestion.question + "</p>";
    buttonA.innerHTML = currentQuestion.choiceA;
    buttonB.innerHTML = currentQuestion.choiceB;
    buttonC.innerHTML = currentQuestion.choiceC;
    buttonD.innerHTML = currentQuestion.choiceD;
};

// Starts the time, as well as hides the start button, and displays the first quiz question.
function startQuiz(){
    gameoverDiv.style.display = "none";
    startQuizDiv.style.display = "none";
    generateQuizQuestion();

    timerInterval = setInterval(function() {
        timeLeft--;
        quizTimer.textContent = "Time left: " + timeLeft;
    
        if(timeLeft === 0) {
          clearInterval(timerInterval);
          showScore();
        }
      }, 1000);
    quizBody.style.display = "block";
}

// End page that displays score (either after completeing the quiz or the timer runs out)
function showScore(){
    quizBody.style.display = "none"
    gameoverDiv.style.display = "flex";
    clearInterval(timerInterval);
    highscoreInputName.value = "";
    finalScoreEl.innerHTML = "You got " + score + " out of " + quizQuestions.length + " correct!";
}

// Highscore
submitScoreBtn.addEventListener("click", function highscore(){
    
    if(highscoreInputName.value === "") {
        alert("Initials cannot be blank");
        return false;
    }else{
        let savedHighscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
        let currentUser = highscoreInputName.value.trim();
        let currentHighscore = {
            name : currentUser,
            score : score
        };
    
        gameoverDiv.style.display = "none";
        highscoreContainer.style.display = "flex";
        highscoreDiv.style.display = "block";
        endGameBtns.style.display = "flex";
        
        savedHighscores.push(currentHighscore);
        localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));
        generateHighscores();

    }
    
});

// Generates Highscore
function generateHighscores(){
    highscoreDisplayName.innerHTML = "";
    highscoreDisplayScore.innerHTML = "";
    let highscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
    for (i=0; i<highscores.length; i++){
        let newNameSpan = document.createElement("li");
        let newScoreSpan = document.createElement("li");
        newNameSpan.textContent = highscores[i].name;
        newScoreSpan.textContent = highscores[i].score;
        highscoreDisplayName.appendChild(newNameSpan);
        highscoreDisplayScore.appendChild(newScoreSpan);
    }
}

// Displays high score page
function showHighscore(){
    startQuizDiv.style.display = "none"
    gameoverDiv.style.display = "none";
    highscoreContainer.style.display = "flex";
    highscoreDiv.style.display = "block";
    endGameBtns.style.display = "flex";

    generateHighscores();
}

// Clears Highscore
function clearScore(){
    window.localStorage.clear();
    highscoreDisplayName.textContent = "";
    highscoreDisplayScore.textContent = "";
}

// Resets quiz to play again
function replayQuiz(){
    highscoreContainer.style.display = "none";
    gameoverDiv.style.display = "none";
    startQuizDiv.style.display = "flex";
    timeLeft = 76;
    score = 0;
    currentQuestionIndex = 0;
}

// Checks correct answers
function checkAnswer(answer){
    correct = quizQuestions[currentQuestionIndex].correctAnswer;

    if (answer === correct && currentQuestionIndex !== finalQuestionIndex){
        score++;
        alert("Correct");
        currentQuestionIndex++;
        generateQuizQuestion();
    }else if (answer !== correct && currentQuestionIndex !== finalQuestionIndex){
        alert("Incorrect")
        currentQuestionIndex++;
        generateQuizQuestion();
    }else{
        showScore();
    }
}

// Start Quiz
startQuizButton.addEventListener("click",startQuiz);