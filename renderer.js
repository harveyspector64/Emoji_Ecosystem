// renderer.js

class Renderer {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.layers = {
            background: document.createElement('canvas'),
            entities: document.createElement('canvas'),
            ui: document.createElement('canvas')
        };
        this.layerCtx = {};
        
        for (let layer in this.layers) {
            this.layers[layer].width = canvas.width;
            this.layers[layer].height = canvas.height;
            this.layerCtx[layer] = this.layers[layer].getContext('2d');
        }

        this.camera = {
            x: 0,
            y: 0,
            zoom: 1
        };
    }

    clear() {
        for (let layer in this.layerCtx) {
            this.layerCtx[layer].clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
    }

    render(gameState) {
        this.clear();

        // Render background
        this.renderBackground(gameState);

        // Render entities
        this.ctx.save();
        this.ctx.translate(-this.camera.x, -this.camera.y);
        this.ctx.scale(this.camera.zoom, this.camera.zoom);

        for (let entity of gameState.entities) {
            if (this.isVisible(entity)) {
                entity.render(this.layerCtx.entities);
            }
        }

        this.ctx.restore();

        // Render UI
        this.renderUI(gameState);

        // Composite all layers
        this.ctx.drawImage(this.layers.background, 0, 0);
        this.ctx.drawImage(this.layers.entities, 0, 0);
        this.ctx.drawImage(this.layers.ui, 0, 0);
    }

    renderBackground(gameState) {
        const ctx = this.layerCtx.background;
        // Implement background rendering here
        // This could include grid lines, terrain, etc.
    }

    renderUI(gameState) {
        const ctx = this.layerCtx.ui;
        // Implement UI rendering here
        // This could include the emoji panel, game stats, etc.
    }

    isVisible(entity) {
        // Check if the entity is within the camera's view
        const screenX = (entity.x - this.camera.x) * this.camera.zoom;
        const screenY = (entity.y - this.camera.y) * this.camera.zoom;
        return screenX >= 0 && screenX <= this.canvas.width &&
               screenY >= 0 && screenY <= this.canvas.height;
    }

    setCamera(x, y, zoom) {
        this.camera.x = x;
        this.camera.y = y;
        this.camera.zoom = zoom;
    }
}

export { Renderer };
