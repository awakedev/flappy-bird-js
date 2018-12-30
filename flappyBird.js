var cvs = document.getElementById('canvas');
var ctx = cvs.getContext('2d');

// load images

var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeNorth = new Image();
var pipeSouth = new Image();

bird.src = 'images/bird.png';
bg.src = 'images/bg.png';
fg.src = 'images/fg.png';
pipeNorth.src = 'images/pipeNorth.png';
pipeSouth.src = 'images/pipeSouth.png';

var gap = 85;
var constant = pipeNorth.height + gap;

var bX = 10;
var bY = 150;

var gravity = 1.2;

// on key down

document.addEventListener('keydown', moveUp);

function moveUp() {
	bY -= 25;
}

// pipe coords

var pipe = [];

pipe[0] = {
	x: cvs.width,
	y: 0
};



// draw images to canvas
function draw() {
    ctx.drawImage(bg, 0, 0);
    
    for (let index = 0; index < pipe.length; index++) {
        ctx.drawImage(pipeNorth, pipe[index].x, pipe[index].y);
        ctx.drawImage(pipeSouth,  pipe[index].x, pipe[index].y+constant);
        
        pipe[index].x --;

        if(pipe[index].x == 125) {
            pipe.push({
                x : cvs.width,
                y : Math.floor(Math.random() * pipeNorth.height) - pipeNorth.height
            });
        }
        // detect collision
            if (bX + bird.width >= pipe[index].x && bX <= pipe[index].x + 
                pipeNorth.width && bY <= pipe[index].y + pipeNorth.height
                || bY+bird.height >= pipe[index].y+constant){
                    location.reload();
                }
    }
	
	ctx.drawImage(fg, 0, cvs.height - fg.height);

	ctx.drawImage(bird, bX, bY);

	bY += gravity;

	requestAnimationFrame(draw);
}

draw();
