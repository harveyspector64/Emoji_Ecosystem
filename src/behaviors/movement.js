// src/behaviors/movement.js

export class MovementBehavior {
    constructor(speed) {
        this.speed = speed;
        this.direction = Math.random() * Math.PI * 2;
        this.changeDirectionChance = 0.02;
    }

    update(entity, deltaTime, gameState) {
        entity.x += Math.cos(this.direction) * this.speed * deltaTime;
        entity.y += Math.sin(this.direction) * this.speed * deltaTime;

        // Wrap around screen edges
        entity.x = (entity.x + gameState.width) % gameState.width;
        entity.y = (entity.y + gameState.height) % gameState.height;

        // Randomly change direction
        if (Math.random() < this.changeDirectionChance) {
            this.direction = Math.random() * Math.PI * 2;
        }
    }
}

// src/behaviors/reproduction.js
export class ReproductionBehavior {
    update(entity, deltaTime, gameState) {
        if (entity.pollinationLevel > 50 && Math.random() < 0.001) {
            const offset = 30;
            const newX = entity.x + (Math.random() * 2 - 1) * offset;
            const newY = entity.y + (Math.random() * 2 - 1) * offset;
            gameState.addEntity(new entity.constructor(newX, newY));
            entity.pollinationLevel -= 50;
        }
    }
}

// src/behaviors/feeding.js
export class FeedingBehavior {
    update(entity, deltaTime, gameState) {
        entity.energy -= deltaTime * 2;

        if (entity.energy < 50) {
            const nearestFlower = this.findNearestFlower(entity, gameState);
            if (nearestFlower && this.distanceTo(entity, nearestFlower) < 10) {
                entity.energy += 20;
                nearestFlower.pollinationLevel += 10;
            }
        }
    }

    findNearestFlower(entity, gameState) {
        // Implementation of finding nearest flower
    }

    distanceTo(entity1, entity2) {
        const dx = entity2.x - entity1.x;
        const dy = entity2.y - entity1.y;
        return Math.sqrt(dx * dx + dy * dy);
    }
}
