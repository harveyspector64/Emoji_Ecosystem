// entity.js

class Entity {
    constructor(x, y, emoji) {
        this.x = x;
        this.y = y;
        this.emoji = emoji;
    }

    update(deltaTime) {
        // To be implemented in subclasses
    }

    render(ctx) {
        ctx.font = '24px Arial';
        ctx.fillText(this.emoji, this.x, this.y);
    }

    reset() {
        this.x = 0;
        this.y = 0;
        this.emoji = '';
    }
}

export { Entity };
