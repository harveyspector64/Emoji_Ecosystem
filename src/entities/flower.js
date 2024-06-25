// src/entities/flower.js
import { Entity } from '../core/entity.js';
import { GrowthBehavior } from '../behaviors/growth.js';
import { ReproductionBehavior } from '../behaviors/reproduction.js';

export class Flower extends Entity {
    constructor(x, y) {
        super(x, y, '🌱'); // Start as a seedling
        this.growthStage = 0; // 0: seedling, 1: budding, 2: blooming
        this.pollinationLevel = 0;
        this.health = 100;
        this.age = 0;
        this.lifespan = 300; // 5 minutes

        this.addBehavior(new GrowthBehavior());
        this.addBehavior(new ReproductionBehavior());
    }

    update(deltaTime, gameState) {
        super.update(deltaTime, gameState);
        
        this.age += deltaTime;
        if (this.age >= this.lifespan) {
            gameState.removeEntity(this);
        }

        // Update emoji based on growth stage
        if (this.growthStage === 1) {
            this.emoji = '🌿'; // Budding
        } else if (this.growthStage === 2) {
            this.emoji = '🌼'; // Blooming
        }
    }
}
