
window.addEventListener("load", function () {
    const canvas = document.getElementById("canvas1");
    const ctx = canvas.getContext("2d");
    canvas.width = 800;
    canvas.height = 500;


    class Game {
        constructor(ctx, width, height) {
            this.ctx = ctx;
            this.width = width;
            this.height = height;
            this.enemies = [];
            this.enemyInterval = 500;
            this.enemyTimer = 0;
            this.enemyTypes = ['worm', 'ghost', 'spider'];
        }

        update(deltatime) {
            this.enemies = this.enemies.filter(object => !object.markedForDeletion);
            if (this.enemyTimer > this.enemyInterval) {
                this.#addNewEnemy();
                this.enemyTimer = 0;
            } else {
                this.enemyTimer += deltatime;
            }
            this.enemies.forEach((object) => object.update(deltatime));
        }

        draw() {
            this.enemies.forEach((object) => object.draw(this.ctx));
        }

        #addNewEnemy() {
            const randomEnemy = this.enemyTypes[Math.floor(Math.random() * this.enemyTypes.length )];
            if      (randomEnemy == 'worm')  this.enemies.push(new  Worm(this));
            else if (randomEnemy == 'ghost') this.enemies.push(new Ghost(this));
            else if (randomEnemy == 'spider') this.enemies.push(new Spider(this));
            this.enemies.sort((a,b) => a.y - b.y);
            console.log(this.enemies);
        }
    }

    class Enemy {
        constructor(game) {
            this.game = game;
            this.markedForDeletion = false;
            this.frameX = 0;
            this.maxFrame = 5;
            this.frameInterval = 100;
            this.frameTimer = 0;
        }

        update(deltatime) {
            this.x -= this.vx*deltatime;
            if (this.x < 0 - this.width) this.markedForDeletion = true;
            if (this.frameTimer > this.frameInterval){
                if (this.frameX < this.maxFrame) this.frameX++;
                else this.frameX = 0;
                this.frameTimer = 0;
            } else {
                this.frameTimer += deltatime;
            }
        }

        draw(ctx) {
            ctx.drawImage(this.image,this.frameX*this.spriteWidth,0,this.spriteWidth,this.spriteHeight,this.x,this.y,this.width,this.height)
        }
    }

    class Worm extends Enemy {
        constructor(game){
            super(game);
            this.spriteWidth = 229;
            this.spriteHeight = 171;
            this.width = this.spriteWidth*0.35;
            this.height = this.spriteHeight*0.35;
            this.x = this.game.width;
            this.y = this.game.height-this.height;
            this.image = worm;
            this.vx = Math.random() *0.1+0.1;            
        }
    }

    class Ghost extends Enemy {
        constructor(game){
            super(game);
            this.spriteWidth = 261;
            this.spriteHeight = 209;
            this.x = this.game.width;
            this.y = Math.random() * this.game.height;
            this.width = this.spriteWidth*0.35; 
            this.height = this.spriteHeight*0.35;
            this.x = this.game.width;
            this.y = Math.random() * this.game.height*0.6;
            this.image = ghost;
            this.vx = Math.random() *0.2+0.1;         
            this.angle = 0;   
            this.amplitude = Math.random() *4+1;
        }
        update(deltatime){
            super.update(deltatime);
            this.y+=this.amplitude * Math.sin(this.angle);
            this.angle += 0.07;
        }
        draw(ctx){
            ctx.globalAlpha = 0.7
            super.draw(ctx)
            ctx.globalAlpha = 1
        }
    }

    class Spider extends Enemy {
        constructor(game){
            super(game);
            this.spriteWidth = 310;
            this.spriteHeight = 175;
            this.width = this.spriteWidth*0.35;
            this.height = this.spriteHeight*0.35;
            this.x = Math.random() * this.game.width;
            this.y = 0-this.height;
            this.image = spider;
            this.vx = 0;
            this.vy = Math.random() * 0.1 + 0.1;       
            this.maxLength = Math.random() * this.game.height;     
        }
        update(deltatime){
            super.update(deltatime);
            if (this.y < 0-this.height*2) this.markedForDeletion = true;
            this.y += this.vy *deltatime;
            if (this.y > this.maxLength) this.vy *= -1;
        }
        draw(ctx){
            ctx.beginPath();
            ctx.moveTo(this.x+this.width/2,0);
            ctx.lineTo(this.x+this.width/2,this.y+this.height/2);
            ctx.stroke();
            super.draw(ctx);

        }
    }

    const game = new Game(ctx, canvas.width, canvas.height);
    let lastTime = 0;
    function animate(timestamp) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const deltatime = timestamp - lastTime;
        lastTime = timestamp;
        game.update(deltatime);
        game.draw();
        requestAnimationFrame(animate);
    }
    animate(0);
});
