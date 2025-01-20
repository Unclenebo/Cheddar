// trivia page
const scorePage = (score)=> {
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
            <p class="score-quote" id="score-quote">"In life it does  not matter if you
                lose or win, just have fun doing it"</p>
            <div class="button-nav">
                <button class="primary-btn">Replay</button><a href="./index.html"><button class="primary-btn">Go to Home</button></a>
            </div>
            <img src="./Cheddy_BTC.png" class="score-character" alt="">
        </section>

        `
    )
}