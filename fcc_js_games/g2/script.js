const collisionCanvas = document.getElementById('collisionCanvas');
const collisionCtx = collisionCanvas.getContext('2d');
collisionCanvas.width = window.innerWidth;
collisionCanvas.height = window.innerHeight;

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let canvasPosition = canvas.getBoundingClientRect();

let score = 0;
ctx.font = "50px Impact";


let timeToNextRaven = 0;
let ravenInterval = 500;
let lastTime = 0;

let ravens = [];
class Raven {
    constructor(){
        this.image = new Image();
        this.image.src = './public/img/raven.png';
        this.spriteWidth = 271;
        this.spriteHeight = 194;
        this.sizeModifier = Math.random() * 0.6+0.3;
        this.width = this.spriteWidth*this.sizeModifier;
        this.height = this.spriteHeight*this.sizeModifier;
        this.x = canvas.width;
        this.y = Math.random() * (canvas.height- this.height);
        this.directionX = Math.random() * 5 + 3;
        this.directionY = Math.random() * 5 -2.5;
        this.markedForDeletion = false;
        this.frame = 0;
        this.maxFrame = 4;
        this.timeSinceFlap = 0;
        this.flapInterval  = Math.random()* 50+50;
        this.randomColors = [Math.floor(Math.random()*255),Math.floor(Math.random()*255),Math.floor(Math.random()*255)];
        this.color = 'rgb(' +this.randomColors[0]+','+this.randomColors[1]+','+this.randomColors[2]+')';
    }

    update(deltatime) {
        if (this.y < 0 || this.y >canvas.height -this.height){
            this.directionY = -1 * this.directionY;
        }
        this.x -= this.directionX;
        this.y -= this.directionY;
        if (this.x<0-this.width) this.markedForDeletion = true;
        this.timeSinceFlap += deltatime;
        if (this.timeSinceFlap > this.flapInterval){
            if (this.frame > this.maxFrame) this.frame = 0;
            else this.frame++;
            this.timeSinceFlap = 0;
            particles.push(new Particle(this.x,this.y, this.width, this.color))
        }
    }
    draw(){
        collisionCtx.fillStyle = this.color;
        collisionCtx.fillRect(this.x,this.y,this.width,this.height);
        ctx.drawImage(this.image, this.frame* this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height)
    }

}

let particles = [];
class Particle {
    constructor(x,y,size,color){
        this.size = size;
        this.x = x+this.size/2;
        this.y = y+this.size/3;
        this.radius = Math.random() * this.size * 0.1;
        this.maxRadius = Math.random() * 20+35;
        this.maxRadiusInv = 1/this.maxRadius;
        this.markedForDeletion = false;
        this.speedX = Math.random()+0.5;
        this.color = color;
    }
    update(){
        this.x += this.speedX;
        this.radius +=0.8;
        if(this.radius > this.maxRadius-5) this.markedForDeletion = true;
    }
    draw(){
        ctx.save()
        ctx.globalAlpha = 1-this.radius*this.maxRadiusInv;
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x,this.y,this.radius,0,Math.PI*2);
        ctx.fill();
        ctx.restore();
    }
}


function drawScore() {
    ctx.fillStyle = 'black';
    ctx.fillText('Score: ' + score, 50,75);
    ctx.fillStyle = 'white';
    ctx.fillText('Score: ' + score, 52,77);
}


const explosions = [];

class Explosion {
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.spriteWidth = 200;
        this.spriteHeight = 179;
        this.width = this.spriteWidth*0.7;
        this.height = this.spriteHeight*0.7;
        this.x = x;
        this.y = y;
        this.image = new Image();
        this.image.src = './public/img/boom.png';
        this.frame = 0;
        this.timer = 0;
        this.angle = Math.random() * 6.2;
        this.sound = new Audio();
        this.sound.src = './public/snd/boom.wav';
    }

    update(){
        if (this.frame===0) this.sound.play();
        this.timer++;
        if (this.timer % 5 ===0){
            this.frame++;
        }
    }

    draw(){
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.drawImage(this.image,this.spriteWidth*this.frame,0,this.spriteWidth,this.spriteHeight,0-this.width*0.5,0-this.width*0.5,this.width,this.height);
        ctx.restore();
    }
}

window.addEventListener('click', function(e){
    const detectPixelColor = collisionCtx.getImageData(e.x,e.y,1,1);
    const pc = detectPixelColor.data;
    ravens.forEach(object => {
        if (object.randomColors[0] === pc[0] &&
            object.randomColors[1] === pc[1] &&
            object.randomColors[2] === pc[2]){
                object.markedForDeletion = true;
                score++;
                createAnimation(e);
            }
    })

    //ctx.fillStyle = 'white';
    //ctx.fillRect(positionX-25,positionY-25,50,50);
});

//window.addEventListener('mousemove', function(e){
//    createAnimation(e);
//    //ctx.fillStyle = 'white';
//    //ctx.fillRect(positionX-25,positionY-25,50,50);
//});
function createAnimation(e){
    let positionX = e.x - canvasPosition.left;
    let positionY = e.y - canvasPosition.top;
    explosions.push(new Explosion(positionX,positionY));
}

function animate(timestamp){
    let deltatime = timestamp - lastTime;
    lastTime = timestamp;
    
    ctx.clearRect(0,0,canvas.width,canvas.height);
    collisionCtx.clearRect(0,0,canvas.width,canvas.height);

    // for (let i = 0; i < explosions.length; i++){
    //     explosions[i].update();
    //     explosions[i].draw();
    //     if (explosions[i].frame >5){
    //         explosions.splice(i, 1);
    //         i--;
    //     }
    // };

    timeToNextRaven += deltatime;
    if (timeToNextRaven > ravenInterval) {
        ravens.push(new Raven());
        timeToNextRaven = 0;
        ravens = ravens.sort((a,b) => a.width - b.width);        
    };

    drawScore();
    //ravens = ravens.reverse();
    [...ravens, ...explosions,...particles].forEach(object => object.update(deltatime));
    [...particles,...ravens, ...explosions].forEach(object => object.draw());
    ravens = ravens.filter(object => !object.markedForDeletion);
    particles = particles.filter(object => !object.markedForDeletion);
    
    
    requestAnimationFrame(animate);
};
animate(0);