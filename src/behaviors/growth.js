// src/behaviors/growth.js
export class GrowthBehavior {
    constructor() {
        this.growthRate = 0.1; // Adjust as needed
    }

    update(entity, deltaTime, gameState) {
        if (entity.growthStage < 2) {
            entity.growthStage += this.growthRate * deltaTime;
            if (entity.growthStage >= 2) {
                entity.growthStage = 2;
            }
        }
    }
}
