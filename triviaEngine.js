function naviage(url) {
    window.location.href = url;
}

const userForm = document.getElementById('userForm')

if (userForm) {
    userForm.addEventListener('submit', (event) => {
        event.preventDefault();
    
        const username = document.getElementById('username').value.trim();
        const age = document.getElementById('age').value.trim();
    
        if (username.length > 1 && !isNaN(age) && age.length > 0) {
            localStorage.setItem("userInfo", JSON.stringify({ username, age }));
            naviage("./select-game.html");
        } else {
            if (username.length <= 1) {
                alert("Username must be at least 2 characters");
            } else if (age.length <= 1 || isNaN(age)) {
                alert("Please provide a valid age");
            }
        }
    });
    
}
const userInfo = JSON.parse(localStorage.getItem("userInfo"));  
const username = userInfo.username;  
const age = userInfo.age;  

const startGame = (category) => {
    let url = "./trivia-section.html";
    
    if (category) {
        url += `?category=${category}`;
    }
    
    naviage(url);
}


