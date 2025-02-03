import { startGame } from "./script.js"
import { playSound } from "./script.js"

let score = JSON.parse(sessionStorage.getItem('score'))

let quote, character
const username = JSON.parse(localStorage.getItem('userInfo')).username
const age = JSON.parse(localStorage.getItem('userInfo')).age  

// Display quote and charcter after a game

const displayAndPlaySound = (_quote, _character, _sound)=>{
    quote = _quote;
    character = _character;
    playSound(_sound)
}

// if score is 0
if (score == 0) {
    displayAndPlaySound("Did the quiz scare you off, or were you too busy throwing cheese instead of answers", './0_score.png', './bad-score.wav')
} 
// if score is between 1 and 10
else if (score > 0 && score <= 10) {
    displayAndPlaySound("In life it does not matter if you lose or win, just have fun doing it", './10_score.png', './bad-score.wav')
} 
// if score is between 11 and 30
else if (score > 10 && score < 30) {
    displayAndPlaySound("Every step is a chance to learn let's keep trying and aim higher next time!", './30_score.png', './good-score.wav')
} 
// if score is between 30 and 99
else if (score >= 30 && score < 100) {
    displayAndPlaySound("Great job! You're getting closer to perfection!", './30_score.png', './good-score.wav')
} 
// if score is equal to 100
else if (score == 100) {
    displayAndPlaySound(`Congratulations ${username}, you completed the quiz with a perfect score! That's impressive for a ${age} year old!`, './100_score.png', './high-score.wav')
}

document.getElementById('total-point').textContent = `${score} pts`
document.getElementById('score-quote').textContent = `"${quote}"`
document.getElementById('score-character').src = character

document.querySelector(".reviewBtn").addEventListener('click', ()=>{
    window.location.href = "./review.html"
})

// Go Home
document.querySelector('.home-btn').addEventListener('click', ()=>{
})

// Replay
document.querySelector('.replay-btn').addEventListener('click', ()=>{
    startGame(JSON.parse(localStorage.getItem('lastGame')))
})