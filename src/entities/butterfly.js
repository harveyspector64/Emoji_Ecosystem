// src/entities/butterfly.js
import { Entity } from '../entity.js';

export class Butterfly extends Entity {
    constructor(x, y) {
        super(x, y, '🦋');
        this.energy = 100;
        this.lifespan = 180; // 3 minutes
        this.age = 0;
        this.speed = 50 + Math.random() * 50;
        this.state = 'wandering';
        this.direction = Math.random() * Math.PI * 2;
    }

    update(deltaTime, gameState) {
        this.age += deltaTime;
        this.energy -= deltaTime * 5;

        if (this.age >= this.lifespan || this.energy <= 0) {
            gameState.removeEntity(this);
            return;
        }

        switch (this.state) {
            case 'wandering':
                this.wander(deltaTime);
                if (this.energy < 50) {
                    this.state = 'seeking_flower';
                }
                break;
            case 'seeking_flower':
                this.seekFlower(gameState);
                break;
            case 'feeding':
                this.feed();
                break;
        }
    }

    wander(deltaTime) {
        this.x += Math.cos(this.direction) * this.speed * deltaTime;
        this.y += Math.sin(this.direction) * this.speed * deltaTime;

        if (Math.random() < 0.02) {
            this.direction = Math.random() * Math.PI * 2;
        }

        // Wrap around screen edges
        this.x = (this.x + gameState.width) % gameState.width;
        this.y = (this.y + gameState.height) % gameState.height;
    }

    seekFlower(gameState) {
        const nearestFlower = this.findNearestFlower(gameState);
        if (nearestFlower) {
            if (this.distanceTo(nearestFlower) < 10) {
                this.state = 'feeding';
                this.feedingTarget = nearestFlower;
            } else {
                this.moveTowards(nearestFlower);
            }
        } else {
            this.state = 'wandering';
        }
    }

    feed() {
        if (this.feedingTarget && this.feedingTarget.canBePolinated()) {
            this.energy += 20;
            this.feedingTarget.pollinate(10);
            if (this.energy >= 80) {
                this.state = 'wandering';
                this.feedingTarget = null;
            }
        } else {
            this.state = 'wandering';
            this.feedingTarget = null;
        }
    }

    findNearestFlower(gameState) {
        // Implementation to find the nearest flower
    }

    distanceTo(entity) {
        const dx = entity.x - this.x;
        const dy = entity.y - this.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    moveTowards(entity) {
        const dx = entity.x - this.x;
        const dy = entity.y - this.y;
        this.direction = Math.atan2(dy, dx);
    }
}
