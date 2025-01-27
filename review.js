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
        const countdownDisplay = document.getElementById('countdown-timer');
        let currentQuestion = data[currentQuestionIndex];
        let options = currentQuestion.options
        let questionNumber = currentQuestionIndex + 1;
        questionDisplay.innerHTML = `${currentQuestion.question}`;
        
        answerDisplay.innerHTML = "";  
    
        options.map((option)=>{
            answerDisplay.innerHTML  += `<button class="answer" id="answerButton">${option}</button> `
        })
        
        let answerButtons = document.querySelectorAll("#answerButton")
        answerButtons.forEach((button)=>{
            let questionId = currentQuestion.id
            // show selected options 
            const answers = JSON.parse(sessionStorage.getItem("answers")) || [];
            const aIndex = answers.findIndex(item => item.questionId === questionId);
            const answeredQuestions = data.find(item => item.id === answers[aIndex].questionId)
            if (button.textContent == answeredQuestions.correct_answer){
                button.classList.add('correct')
            }
            if (aIndex !== -1) {
                if (button.textContent == answers[aIndex].selectedOption) {
                    if (answers[aIndex].selectedOption != answeredQuestions.correct_answer) {
                        button.classList.add('wrong')
                    }
                }
            }

            console.log("Total qusetions = " + data.length);
            console.log("Qusetions answered = " + answers.length);
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
            }
        }
    }

    displayQuestion()
}

review()