function naviage(url) {
    window.location.href = url;
}
let started = JSON.parse(sessionStorage.getItem('started'))


const urlParams = new URLSearchParams(window.location.search);
category = urlParams.get('category');
let pagination = 10;

// fetch data from the api
if (started) {
    async function fetchData() {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/questions/${category}/${pagination}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            sessionStorage.setItem('data', JSON.stringify(data));
            return data;
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    }

    fetchData().then(data => {
        if (data) {
            startTrivia();
        }
    });
} else {
    window.addEventListener('load', () => {
        startTrivia();        
    });
}


let currentQuestionIndex = 0;
let score = 0;


const startTrivia = () => {
    sessionStorage.setItem('started', false)
    score = 0;
    
    displayQuestion()
    startTimer()

}

const displayQuestion = () => {
    let data = JSON.parse(sessionStorage.getItem('data'))
    let currentQuestionIndex = Number(JSON.parse(sessionStorage.getItem('currentQuestionIndex'))) || 0;

    const questionDisplay = document.getElementById('question');
    const answerDisplay = document.getElementById('answer-cont');
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    const countdownDisplay = document.getElementById('countdown-timer');
    let currentQuestion = data[currentQuestionIndex];
    let options = currentQuestion.options
    let questionNumber = currentQuestionIndex + 1;
    questionDisplay.innerHTML = `${currentQuestion.question}`;
    
    answerDisplay.innerHTML = "";  
    countdownDisplay.textContent = formatTime(countdownTime);  

    options.map((option)=>{
        answerDisplay.innerHTML  += `<button class="answer answer-btn" id="answerButton">${option}</button> `
    })
    
    let answerButtons = document.querySelectorAll("#answerButton")
    answerButtons.forEach((button, index)=>{
        let questionId = currentQuestion.id
        // show selected options 
        const answers = JSON.parse(sessionStorage.getItem("answers")) || [];
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
            
            let existingData = JSON.parse(sessionStorage.getItem("answers")) || [];
            const index = existingData.findIndex(item => item.questionId === newAnswer.questionId);
            
            if (index === -1) {
                existingData.push(newAnswer);
            } else {
                existingData[index].selectedOption = newAnswer.selectedOption;
            }
            
            sessionStorage.setItem("answers", JSON.stringify(existingData));
        }
    })

    prevButton.onclick = () => {
        currentQuestionIndex--
        if (currentQuestionIndex<=0) {
            currentQuestionIndex=0
        }
        sessionStorage.setItem('currentQuestionIndex', JSON.stringify(currentQuestionIndex))
        displayQuestion(JSON.parse(sessionStorage.getItem('data')))

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
                sessionStorage.setItem('currentQuestionIndex', JSON.stringify(currentQuestionIndex))
        
                displayQuestion(JSON.parse(sessionStorage.getItem('data')))
    
        }else{
            if (confirm("Are you sure you want to finish the game?")) {
                endTrivia(JSON.parse(sessionStorage.getItem('data')))
            }
        }
    }
}

// end trivia/score logic
const endTrivia = (data) => {
    const answers = JSON.parse(sessionStorage.getItem("answers")) || [];  
    answers.forEach(answer => {
        const answeredQuestions = data.find(item => item.id === answer.questionId)
        if (answeredQuestions && answer.selectedOption == answeredQuestions.correct_answer) {
            score = score + 10
        }
    });
    resetTimer()
    sessionStorage.setItem('score', JSON.stringify(score))
    window.location.href = "./score-page.html"
    
}

let countdownTime = JSON.parse(sessionStorage.getItem('countdownTime')) || 300;    
let countdownInterval;


function formatTime(seconds) {
    const minutes = String(Math.floor(seconds / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    return `${minutes}:${secs}`;
}

const startTimer = () => {
    const data = JSON.parse(sessionStorage.getItem('data'))
    const countdownDisplay = document.getElementById('countdown-timer');
    
    if (!countdownInterval) {
        countdownInterval = setInterval(() => {
            if (countdownTime > 0) {
                countdownTime--;
                sessionStorage.setItem('countdownTime', JSON.stringify(countdownTime))
                countdownDisplay.textContent = formatTime(countdownTime);
                if (countdownTime<=59) {
                    countdownDisplay.style.animation = "pulse 1s infinite";
                    countdownDisplay.style.color = "#ff0000"
                }
            } else {
                clearInterval(countdownInterval);
                countdownInterval = null;
                alert("Time's up!");
                endTrivia(JSON.parse(sessionStorage.getItem('data')))
            }
        }, 1000);
    }
}

const resetTimer = () => {
    const countdownDisplay = document.getElementById('countdown-timer');

    clearInterval(countdownInterval);
    countdownInterval = null;
    countdownTime = 300; 
    sessionStorage.setItem('countdownTime', JSON.stringify(countdownTime))
    countdownDisplay.textContent = formatTime(countdownTime);
}

const stopTimer = () => {
    clearInterval(countdownInterval);
    countdownInterval = null;
}


