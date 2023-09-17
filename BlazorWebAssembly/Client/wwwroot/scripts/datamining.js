class DataMiningViewModel {
    constructor() {
        this.canvas = document.getElementById('canvas');
        this.context = canvas.getContext('2d');
        this.div = document.getElementById('div');
        this.div.innerText = '0';
        this.image = new Image();
        this.image.src = 'Images/Hatsune_Miku.png';
        this.frameRate = 60;
        this.frameDelay = 1000 / this.frameRate;
        this.x = 150;
        this.y = 150;
        this.accumulatedTime = 0;
        this.lastFrameTime = 0;
        this.animationID = 0;
    }
    doLoop(timestamp) {
        // Calculate the time since the last frame
        const elapsedTime = timestamp - this.lastFrameTime;
        this.accumulatedTime = this.accumulatedTime + elapsedTime;
        // Only update and render the game if enough time has passed
        if (elapsedTime >= this.frameDelay) {
            // Clear the canvas
            let realX = this.x + 150 * Math.sin(this.accumulatedTime / 1000);
            let realY = this.y + 150 * Math.sin(this.accumulatedTime * Math.PI / 1000);
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.context.drawImage(this.image, realX, realY, 200, 200);
            this.div.innerText = Number(this.div.innerText) + 1;

            // Store the current timestamp as the last frame time
            this.lastFrameTime = timestamp;
        }
    }
}
var dataMiningViewModel; // uninitialized
function gameLoop(timestamp) {
    dataMiningViewModel.doLoop(timestamp);
    dataMiningViewModel.animationID = requestAnimationFrame(gameLoop);
}

function startDataMining() {
    if (dataMiningViewModel != null) {
        endDataMining();
    }
    console.log('Data Mining Started!');
    dataMiningViewModel = new DataMiningViewModel();
    dataMiningViewModel.animationID = requestAnimationFrame(gameLoop);
}

function endDataMining() {
    if (dataMiningViewModel != null) {
        console.log('Data Mining Ended!');
        cancelAnimationFrame(dataMiningViewModel.animationID);
        dataMiningViewModel = null;
    }
}