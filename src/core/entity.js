// src/core/entity.js
export class Entity {
    constructor(x, y, emoji) {
        this.x = x;
        this.y = y;
        this.emoji = emoji;
        this.behaviors = [];
    }

    update(deltaTime, gameState) {
        for (let behavior of this.behaviors) {
            behavior.update(this, deltaTime, gameState);
        }
    }

    render(ctx) {
        ctx.font = '24px Arial';
        ctx.fillText(this.emoji, this.x, this.y);
    }

    addBehavior(behavior) {
        this.behaviors.push(behavior);
    }
}

// src/entities/flower.js
import { Entity } from '../core/entity.js';
import { ReproductionBehavior } from '../behaviors/reproduction.js';

export class Flower extends Entity {
    constructor(x, y) {
        super(x, y, '🌼');
        this.pollinationLevel = 0;
        this.addBehavior(new ReproductionBehavior());
    }
}

// src/entities/butterfly.js
import { Entity } from '../core/entity.js';
import { MovementBehavior } from '../behaviors/movement.js';
import { FeedingBehavior } from '../behaviors/feeding.js';

export class Butterfly extends Entity {
    constructor(x, y) {
        super(x, y, '🦋');
        this.energy = 100;
        this.addBehavior(new MovementBehavior());
        this.addBehavior(new FeedingBehavior());
    }
}

// Additional entity files (tree.js, bird.js) would follow a similar pattern
