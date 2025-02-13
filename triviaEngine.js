import { playSoundAndNavigate } from './script.js';
import { startGame } from './script.js';

const userForm = document.getElementById('userForm')

if (userForm) {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));  

    if (userInfo) {
        if (confirm(`Do you wish to continue as ${userInfo.username}`)) {
            playSoundAndNavigate('./click.wav', './select-game.html');
        }
    }

    userForm.addEventListener('submit', (event) => {
        event.preventDefault();
    
        const username = document.getElementById('username').value.trim();
        const age = document.getElementById('age').value.trim();
    
        if (username.length > 1 && !isNaN(age) && age.length > 0) {
            localStorage.setItem("userInfo", JSON.stringify({ username, age }));
            playSoundAndNavigate('./click.wav', './select-game.html');
        } else {
            if (username.length <= 1) {
                alert("Username must be at least 2 characters");
            } else if (age.length <= 1 || isNaN(age)) {
                alert("Please provide a valid age");
            }
        }
    });
    
}

const options = document.querySelectorAll('.option');

options.forEach(option =>{
    option.addEventListener('click', ()=>{
        if (option.classList.contains('maths')) {
            startGame('maths')
            localStorage.setItem('lastGame', JSON.stringify('maths'))
        }else if (option.classList.contains('english')) {
            startGame('english')
            localStorage.setItem('lastGame', JSON.stringify('english'))
        }else if (option.classList.contains('science')) {
            startGame('science')
            localStorage.setItem('lastGame', JSON.stringify('science'))
        }
    })
})
