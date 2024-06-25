// src/behaviors/behavior.js
export class Behavior {
    constructor(name) {
        this.name = name;
    }

    update(entity, deltaTime, gameState) {
        // To be implemented by subclasses
    }
}
