// // Create the custom pointer element
// const pointer = document.createElement("div");
// pointer.classList.add("custom-pointer");
// document.body.appendChild(pointer);

// // Move the pointer with the mouse
// document.addEventListener("mousemove", (e) => {
//     pointer.style.left = `${e.pageX}px`;
//     pointer.style.top = `${e.pageY}px`;
// });

// // Add click effect
// document.addEventListener("mousedown", () => {
//     pointer.classList.add("click");
// });
// document.addEventListener("mouseup", () => {
//     pointer.classList.remove("click");
// });

// // Add hover effect for buttons and links
// document.querySelectorAll("button, a, .option-btn").forEach((el) => {
//     el.addEventListener("mouseenter", () => pointer.classList.add("hover"));
//     el.addEventListener("mouseleave", () => pointer.classList.remove("hover"));
// });

const fullscreenBtn = document.getElementById("fullscreen-btn");

// SVG Icons
const enterFullscreenIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ffe959"><path d="M120-120v-200h80v120h120v80H120Zm520 0v-80h120v-120h80v200H640ZM120-640v-200h200v80H200v120h-80Zm640 0v-120H640v-80h200v200h-80Z"/></svg>`;
const exitFullscreenIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ffe959"><path d="M240-120v-120H120v-80h200v200h-80Zm400 0v-200h200v80H720v120h-80ZM120-640v-80h120v-120h80v200H120Zm520 0v-200h80v120h120v80H640Z"/></svg>`;

// Update the button icon
const updateFullscreenIcon = () => {
    if (document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement) {
        fullscreenBtn.innerHTML = exitFullscreenIcon;
    } else {
        fullscreenBtn.innerHTML = enterFullscreenIcon;
    }
};

// Function to toggle fullscreen mode
fullscreenBtn.addEventListener("click", () => {
    const elem = document.documentElement; // Select the whole document

    if (!document.fullscreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
        // Enter fullscreen
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
        }
        localStorage.setItem("isFullscreen", "true"); // Save fullscreen state
    } else {
        // Exit fullscreen
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
        localStorage.removeItem("isFullscreen"); // Remove fullscreen state
    }
});

// Restore fullscreen state on page load
document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("isFullscreen") === "true") {
        const elem = document.documentElement;
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
        }
    }
    updateFullscreenIcon(); // Set correct icon on load
});

// Listen for fullscreen change events
document.addEventListener("fullscreenchange", updateFullscreenIcon);
document.addEventListener("webkitfullscreenchange", updateFullscreenIcon);
document.addEventListener("msfullscreenchange", updateFullscreenIcon);
