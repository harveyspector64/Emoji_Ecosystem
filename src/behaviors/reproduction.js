// src/behaviors/reproduction.js
export class ReproductionBehavior {
    constructor() {
        this.reproductionChance = 0.001; // Adjust as needed
    }

    update(entity, deltaTime, gameState) {
        if (entity.growthStage === 2 && entity.pollinationLevel > 50 && Math.random() < this.reproductionChance) {
            const offset = 30;
            const newX = entity.x + (Math.random() * 2 - 1) * offset;
            const newY = entity.y + (Math.random() * 2 - 1) * offset;
            
            const newFlower = new entity.constructor(newX, newY);
            gameState.addEntity(newFlower);
            
            entity.pollinationLevel -= 50;
        }
    }
}
