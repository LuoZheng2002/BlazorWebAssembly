let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');
let div = document.getElementById('div');
let image = new Image();
image.src = 'Images/Hatsune_Miku.png';



// Set up the game loop
const frameRate = 60; // Frames per second
const frameDelay = 1000 / frameRate; // Delay between frames in milliseconds
let lastFrameTime = 0;
let x = 150;
let y = 150;
let accumulatedTime = 0;
function gameLoop(timestamp) {
    // Calculate the time since the last frame
    const elapsedTime = timestamp - lastFrameTime;
    accumulatedTime = accumulatedTime + elapsedTime;
    // Only update and render the game if enough time has passed
    if (elapsedTime >= frameDelay) {
        // Clear the canvas
        let realX = x + 150 * Math.sin(accumulatedTime/1000);
        let realY = y + 150 * Math.sin(accumulatedTime * Math.PI/1000);
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(image, realX, realY, 200, 200);
        div.innerText = Number(div.innerText) + 1;

        // Store the current timestamp as the last frame time
        lastFrameTime = timestamp;
    }
    // some comments
    // Request the next frame
    requestAnimationFrame(gameLoop);
}


requestAnimationFrame(gameLoop);