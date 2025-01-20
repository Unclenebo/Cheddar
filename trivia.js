const urlParams = new URLSearchParams(window.location.search);
category = urlParams.get('category');
let pagination = 10;



function naviage(url) {
    window.location.href = url;
}

let data = []


async function fetchData() {
    return fetch(`http://localhost:8000/api/questions/${category}/${pagination}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

fetchData().then(data => {
    
const questionDisplay = document.getElementById('question');
const answerDisplay = document.getElementById('answer-cont');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');

let currentQuestionIndex = 0;
let score = 0;

const startTrivia = () => {
    currentQuestionIndex = JSON.parse(localStorage.getItem('currentQuestionIndex')) || 0;
    score = 0;

    startTimer()
    displayQuestion();
}

const displayQuestion = () => {
    let currentQuestion = data[currentQuestionIndex];
    let options = currentQuestion.options
    let questionNumber = currentQuestionIndex + 1;
    questionDisplay.innerHTML = `${currentQuestion.question}`;
    
    answerDisplay.innerHTML = "";    
    
    options.map((option)=>{
        answerDisplay.innerHTML  += `<button class="answer" id="answerButton">${option}</button> `
    })
    
    let answerButtons = document.querySelectorAll("#answerButton")
    answerButtons.forEach((button, index)=>{
        let questionId = currentQuestion.id
        // show selected options 
        const answers = JSON.parse(localStorage.getItem("answers")) || [];
        const aIndex = answers.findIndex(item => item.questionId === questionId);
        if (aIndex !== -1) {
            if (button.textContent == answers[aIndex].selectedOption) {
                button.classList.add('selected')
            }
        }
        // select button when clicked
        button.onclick = ()=>{
            answerButtons.forEach((button)=>{
                button.classList.remove('selected')
            })
            button.classList.add('selected')

            let selectedOption = button.textContent
            
            const newAnswer = { questionId: questionId, selectedOption: selectedOption };

            let existingData = JSON.parse(localStorage.getItem("answers")) || [];
            const index = existingData.findIndex(item => item.questionId === newAnswer.questionId);
            
            if (index === -1) {
                existingData.push(newAnswer);
            } else {
                existingData[index].selectedOption = newAnswer.selectedOption;
            }
            
            localStorage.setItem("answers", JSON.stringify(existingData));
        }
    })


    
    prevButton.onclick = () => {
        currentQuestionIndex--
        if (currentQuestionIndex<=0) {
            currentQuestionIndex=0
        }
        localStorage.setItem('currentQuestionIndex', JSON.stringify(currentQuestionIndex))
        displayQuestion()
    }

    if (currentQuestionIndex==data.length-1) {
        nextButton.innerHTML = "finish"
    }else{
        nextButton.innerHTML = "<img src='./arrow_forward.png'>"
    }
    
    nextButton.onclick = () => {
        if (nextButton.textContent != "finish") {
                currentQuestionIndex++;
                if (currentQuestionIndex>=data.length-1) {
                    currentQuestionIndex=data.length-1
                }
                localStorage.setItem('currentQuestionIndex', JSON.stringify(currentQuestionIndex))
        
                displayQuestion()    
        }else{
            if (confirm("Are you sure you want to finish the game?")) {
                endTrivia()
            }
        }
    }
}

// end trivia/score logic
const endTrivia = () => {
    const answers = JSON.parse(localStorage.getItem("answers")) || [];  
    answers.forEach(answer => {
        const answeredQuestions = data.find(item => item.id === answer.questionId)
        if (answeredQuestions && answer.selectedOption == answeredQuestions.correct_answer) {
            score++
            console.log(answer.selectedOption + ' - Correct');
        }else{
            console.log(answer.selectedOption + ' - wrong');
            
        } 
    });
    resetTimer()
    localStorage.clear()
    document.getElementsByTagName('body')[0].innerHTML = scorePage(score)


    console.log("Total qusetions = " + data.length);
    console.log("Qusetions answered = " + answers.length);
    console.log("Score = " + score + "/" + data.length);
    
}


let countdownTime = JSON.parse(localStorage.getItem('countdownTime')) || 300;    
let countdownInterval;

const countdownDisplay = document.getElementById('countdown-timer');

function formatTime(seconds) {
    const minutes = String(Math.floor(seconds / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    return `${minutes}:${secs}`;
}

countdownDisplay.textContent = formatTime(countdownTime);

const startTimer = () => {
    if (!countdownInterval) {
        countdownInterval = setInterval(() => {
            if (countdownTime > 0) {
                countdownTime--;
                localStorage.setItem('countdownTime', JSON.stringify(countdownTime))
                countdownDisplay.textContent = formatTime(countdownTime);
                if (countdownTime<=59) {
                    countdownDisplay.style.animation = "pulse 1s infinite";
                    countdownDisplay.style.color = "#ff0000"
                }
            } else {
                clearInterval(countdownInterval);
                countdownInterval = null;
                alert("Time's up!");
                endTrivia()
            }
        }, 1000);
    }
}

const resetTimer = () => {
    clearInterval(countdownInterval);
    countdownInterval = null;
    countdownTime = 300; 
    localStorage.setItem('countdownTime', JSON.stringify(countdownTime))
    countdownDisplay.textContent = formatTime(countdownTime);
}

const stopTimer = () => {
    clearInterval(countdownInterval);
    countdownInterval = null;
}


startTrivia()
});






