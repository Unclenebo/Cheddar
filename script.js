// This function takes in a url to an audio file and when called, 
// and plays the sound when the button is clicked

function playSoundAndNavigate(soundUrl, targetUrl) {
    const audio = new Audio(soundUrl);
    audio.play();
    setTimeout(() => {
        window.location.href = targetUrl;
    }, 500);
}
