// main.js

import { Game, ObjectPool } from './core.js';
import { Entity } from './entity.js';
import { Renderer } from './renderer.js';

class EmojiEcosystemGame extends Game {
    constructor(canvasId) {
        super(canvasId);
        this.renderer = new Renderer(this.canvas);
        this.flowerPool = new ObjectPool(Entity);
        this.butterflyPool = new ObjectPool(Entity);
        this.setupInitialEntities();
    }

    setupInitialEntities() {
        for (let i = 0; i < 20; i++) {
            this.spawnFlower();
            this.spawnButterfly();
        }
    }

    spawnFlower() {
        const flower = this.flowerPool.get();
        flower.x = Math.random() * this.canvas.width;
        flower.y = Math.random() * this.canvas.height;
        flower.emoji = '🌼';
        this.state.addEntity(flower);
    }

    spawnButterfly() {
        const butterfly = this.butterflyPool.get();
        butterfly.x = Math.random() * this.canvas.width;
        butterfly.y = Math.random() * this.canvas.height;
        butterfly.emoji = '🦋';
        butterfly.speed = 50 + Math.random() * 50; // pixels per second
        butterfly.direction = Math.random() * Math.PI * 2;
        butterfly.update = function(deltaTime) {
            this.x += Math.cos(this.direction) * this.speed * deltaTime;
            this.y += Math.sin(this.direction) * this.speed * deltaTime;
            if (Math.random() < 0.02) { // 2% chance to change direction each frame
                this.direction = Math.random() * Math.PI * 2;
            }
        };
        this.state.addEntity(butterfly);
    }

    update(deltaTime) {
        super.update(deltaTime);
        // Add game-specific update logic here
    }

    render() {
        this.renderer.render(this.state);
    }
}

// Create and start the game
const game = new EmojiEcosystemGame('gameCanvas');
game.start();

// Example of using the event system
game.on('update', (deltaTime) => {
    console.log(`Frame time: ${deltaTime.toFixed(3)} seconds`);
});
