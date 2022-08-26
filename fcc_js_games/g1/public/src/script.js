/** @type {HTMLCanvasElement} */

let playerState = 'run';
const dropdown = document.getElementById('animations');
dropdown.value = 'run';
dropdown.addEventListener('change', function(e){
    playerState = e.target.value;
})

// SETUP canvas -----------------------------------------------
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 800;
const CANVAS_HEIGHT = canvas.height = 700;

// SETUP background -------------------------------------------
let gameSpeed = 5;
const backgroundLayer1 = new Image();
backgroundLayer1.src = '/img/layer-1.png'
const backgroundLayer2 = new Image();
backgroundLayer2.src = '/img/layer-2.png'
const backgroundLayer3 = new Image();
backgroundLayer3.src = '/img/layer-3.png'
const backgroundLayer4 = new Image();
backgroundLayer4.src = '/img/layer-4.png'
const backgroundLayer5 = new Image();
backgroundLayer5.src = '/img/layer-5.png'

window.addEventListener('load', function(){
    const slider = document.getElementById('slider');
    slider.value = gameSpeed;
    const showGameSpeed = document.getElementById('showGameSpeed');
    showGameSpeed.innerHTML = gameSpeed;
    slider.addEventListener('change', function(e){
        gameSpeed = e.target.value;
        showGameSpeed.innerHTML = gameSpeed;
    });
    
    class Layer {
        constructor(image, speedModifier){
            this.x = 0;
            this.y = 0;
            this.width = 2400;
            this.height = 700;
            this.image = image;
            this.speedModifier = speedModifier;
            this.speed = gameSpeed * this.speedModifier;
        }
        update(){
            this.speed = gameSpeed * this.speedModifier;
            if (this.x <= -this.width){
                this.x = 0;
            }
            this.x = this.x - this.speed;
            //this.x = gameFrame * this.speed % this.width;
            
        }
        draw(){
            ctx.drawImage(this.image, this.x,            this.y, this.width, this.height);
            ctx.drawImage(this.image, this.x+this.width, this.y, this.width, this.height);
        }
    }    

    const layer1 = new Layer(backgroundLayer1, 0.15);
    const layer2 = new Layer(backgroundLayer2, 0.25);
    const layer3 = new Layer(backgroundLayer3, 0.4);
    const layer4 = new Layer(backgroundLayer4, 0.5);
    const layer5 = new Layer(backgroundLayer5, 1);

    const backgroundObjects = [layer1,layer2,layer3,layer4,layer5];
    
    
    // SETUP player -----------------------------------------------
    const playerImage = new Image();
    playerImage.src = '/img/shadow_dog.png';
    const spriteWidth = 575;
    const spriteHeight = 523;
    
    
    let gameFrame = 0;
    const staggerFrames = 3;
    const spriteAnimations = [];
    const animationStates = [
        {    name: 'idle',   frames: 7   },
        {    name: 'jump',   frames: 7   },
        {    name: 'fall',   frames: 7   },
        {    name: 'run',    frames: 9   },
        {    name: 'dizzy',  frames: 11  },
        {    name: 'sit',    frames: 5   },    
        {    name: 'roll',   frames: 7   },
        {    name: 'bite',   frames: 7   },    
        {    name: 'ko',     frames: 12  },
        {    name: 'getHit', frames: 4   }
    ];
    
    animationStates.forEach((state, index) => {
        let frames = {
            loc: [],
        }
        for (let j = 0; j < state.frames; j++) {
            let positionX = j* spriteWidth;
            let positionY = index * spriteHeight;
            frames.loc.push({x: positionX, y: positionY});
        }
        spriteAnimations[state.name] = frames;
    });
    
    
    // SETUP enemies ------------------------------------------
    numberOfEnemies = 10;


    function setSpriteDims(object){

    }
    

    class Enemy {
        constructor(){
            this.movementName = "stationaryCircle"
            this.image = new Image();
            this.image.src = '/img/enemy4.png';
            this.image.parent = this;
            this.speed = 0;
            this.direction = 0.5;
            //this.speed = Math.sign(this.direction) *( Math.random()*4 + this.direction);
            this.x = 0;
            this.y = 0;
            this.newX = 0;
            this.newY = 0;
            this.frame = 0;
            this.flapSpeed = 0;
            this.angle = 0;
            this.angleSpeed = 0;
            this.curve = 0;
            this.movementFunction = [];
            this.interval = 0

            this.movements = {

                moveLeft : {
                    setup : function (enemy) {
                        enemy.angleSpeed = Math.random() * 0.2;
                        enemy.curve = Math.random() * 7;
                        enemy.speed = Math.random()*4 - 2;
                    },
                    update : function () {
                        this.x -= this.speed;
                        if (this.x+this.width<0) this.x = canvas.width;
                        if (this.x>canvas.width) this.x = 0-this.width;
                        this.y += Math.sin(this.angle)
                        this.angle += this.angleSpeed;
                    },
                },

                stationaryRandom : {
                    setup : function (enemy) {
                    },
                    update : function () {
                        this.x += Math.random() * 9 - 4.5;
                        this.y += Math.random() * 5 - 2.5;
                    }
                },

                stationaryCircle : {
                    setup : function (enemy) {
                        enemy.angleSpeed = Math.random() * 0.2;
                        enemy.curve = Math.random() * 7;
                    },
                    update : function () {                        
                        this.x += this.curve * Math.cos(this.angle);
                        this.y += this.curve * Math.sin(this.angle);
                        this.angle += this.angleSpeed;
                    }
                },
                
                verticalFigure8 : {
                    setup : function (enemy) {
                        enemy.angleSpeed = Math.random() * 1.5 + 0.5
                    },
                    update : function () {
                        this.x = canvas.width/2 * Math.cos(this.angle * Math.PI/90) + (canvas.width/2 - this.width/2);
                        this.y = canvas.height/2 * Math.sin(this.angle * Math.PI/270) + (canvas.height/2 - this.height/2);
                        this.angle += this.angleSpeed;
                    }
                },

                randomShuffle : {
                    setup : function (enemy) {
                        enemy.interval = Math.floor(Math.random() * 200+50);
                        enemy.newX = Math.random() * (canvas.width - enemy.width);
                        enemy.newY = Math.random() * (canvas.height - enemy.height);
                    },
                    update : function () {
                        if ( gameFrame % this.interval === 0 ) {
                            this.newX = Math.random() * (canvas.width - this.width);
                            this.newY = Math.random() * (canvas.height - this.height);
                        }
                        this.x -= (this.x-this.newX)/70;
                        this.y -= (this.y-this.newY)/70;
                    }

                }

            }

            this.movementFunction = this.movements["moveLeft"]["update"];
            //this.movementFunction = this.movements["stationaryRandom"];
            //this.change_behavior("stationaryCircle");
            //this.movementFunction = this.movements["stationaryCircle"]["update"];
            
            this.image.onload = function () { 
                this.parent.spriteWidth = this.width/9;
                this.parent.spriteHeight = this.height;
                this.parent.width = this.parent.spriteWidth/3;
                this.parent.height = this.parent.spriteHeight/3;
                this.parent.x = Math.random() * (canvas.width - this.parent.width);
                this.parent.y = Math.random() * (canvas.height - this.parent.height);
                this.parent.flapSpeed = Math.floor(Math.random() * 3 + 1);
                this.parent.change_behavior(this.parent.movementName);
            }

        }
        
        change_behavior(movementName) {
            this.movements[movementName]["setup"](this);
            this.movementFunction = this.movements[movementName]["update"];
            this.movementName = movementName;
        }

        update(){
            this.movementFunction();
            if (gameFrame % 2 === 0 ) {
                this.frame > 4 ? this.frame=0 : this.frame++;
            }
        }

        draw(){
            if (this.speed>=0) {
                ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
            }
            else {
                ctx.save();
                ctx.scale(-1,1);
                ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, -this.x-this.width, this.y, this.width, this.height);                
                ctx.restore();
            }
            
            ctx.strokeRect(this.x, this.y, this.width, this.height,100,100);
        }
    }
    const enemy1 = new Enemy();
    
    const enemyObjects = [];
    for (j=0; j<numberOfEnemies; j++) {
        enemyObjects.push( new Enemy() );
    }
    
    const enemyStateDropDown = document.getElementById('enemyState');
    enemyStateDropDown.value = 'stationaryCircle';
    enemyStateDropDown.addEventListener('change',function (e) {
        enemyObjects.forEach(enemy => {
            enemy.change_behavior(e.target.value);
        });
    });
    
    console.log(enemyObjects);
    
    
    function animate(){
        
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        let position = Math.floor(Math.abs(gameFrame)/staggerFrames) % spriteAnimations[ playerState ].loc.length;
        let frameX = spriteAnimations[ playerState ].loc[position].x;
        let frameY = spriteAnimations[ playerState ].loc[position].y
        

        backgroundObjects.forEach(object => {
            object.update();
            object.draw();
        });
        ctx.drawImage(playerImage, frameX, frameY, spriteWidth, spriteHeight, 200, 460, spriteWidth/4,spriteHeight/4);
        gameFrame--;

        enemyObjects.forEach(enemy => {
            enemy.update();
            enemy.draw();
        })
                
        requestAnimationFrame(animate);
    };
    
    animate();
});