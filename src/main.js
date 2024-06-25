// src/main.js
import { Game } from './core/game.js';
import { Flower } from './entities/flower.js';
import { Butterfly } from './entities/butterfly.js';
import { EmojiPanel } from './ui/emoji-panel.js';

class EmojiEcosystemGame extends Game {
    constructor(canvasId) {
        super(canvasId);
        this.emojiPanel = new EmojiPanel(10, 10, 100, 200);
        this.setupInitialEntities();
        this.setupEventListeners();
        this.draggingEmoji = null;
    }

    setupInitialEntities() {
        for (let i = 0; i < 5; i++) {
            this.spawnEntity(Flower);
            this.spawnEntity(Butterfly);
        }
    }

    spawnEntity(EntityClass, x, y) {
        const entity = new EntityClass(
            x !== undefined ? x : Math.random() * this.canvas.width,
            y !== undefined ? y : Math.random() * this.canvas.height
        );
        this.addEntity(entity);
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

        const emoji = this.emojiPanel.getEmojiAt(x, y);
        if (emoji) {
            this.draggingEmoji = emoji;
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

            if (!this.emojiPanel.getEmojiAt(x, y)) {
                this.spawnEntityFromEmoji(this.draggingEmoji, x, y);
            }

            this.draggingEmoji = null;
        }
    }

    spawnEntityFromEmoji(emoji, x, y) {
        switch (emoji) {
            case '🌼':
                this.spawnEntity(Flower, x, y);
                break;
            case '🦋':
                this.spawnEntity(Butterfly, x, y);
                break;
            // Add cases for other entity types as they are implemented
        }
    }

    update(deltaTime) {
        super.update(deltaTime);
        // Additional game-specific update logic can be added here
    }

    render() {
        super.render();
        this.emojiPanel.render(this.ctx);

        if (this.draggingEmoji) {
            this.ctx.font = '40px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.fillText(this.draggingEmoji, this.dragX, this.dragY);
        }
    }
}

// Create and start the game
const game = new EmojiEcosystemGame('game-canvas');
game.start();
