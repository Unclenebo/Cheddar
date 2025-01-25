// trivia page
const scorePage = (score)=> {

    let quote, character
    const username = JSON.parse(localStorage.getItem('userInfo')).username
    const age = JSON.parse(localStorage.getItem('userInfo')).age  

    if (score == 0) {
        quote = "Did the quiz scare you off, or were you too busy throwing cheese instead of answers";
        character = './0_score.png'
    }else if (score != 0 && score <= 10 ) {
        quote = "In life it does  not matter if you lose or win, just have fun doing it";
        character = './10_score.png'
    }else if (score != 100 && score >= 30 ) {
        quote = "Every step is a chance to learn let's keep trying and aim higher next time!";
        character = './30_score.png'
    }else if (score == 100) {
        quote = `Congratulations ${username} you completed the quiz, that is a very high score for a ${age} year old`;
        character = './100_score.png'
    }

    return(
        `   
        <style>
            .total-point{
                width: fit-content;
                margin: 2rem auto;
                font-size: 5rem;
                font-weight: 500;
            }

            .score-quote{
                width: 20rem;
                color: rgba(255, 233, 89, 1);
                text-align: center;
                font-style: 1.1rem;
                line-height: 1.5;
                margin: 1rem auto;
            }

            .button-nav{
                display: flex;
                gap: 1rem;
                position: absolute;
                bottom: 7%;
            }

            .score-character{
                width: 23rem;
                position: absolute;
                bottom: 0;
                right: 5rem;
            }
        </style>

        <div class="trivia-sect-cont-bg"></div>
        <section class="trivia-sect-cont">
            <div class="nav-bar">
                <button class="icon-button" style="visibility: hidden" inert><img src="./arrow_backward.png" alt=""></button>
                <div class="logo-cont"><a href="./index.html" onclick="event.preventDefault(); playSoundAndNavigate('./cheddar-home.mp3', './index.html')" ><img src="./cheddy-head 2.png" class="cheddy-head"></a></div>
                <button class="icon-button icon-button2" style="visibility: hidden" inert><img src="./arrow_forward.png" alt=""></button>
            </div>
            <div class="quetion-img-cont"><img src="./Total Score.png" alt=""></div>
            <h1 class="total-point" id="total-point">${score} pts</h1>
            <p class="score-quote" id="score-quote">"${quote}"</p>
            <div class="button-nav">
                <button class="primary-btn">Replay</button><a href="./index.html"><button class="primary-btn">Go to Home</button></a><button class="primary-btn">Review</button>
            </div>
            <img src="${character}" class="score-character" alt="">
        </section>

        `
    )
}