// score page

const scorePage = ()=> {
    score = JSON.parse(sessionStorage.getItem('score'))

    let quote, character
    const username = JSON.parse(localStorage.getItem('userInfo')).username
    const age = JSON.parse(localStorage.getItem('userInfo')).age  

    const display = (_quote, _character)=>{
        quote = _quote;
        character = _character;
    }

    if (score == 0) {
        display("Did the quiz scare you off, or were you too busy throwing cheese instead of answers", './0_score.png')
    } else if (score > 0 && score <= 10) {
        display("In life it does not matter if you lose or win, just have fun doing it", './10_score.png')
    } else if (score > 10 && score < 30) {
        display("Every step is a chance to learn let's keep trying and aim higher next time!", './30_score.png')
    } else if (score >= 30 && score < 100) {
        display("Great job! You're getting closer to perfection!", './30_score.png')
    } else if (score == 100) {
        display(`Congratulations ${username}, you completed the quiz with a perfect score! That's impressive for a ${age} year old!`, './100_score.png')
    }

    document.getElementById('total-point').textContent = `${score} pts`
    document.getElementById('score-quote').textContent = `"${quote}"`
    document.getElementById('score-character').src = character

    document.querySelector(".reviewBtn").addEventListener('click', ()=>{
        window.location.href = "./review.html"
    })

}

scorePage()