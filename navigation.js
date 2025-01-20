// trivia page
const triviaPage = ()=> {
    return(
        `   
        <div class="trivia-sect-cont-bg"></div>
            <section class="trivia-sect-cont">
            <div class="nav-bar">
                <button class="icon-button" id="prevButton"><img src="./arrow_backward.png" alt=""></button>
                <div class="logo-cont"><a href="" onclick="event.preventDefault(); playSoundAndNavigate('./cheddar-home.mp3', '')" ><img src="./cheddy-head 2.png" class="cheddy-head"></a></div>
                <button class="icon-button icon-button2" id="nextButton"><img src="./arrow_forward.png" alt=""></button>
            </div>
            <div class="quetion-img-cont"><img src="./Questions.png" alt=""></div>
            <div class="trivia-question-cont"><h2 id="question">Som</h2></div>

            <div class="trivia-answer-cont" id="answer-cont">
            </div>
            <div class="timmer-cont"><span id="countdown-timer">00:00</span></div>
        </section>

        `
    )
}