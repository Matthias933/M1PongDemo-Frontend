    // RequestAnimFrame: a browser API for getting smooth animations
    window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       || 
        window.webkitRequestAnimationFrame || 
        window.mozRequestAnimationFrame    || 
        window.oRequestAnimationFrame      || 
        window.msRequestAnimationFrame     ||  
        function( callback ){
            return window.setTimeout(callback, 1000 / 60);
        };
    })();

    window.cancelRequestAnimFrame = ( function() {
    return window.cancelAnimationFrame          ||
        window.webkitCancelRequestAnimationFrame    ||
        window.mozCancelRequestAnimationFrame       ||
        window.oCancelRequestAnimationFrame     ||
        window.msCancelRequestAnimationFrame        ||
        clearTimeout
} )();


// Initialize canvas and required variables
var canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d"), // Create canvas context
    W = window.innerWidth, // Window's width
    H = window.innerHeight, // Window's height
    particles = [], // Array containing particles
    ball = {}, // Ball object
    paddles = [2], // Array containing two paddles TODO: fail no array size in js!
    mouse = {}, // Mouse object to store it's current position
    points_p1 = 0, // Varialbe to store points_p1
    points_p2 = 0, // Variable to store points_p2
    fps = 60, // Max FPS (frames per second)
    particlesCount = 20, // Number of sparks when ball strikes the paddle
    flag = 0, // Flag variable which is changed on collision
    particlePos = {}, // Object to contain the position of collision 
    multipler = 1, // Varialbe to control the direction of sparks
    startBtn = {}, // Start button object
    restartBtn = {}, // Restart button object
    exitBtn = {}, //Exit button object
    over = 0, // flag varialbe, cahnged when the game is over
    init, // variable to initialize animation
    paddleHit;
    
// Add mousemove and mousedown events to the canvas
canvas.addEventListener("mousemove", trackPosition, true);
canvas.addEventListener("mousedown", btnClick, true);
canvas.addEventListener('dblclick', function(){ 
    if(canvas.webkitRequestFullScreen) {
        canvas.webkitRequestFullScreen();
    } else {
        canvas.mozRequestFullScreen();
    }
});

// Initialise the collision sound
collision = document.getElementById("collide");

// Set the canvas's height and width to full screen
canvas.width = W;
canvas.height = H;

// Function to paint canvas
function paintCanvas() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Function for creating paddles
function Paddle(pos) {
    // Height and width
    this.h = 150;
    this.w = 5;
    
    // Paddle's position
    this.y = canvas.height/2 - this.h/2;
    this.x = (pos == "right") ? 0 : canvas.width - this.w;
    
}

// Push two new paddles into the paddles[] array
paddles.push(new Paddle("left"));
paddles.push(new Paddle("right"));

function setPosP1(pos) {
    paddles[2].y = pos - paddles[2].h/2
}

function setPosP2(pos) {
    paddles[1].y = pos - paddles[1].h/2
}

// Ball object
ball = {
    x: 50,
    y: 50, 
    r: 5,
    c: "white",
    vx: 4,
    vy: 8,
    
    // Function for drawing ball on canvas
    draw: function() {
        ctx.beginPath();
        ctx.fillStyle = this.c;
        ctx.arc(this.x, this.y, this.r, 0, Math.PI*2, false);
        ctx.fill();
    }
};


// Start Button object
startBtn = {
    w: 100,
    h: 50,
    x: canvas.width/2 - 50,
    y: canvas.height/2 - 25,
    
    draw: function() {
        ctx.strokeStyle = "white";
        ctx.lineWidth = "2";
        ctx.strokeRect(this.x, this.y, this.w, this.h);
        
        ctx.font = "18px Arial, sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStlye = "white";
        ctx.fillText("Start", canvas.width/2, canvas.height/2 );
    }
};

// Restart Button object
restartBtn = {
    w: 100,
    h: 50,
    x: canvas.width/2 - 50,
    y: canvas.height/2 - 50,
    
    draw: function() {
        ctx.strokeStyle = "white";
        ctx.lineWidth = "2";
        ctx.strokeRect(this.x, this.y, this.w, this.h);
        
        ctx.font = "18px Arial, sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStlye = "white";
        ctx.fillText("Restart", canvas.width/2, H/2 - 25 );
    }
};

// Exit Button object
exitBtn = {
    w: 100,
    h: 50,
    x: canvas.width/2 - 50,
    y: canvas.height/2 + 50,
    
    draw: function() {
        ctx.strokeStyle = "white";
        ctx.lineWidth = "2";
        ctx.strokeRect(this.x, this.y, this.w, this.h);
        
        ctx.font = "18px Arial, sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStlye = "white";
        ctx.fillText("Exit", canvas.width/2, H/2 + 75 );
    }
};

// Function for creating particles object
function createParticles(x, y, m) {
    this.x = x || 0;
    this.y = y || 0;
    
    this.radius = 1.2;
    
    this.vx = -1.5 + Math.random()*3;
    this.vy = m * Math.random()*1.5;
}

// Draw everything on canvas
function draw() {
    paintCanvas();
    for(var i = 0; i < paddles.length; i++) {
        p = paddles[i];
        
        ctx.fillStyle = "white";
        ctx.fillRect(p.x, p.y, p.w, p.h);
    }
    
    ball.draw();
    update();
}

// Function to increase speed after every 5 points_p1
function increaseSpd() {
    if(points_p1 + points_p2 % 4 == 0) {
        if(Math.abs(ball.vx) < 15) {
            ball.vx += (ball.vx < 0) ? -1 : 1;
            ball.vy += (ball.vy < 0) ? -2 : 2;
        }
    }
}

// Track the position of mouse cursor
function trackPosition(e) {
    mouse.x = e.pageX;
    mouse.y = e.pageY;
}

// Function to update positions, score and everything.
// Basically, the main game logic is defined here
function update() {
    
    // Update scores
    updateScore(); 
    
    // Move the paddles on mouse move
    /* remove this no mouse support!
    if(mouse.x && mouse.y) {
        for(var i = 1; i < paddles.length; i++) {
            p = paddles[i];
            p.y = mouse.y - p.h/2;
        }        
    }
    */
    
    // Move the ball
    ball.x += ball.vx;
    ball.y += ball.vy;
    
    // Collision with paddles
    p1 = paddles[1];
    p2 = paddles[2];
    
    // If the ball strikes with paddles,
    // invert the y-velocity vector of ball,
    // increment the points_p1, play the collision sound,
    // save collision's position so that sparks can be
    // emitted from that position, set the flag variable,
    // and change the multiplier
    if(collides(ball, p1)) {
        collideAction(ball, p1);
    }
    
    
    else if(collides(ball, p2)) {
        collideAction(ball, p2);
    } 
    
    else {
        // Collide with walls, If the ball hits the left/right,
        // walls, run gameOver() function
        if(ball.x + ball.r > canvas.width) {
            ball.x = canvas.width - ball.r;
            gameOver();
        } 
        
        else if(ball.x < 0) {
            ball.x = ball.r;
            gameOver();
        }
        
        // If ball strikes the horizontal walls, invert the 
        // y-velocity vector of ball
        if(ball.y + ball.r > canvas.height) {
            ball.vy = -ball.vy;
            ball.y = canvas.height - ball.r;
        }
        
        else if(ball.y -ball.r < 0) {
            ball.vy = -ball.vy;
            ball.y = ball.r;
        }
    }
    
    
    
    // If flag is set, push the particles
    if(flag == 1) { 
        for(var k = 0; k < particlesCount; k++) {
            particles.push(new createParticles(particlePos.x, particlePos.y, multiplier));
        }
    }    
    
    // Emit particles/sparks
    emitParticles();
    
    // reset flag
    flag = 0;
}

//Function to check collision between ball and one of
//the paddles
function collides(b, p) {
    if(b.y + ball.r >= p.y && b.y - ball.r <=p.y + p.h) {
        if(b.x >= (p.x - p.w) && p.x > 0){
            paddleHit = 1;
            return true;
        }
        
        else if(b.x <= p.w && p.x == 0) {
            paddleHit = 2;
            return true;
        }
        else return false;
    }
}

//Do this when collides == true
function collideAction(ball, p) {
    ball.vx = -ball.vx;
    
    if(paddleHit == 1) {
        ball.x = p.x - p.w;
        particlePos.x = ball.x + ball.r;
        multiplier = 1;
        points_p2++;
    }
    
    else if(paddleHit == 2) {
        ball.x = p.w + ball.r;
        particlePos.x = ball.x - ball.r;
        multiplier = -1;  
            points_p1++;
    }
    

    increaseSpd();
    
    if(collision) {
        if(points_p1 > 0 || points_p2 > 0) //if sound was played pause it
            collision.pause();
        
        collision.currentTime = 0;
        collision.play();
    }
    
    particlePos.y = ball.y;
    flag = 1;
}

// Function for emitting particles
function emitParticles() { 
    for(var j = 0; j < particles.length; j++) {
        par = particles[j];
        
        ctx.beginPath(); 
        ctx.fillStyle = "white";
        if (par.radius > 0) {
            ctx.arc(par.x, par.y, par.radius, 0, Math.PI*2, false);
        }
        ctx.fill();     
        
        par.x += par.vx; 
        par.y += par.vy; 
        
        // Reduce radius so that the particles die after a few seconds
        par.radius = Math.max(par.radius - 0.05, 0.0); 
        
    } 
}

// Function for updating score
function updateScore() {
    ctx.fillStlye = "white";
    ctx.font = "16px Arial, sans-serif";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("Score P1: " + points_p1, 20, 20 );
    ctx.textAlign = "right";
    ctx.fillText("Score P2: " + points_p2, canvas.width - 20, 20);
}

// Function to run when the game overs
function gameOver() {
    ctx.fillStlye = "white";
    ctx.font = "20px Arial, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Game Over:", canvas.width/2, canvas.height/2 - 75 );
    if(points_p1 == points_p2) {
        ctx.fillText("TIE: P1: "+points_p1+" P2: "+points_p2, canvas.width/2, canvas.height/2 + 25 );
    }
    if(points_p1 > points_p2) {
        ctx.fillText("WIN: P1 ("+points_p1+":"+points_p2+")", canvas.width/2, canvas.height/2 + 25 );
    }
    
    if(points_p2 > points_p1) {
        ctx.fillText("WIN: P2 ("+points_p2+":"+points_p1+")", canvas.width/2, canvas.height/2 + 25 );
    }
    
    // Stop the Animation
    cancelRequestAnimFrame(init);
    
    // Set the over flag
    over = 1;
    
    // Show the restart button
    restartBtn.draw();
    
    //Show the exit button
    exitBtn.draw();
}

// Function for running the whole animation
function animloop() {
    ctx.canvas.width  = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    init = requestAnimFrame(animloop);
    draw();
}

// Function to execute at startup
function startScreen() {
    draw();
    startBtn.draw();
}

// On button click (Restart and start)
function btnClick(e) {
    
    // Variables for storing mouse position on click
    var mx = e.pageX,
            my = e.pageY;
    
    // Click start button
    if((mx >= startBtn.x && mx <= startBtn.x + startBtn.w) &&
       (my >= startBtn.y && my <= startBtn.y + startBtn.h)) {
        animloop();
        
        // Delete the start button after clicking it
        startBtn = {};
    }
    
    // If the game is over, and the restart button is clicked
    if(over == 1) {
        if((mx >= restartBtn.x && mx <= restartBtn.x + restartBtn.w) &&
           (my >= restartBtn.y && my <= restartBtn.y + restartBtn.h)) {
            ball.x = 20;
            ball.y = 20;
            points_p1 = 0;
            points_p2 = 0;
            ball.vx = 4;
            ball.vy = 8;
            animloop();
            
            over = 0;
        }
        if((mx >= exitBtn.x && mx <= exitBtn.x + exitBtn.w) &&
           (my >= exitBtn.y && my <= exitBtn.y + exitBtn.h)) {
            location.reload();
        }
    }
}

// Show the start screen
startScreen();