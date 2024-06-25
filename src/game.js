// src/game.js
import { RenderSystem } from './systems/render-system.js';

export class Game {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.entities = [];
        this.renderSystem = new RenderSystem(this.ctx);
        this.lastTimestamp = 0;
    }

    addEntity(entity) {
        this.entities.push(entity);
    }

    removeEntity(entity) {
        const index = this.entities.indexOf(entity);
        if (index > -1) {
            this.entities.splice(index, 1);
        }
    }

    update(deltaTime) {
        for (let entity of this.entities) {
            entity.update(deltaTime, this);
        }
    }

    render() {
        this.renderSystem.render(this.entities);
    }

    gameLoop(timestamp) {
        const deltaTime = (timestamp - this.lastTimestamp) / 1000;
        this.lastTimestamp = timestamp;

        this.update(deltaTime);
        this.render();

        requestAnimationFrame(this.gameLoop.bind(this));
    }

    start() {
        console.log("Game loop starting"); // Debug log
        this.lastTimestamp = performance.now();
        requestAnimationFrame(this.gameLoop.bind(this));
    }
}
