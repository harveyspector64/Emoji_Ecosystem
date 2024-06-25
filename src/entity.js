// src/entity.js
export class Entity {
    constructor(x, y, emoji) {
        this.x = x;
        this.y = y;
        this.emoji = emoji;
    }

    update(deltaTime, gameState) {
        // To be implemented by subclasses
    }

    render(ctx) {
        ctx.font = '24px Arial';
        ctx.fillText(this.emoji, this.x, this.y);
    }
}
