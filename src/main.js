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
    }

    setupInitialEntities() {
        for (let i = 0; i < 5; i++) {
            this.spawnEntity(Flower);
            this.spawnEntity(Butterfly);
        }
    }

    spawnEntity(EntityClass) {
        const entity = new EntityClass(
            Math.random() * this.canvas.width,
            Math.random() * this.canvas.height
        );
        this.addEntity(entity);
    }

    update(deltaTime) {
        super.update(deltaTime);
        // Additional game-specific update logic
    }

    render() {
        super.render();
        this.emojiPanel.render(this.ctx);
    }
}

// Create and start the game
const game = new EmojiEcosystemGame('game-canvas');
game.start();
