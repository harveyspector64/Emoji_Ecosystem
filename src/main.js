// src/main.js
import { Game } from './game.js';
import { Flower } from './entities/flower.js';
import { Butterfly } from './entities/butterfly.js';
import { EmojiPanel } from './ui/emoji-panel.js';

class EmojiEcosystemGame extends Game {
    constructor(canvasId) {
        super(canvasId);
        console.log("EmojiEcosystemGame constructor called");
        this.emojiPanel = new EmojiPanel(10, 10, 100, 200);
        this.setupInitialEntities();
        this.setupEventListeners();
        console.log("Game initialized");
    }

    setupInitialEntities() {
        console.log("Setting up initial entities");
        for (let i = 0; i < 5; i++) {
            this.addEntity(new Flower(Math.random() * this.canvas.width, Math.random() * this.canvas.height));
            this.addEntity(new Butterfly(Math.random() * this.canvas.width, Math.random() * this.canvas.height));
        }
        console.log(`Initial entities created. Total: ${this.entities.length}`);
    }

    setupEventListeners() {
        console.log("Setting up event listeners");
        this.canvas.addEventListener('click', this.handleCanvasClick.bind(this));
    }

    handleCanvasClick(event) {
        console.log("Canvas clicked");
        const rect = this.canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const selectedEmoji = this.emojiPanel.getEmojiAt(x, y);
        if (selectedEmoji) {
            console.log(`Emoji selected: ${selectedEmoji}`);
            this.addEntityFromEmoji(selectedEmoji, x, y);
        }
    }

    addEntityFromEmoji(emoji, x, y) {
        console.log(`Adding entity from emoji: ${emoji} at (${x}, ${y})`);
        switch (emoji) {
            case '🌼':
                this.addEntity(new Flower(x, y));
                break;
            case '🦋':
                this.addEntity(new Butterfly(x, y));
                break;
        }
        console.log(`New entity added. Total: ${this.entities.length}`);
    }

    update(deltaTime) {
        super.update(deltaTime);
        console.log(`Updating ${this.entities.length} entities`);
    }

    render() {
        console.log("Render started");
        super.render();
        this.emojiPanel.render(this.ctx);
        console.log("Render complete");
    }
}

// Create and start the game
console.log("Creating game instance");
const game = new EmojiEcosystemGame('gameCanvas');
console.log("Starting game");
game.start();
