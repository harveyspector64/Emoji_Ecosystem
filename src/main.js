// src/main.js
import { Game } from './game.js';
import { Flower } from './entities/flower.js';
import { Butterfly } from './entities/butterfly.js';
import { EmojiPanel } from './ui/emoji-panel.js';

class EmojiEcosystemGame extends Game {
    constructor(canvasId) {
        super(canvasId);
        this.emojiPanel = new EmojiPanel(10, 10, 100, 200);
        this.setupInitialEntities();
        this.setupEventListeners();
        console.log("Game initialized"); // Debug log
    }

    setupInitialEntities() {
        for (let i = 0; i < 5; i++) {
            this.addEntity(new Flower(Math.random() * this.canvas.width, Math.random() * this.canvas.height));
            this.addEntity(new Butterfly(Math.random() * this.canvas.width, Math.random() * this.canvas.height));
        }
        console.log(`Initial entities created. Total: ${this.entities.length}`); // Debug log
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
            // Add cases for other entity types as they are implemented
        }
        console.log(`New entity added. Total: ${this.entities.length}`); // Debug log
    }

    update(deltaTime) {
        super.update(deltaTime);
        console.log(`Updating ${this.entities.length} entities`); // Debug log
    }

    render() {
        super.render();
        this.emojiPanel.render(this.ctx);
        console.log("Render complete"); // Debug log
    }
}

// Create and start the game
const game = new EmojiEcosystemGame('gameCanvas');
game.start();
console.log("Game started"); // Debug log
