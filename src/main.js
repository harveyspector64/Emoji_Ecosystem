// src/main.js
import { Game } from './game.js';
import { Flower } from './entities/flower.js';
import { Butterfly } from './entities/butterfly.js';
import { Tree } from './entities/tree.js';
import { EmojiPanel } from './ui/emoji-panel.js';

class EmojiEcosystemGame extends Game {
    constructor(canvasId) {
        super(canvasId);
        this.emojiPanel = new EmojiPanel(10, 10, 100, 200);
        this.setupInitialEntities();
        this.setupEventListeners();
    }

    setupInitialEntities() {
        for (let i = 0; i < 5; i++) {
            this.addEntity(new Flower(Math.random() * this.canvas.width, Math.random() * this.canvas.height));
            this.addEntity(new Butterfly(Math.random() * this.canvas.width, Math.random() * this.canvas.height));
        }
        for (let i = 0; i < 2; i++) {
            this.addEntity(new Tree(Math.random() * this.canvas.width, Math.random() * this.canvas.height));
        }
    }

    setupEventListeners() {
        this.canvas.addEventListener('click', this.handleCanvasClick.bind(this));
    }

    handleCanvasClick(event) {
        const rect = this.canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const selectedEmoji = this.emojiPanel.getEmojiAt(x, y);
        if (selectedEmoji) {
            this.addEntityFromEmoji(selectedEmoji, x, y);
        }
    }

    addEntityFromEmoji(emoji, x, y) {
        switch (emoji) {
            case '🌼':
                this.addEntity(new Flower(x, y));
                break;
            case '🦋':
                this.addEntity(new Butterfly(x, y));
                break;
            case '🌳':
                this.addEntity(new Tree(x, y));
                break;
            // Add cases for other entity types as they are implemented
        }
    }

    render() {
        super.render();
        this.emojiPanel.render(this.ctx);
    }
}

// Create and start the game
const game = new EmojiEcosystemGame('gameCanvas');
game.start();
