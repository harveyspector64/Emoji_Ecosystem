// src/entities/butterfly.js
import { Entity } from '../core/entity.js';
import { MovementBehavior } from '../behaviors/movement.js';

export class Butterfly extends Entity {
    constructor(x, y) {
        super(x, y, '🦋');
        this.energy = 100;
        this.lifespan = 180; // 3 minutes
        this.age = 0;
        this.speed = 50 + Math.random() * 50; // Random speed between 50 and 100

        this.addBehavior(new MovementBehavior(this.speed));
    }

    update(deltaTime, gameState) {
        super.update(deltaTime, gameState);

        this.age += deltaTime;
        this.energy -= deltaTime * 5; // Butterflies consume energy over time

        if (this.age >= this.lifespan || this.energy <= 0) {
            gameState.removeEntity(this);
        }
    }
}
