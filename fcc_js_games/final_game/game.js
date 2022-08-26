import { Player } from './player.js';
import { InputHandler } from './input.js';
import { Background } from './background.js';
import { FlyingEnemy, ClimbingEnemy, GroundEnemy }  from './enemies.js'
import { UI } from './UI.js'

export class Game {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.groundMargin = 50;
        this.speed = 0;
        this.maxSpeed = 5;
        this.debug = true;
        this.enemies = [];
        this.enemyTimer = 0;
        this.enemyInterval = 1000;
        this.score = 0;
        this.time = 0;
        this.maxTime = 30000;
        this.winningScore = 30;
        this.gameOver = false;

        this.fontColor = 'black'

        this.background = new Background(this); 
        this.player = new Player(this);
        this.input = new InputHandler(this);
        this.UI = new UI(this);

        this.player.currentState = this.player.states[0];
        this.player.currentState.enter();
        this.lives = 5;
        this.floatingMessages = [];

        this.particles = [];
        this.maxParticles = 50;
        this.collisions = [];

        
        
    }

    update(deltaTime){
        this.time += deltaTime;

        if (this.time > this.maxTime) this.gameOver = true;

        this.background.update();
        this.player.update(this.input.keys, deltaTime);
        // handleEnemies
        if (this.enemyTimer > this.enemyInterval){
            this.addEnemy();
            this.enemyTimer = 0;
        } else {
            this.enemyTimer += deltaTime;
        }
        this.enemies.forEach( enemy => enemy.update(deltaTime) );

        // handle messages
        this.floatingMessages.forEach(message => {
            message.update();
        });
        
        // handle particles
        this.particles.forEach( (particle, index) => particle.update() );
        if (this.particles.length > this.maxParticles) {
            this.particles.length = this.maxParticles;
        }

        // handle collision sprites
        this.collisions.forEach((collision, index) => {
            collision.update(deltaTime);
            
        });

        this.floatingMessages = this.floatingMessages.filter(message => !message.markedForDeletion);
        this.particles        = this.particles.filter(particle => !particle.markedForDeletion);
        this.enemies          = this.enemies.filter(enemy => !enemy.markedForDeletion);
        this.collisions       = this.collisions.filter(collision => !collision.markedForDeletion);
        
    }

    draw(context){
        this.background.draw(context)
        this.player.draw(context)
        this.enemies.forEach( enemy => {
            enemy.draw(context);
        });
        this.floatingMessages.forEach(message => {
            message.draw(context);
        });
        this.particles.forEach( particle => {
            particle.draw(context);
        });
        this.collisions.forEach( collision => {
            collision.draw(context);
        });
        this.UI.draw(context);
    }

    addEnemy() {
        if (this.speed > 0 && Math.random() < 0.5) this.enemies.push(new GroundEnemy(this));
        else if (this.speed > 0) this.enemies.push(new ClimbingEnemy(this));
        this.enemies.push(new FlyingEnemy(this) )
    }
}