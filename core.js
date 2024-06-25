// core.js

class EventEmitter {
    constructor() {
        this.events = {};
    }

    on(eventName, callback) {
        if (!this.events[eventName]) {
            this.events[eventName] = [];
        }
        this.events[eventName].push(callback);
    }

    emit(eventName, data) {
        const eventCallbacks = this.events[eventName];
        if (eventCallbacks) {
            eventCallbacks.forEach(callback => callback(data));
        }
    }
}

class ObjectPool {
    constructor(objectType, initialSize = 100) {
        this.objectType = objectType;
        this.pool = [];
        this.grow(initialSize);
    }

    grow(size) {
        for (let i = 0; i < size; i++) {
            this.pool.push(new this.objectType());
        }
    }

    get() {
        if (this.pool.length === 0) {
            this.grow(Math.floor(this.pool.length * 0.2) + 1);
        }
        return this.pool.pop();
    }

    release(object) {
        object.reset();
        this.pool.push(object);
    }
}

class GameState {
    constructor() {
        this.entities = new Set();
        this.time = 0;
    }

    addEntity(entity) {
        this.entities.add(entity);
    }

    removeEntity(entity) {
        this.entities.delete(entity);
    }

    update(deltaTime) {
        this.time += deltaTime;
        for (let entity of this.entities) {
            entity.update(deltaTime);
        }
    }
}

class Game extends EventEmitter {
    constructor(canvasId) {
        super();
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.state = new GameState();
        this.lastTimestamp = 0;
        this.running = false;
    }

    start() {
        this.running = true;
        this.lastTimestamp = performance.now();
        requestAnimationFrame(this.gameLoop.bind(this));
    }

    stop() {
        this.running = false;
    }

    gameLoop(timestamp) {
        if (!this.running) return;

        const deltaTime = (timestamp - this.lastTimestamp) / 1000;
        this.lastTimestamp = timestamp;

        this.update(deltaTime);
        this.render();

        requestAnimationFrame(this.gameLoop.bind(this));
    }

    update(deltaTime) {
        this.state.update(deltaTime);
        this.emit('update', deltaTime);
    }

    render() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (let entity of this.state.entities) {
            entity.render(this.ctx);
        }
        this.emit('render');
    }
}

// Export the classes so they can be used in other modules
export { Game, GameState, ObjectPool, EventEmitter };
