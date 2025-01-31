const review = ()=>{
    let data = JSON.parse(sessionStorage.getItem('data'))
    let answers = JSON.parse(sessionStorage.getItem('answers'))
    sessionStorage.setItem('currentQuestionIndex', 0)


    const displayQuestion = () => {
        let currentQuestionIndex = Number(JSON.parse(sessionStorage.getItem('currentQuestionIndex'))) || 0;
    
        const questionDisplay = document.getElementById('question');
        const answerDisplay = document.getElementById('answer-cont');
        const prevButton = document.getElementById('prevButton');
        const nextButton = document.getElementById('nextButton');
        let currentQuestion = data[currentQuestionIndex];
        let options = currentQuestion.options
        questionDisplay.innerHTML = `${currentQuestion.question}`;
        
        answerDisplay.innerHTML = "";  
    
        options.map((option)=>{
            answerDisplay.innerHTML  += `<button class="answer" id="answerButton">${option}</button> `
        })
        
        let answerButtons = document.querySelectorAll("#answerButton")
        answerButtons.forEach((button)=>{
            let questionId = currentQuestion.id
            // show selected options 
            if (button.textContent == data.find(item => item.id === currentQuestion.id).correct_answer) {
                button.classList.add('correct')
            }
            if (answers) {
                const aIndex = answers.findIndex(item => item.questionId === questionId);
                if (aIndex !== -1) {
                    const answeredQuestions = data.find(item => item.id === answers[aIndex].questionId)
                    if (button.textContent == answers[aIndex].selectedOption) {
                        if (answers[aIndex].selectedOption != answeredQuestions.correct_answer) {
                            button.classList.add('wrong')
                        }
                    }
                }
            }
            
        })
    
        prevButton.onclick = () => {
            currentQuestionIndex--
            if (currentQuestionIndex<=0) {
                currentQuestionIndex=0
            }
            sessionStorage.setItem('currentQuestionIndex', JSON.stringify(currentQuestionIndex))
            displayQuestion()
    
        }
    
        if (currentQuestionIndex==data.length-1) {
            nextButton.innerHTML = "Exit"
        }else{
            nextButton.innerHTML = "<img src='./arrow_forward.png'>"
        }
        
        nextButton.onclick = () => {
            if (nextButton.textContent != "Exit") {
                    currentQuestionIndex++;
                    if (currentQuestionIndex>=data.length-1) {
                        currentQuestionIndex=data.length-1
                    }
                    sessionStorage.setItem('currentQuestionIndex', JSON.stringify(currentQuestionIndex))
            
                    displayQuestion()
        
            }else{
                // Exit func
                sessionStorage.clear()
                window.location.href = "./index.html"
            }
        }
    }

    displayQuestion()
}

review()