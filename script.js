// Just a custom function to make navigation easy
export const navigate = (url)=>{
    window.location.href = url
}

// This function takes in a url to an audio file and when called, 
// and plays the sound when the button is clicked
export function playSoundAndNavigate(soundUrl, pageUrl) {
    const audio = new Audio(soundUrl);
    audio.play();
    setTimeout(() => {
        window.location.href = pageUrl;
    }, 300);
}

export function playSound(soundUrl) {
    const audio = new Audio(soundUrl);
    audio.play();
}

export const startGame = (category) => {
    sessionStorage.setItem('started', true)
    
    let url = "./trivia-section.html";
    
    if (category) {
        url += `?category=${category}`;
    }
    
    playSoundAndNavigate('./click.wav', url);
}