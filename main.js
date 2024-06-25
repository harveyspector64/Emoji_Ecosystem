// main.js

import { Game, ObjectPool } from './core.js';
import { Entity } from './entity.js';
import { Renderer } from './renderer.js';
import { EmojiPanel } from './ui.js';

class EmojiEcosystemGame extends Game {
    constructor(canvasId) {
        super(canvasId);
        this.renderer = new Renderer(this.canvas);
        this.emojiPanel = new EmojiPanel(10, 10, 100, 200);
        this.flowerPool = new ObjectPool(Entity);
        this.butterflyPool = new ObjectPool(Entity);
        this.treePool = new ObjectPool(Entity);
        this.birdPool = new ObjectPool(Entity);
        this.setupInitialEntities();
        this.setupEventListeners();
        this.draggingEmoji = null;
    }

    setupInitialEntities() {
        for (let i = 0; i < 5; i++) {
            this.spawnEntity('🌼');
            this.spawnEntity('🦋');
        }
    }

    spawnEntity(emoji) {
        let entity;
        switch (emoji) {
            case '🌼':
                entity = this.flowerPool.get();
                break;
            case '🦋':
                entity = this.butterflyPool.get();
                entity.speed = 50 + Math.random() * 50;
                entity.direction = Math.random() * Math.PI * 2;
                break;
            case '🌳':
                entity = this.treePool.get();
                break;
            case '🐦':
                entity = this.birdPool.get();
                entity.speed = 100 + Math.random() * 50;
                entity.direction = Math.random() * Math.PI * 2;
                break;
            default:
                return;
        }
        entity.x = Math.random() * this.canvas.width;
        entity.y = Math.random() * this.canvas.height;
        entity.emoji = emoji;
        this.state.addEntity(entity);
    }

    setupEventListeners() {
        this.canvas.addEventListener('mousedown', this.handleMouseDown.bind(this));
        this.canvas.addEventListener('mousemove', this.handleMouseMove.bind(this));
        this.canvas.addEventListener('mouseup', this.handleMouseUp.bind(this));
    }

    handleMouseDown(event) {
        const rect = this.canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        if (this.emojiPanel.isPointInside(x, y)) {
            this.draggingEmoji = this.emojiPanel.getEmojiAt(x, y);
        }
    }

    handleMouseMove(event) {
        if (this.draggingEmoji) {
            const rect = this.canvas.getBoundingClientRect();
            this.dragX = event.clientX - rect.left;
            this.dragY = event.clientY - rect.top;
        }
    }

    handleMouseUp(event) {
        if (this.draggingEmoji) {
            const rect = this.canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            if (!this.emojiPanel.isPointInside(x, y)) {
                this.spawnEntityAt(this.draggingEmoji, x, y);
            }

            this.draggingEmoji = null;
        }
    }

    spawnEntityAt(emoji, x, y) {
        let entity;
        switch (emoji) {
            case '🌼':
                entity = this.flowerPool.get();
                break;
            case '🦋':
                entity = this.butterflyPool.get();
                entity.speed = 50 + Math.random() * 50;
                entity.direction = Math.random() * Math.PI * 2;
                break;
            case '🌳':
                entity = this.treePool.get();
                break;
            case '🐦':
                entity = this.birdPool.get();
                entity.speed = 100 + Math.random() * 50;
                entity.direction = Math.random() * Math.PI * 2;
                break;
            default:
                return;
        }
        entity.x = x;
        entity.y = y;
        entity.emoji = emoji;
        this.state.addEntity(entity);
    }

    update(deltaTime) {
        super.update(deltaTime);
        for (let entity of this.state.entities) {
            if (entity.update) {
                entity.update(deltaTime);
            }
        }
    }

    render() {
        this.renderer.render(this.state);
        this.emojiPanel.render(this.renderer.layerCtx.ui);

        if (this.draggingEmoji) {
            const ctx = this.renderer.layerCtx.ui;
            ctx.font = '40px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(this.draggingEmoji, this.dragX, this.dragY);
        }
    }
}

// Create and start the game
const game = new EmojiEcosystemGame('gameCanvas');
game.start();
