const data = [
    {
        "id": 1,
        "question": "What is the name of the man that invented suya in Nigeria",
        "options": ["Solomon", "Judas", "Jamil", "Adam"],
        "correctAnswer": "Jamil",
        "category": "History"
    },
    {
        "id": 2,
        "question": "What year did Nigeria gain independence",
        "options": ["1960", "1970", "1957", "1963"],
        "correctAnswer": "1960",
        "category": "History"
    },
    {
        "id": 3,
        "question": "Which planet is known as the Red Planet",
        "options": ["Earth", "Mars", "Jupiter", "Saturn"],
        "correctAnswer": "Mars",
        "category": "Science"
    },
    {
        "id": 4,
        "question": "Who wrote the play 'Romeo and Juliet'",
        "options": ["William Shakespeare", "Chinua Achebe", "Wole Soyinka", "Mark Twain"],
        "correctAnswer": "William Shakespeare",
        "category": "Literature"
    },
    {
        "id": 5,
        "question": "What is the largest mammal in the world",
        "options": ["Elephant", "Blue Whale", "Giraffe", "Orca"],
        "correctAnswer": "Blue Whale",
        "category": "Science"
    },
    {
        "id": 6,
        "question": "Which country is known as the Land of the Rising Sun",
        "options": ["China", "Japan", "South Korea", "India"],
        "correctAnswer": "Japan",
        "category": "Geography"
    },
    {
        "id": 7,
        "question": "What is the chemical symbol for water",
        "options": ["H2O", "O2", "CO2", "HO"],
        "correctAnswer": "H2O",
        "category": "Science"
    },
    {
        "id": 8,
        "question": "Who was the first President of Nigeria",
        "options": ["Nnamdi Azikiwe", "Abubakar Tafawa Balewa", "Obafemi Awolowo", "Yakubu Gowon"],
        "correctAnswer": "Nnamdi Azikiwe",
        "category": "History"
    },
    {
        "id": 9,
        "question": "What is the capital city of Australia",
        "options": ["Sydney", "Melbourne", "Canberra", "Perth"],
        "correctAnswer": "Canberra",
        "category": "Geography"
    },
    {
        "id": 10,
        "question": "What is the smallest prime number",
        "options": ["1", "2", "3", "5"],
        "correctAnswer": "2",
        "category": "Mathematics"
    },
    {
        "id": 11,
        "question": "What is the currency of Japan",
        "options": ["Yen", "Won", "Dollar", "Rupee"],
        "correctAnswer": "Yen",
        "category": "Economics"
    },
    {
        "id": 12,
        "question": "Which organ is responsible for pumping blood in the human body",
        "options": ["Brain", "Heart", "Lungs", "Liver"],
        "correctAnswer": "Heart",
        "category": "Biology"
        }
]


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
    questionDisplay.innerHTML = currentQuestion.question;
    
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
    
    nextButton.onclick = () => {
        currentQuestionIndex++;
        if (currentQuestionIndex>=data.length-1) {
            currentQuestionIndex=data.length-1
        }
        localStorage.setItem('currentQuestionIndex', JSON.stringify(currentQuestionIndex))
        
        displayQuestion()        
    }
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
            }
        }, 1000);
    }
}

const stopTimer = () => {
    clearInterval(countdownInterval);
    countdownInterval = null;
}

const resetTimer = () => {
    clearInterval(countdownInterval);
    countdownInterval = null;
    countdownTime = 300; 
    countdownDisplay.textContent = formatTime(countdownTime);
}


startTrivia()

