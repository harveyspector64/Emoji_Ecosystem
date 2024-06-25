// src/systems/render-system.js
export class RenderSystem {
    constructor(ctx) {
        this.ctx = ctx;
    }

    render(entities) {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        
        for (let entity of entities) {
            this.ctx.font = '24px Arial';
            this.ctx.fillText(entity.emoji, entity.x, entity.y);
        }
        
        console.log(`Rendered ${entities.length} entities`); // Debug log
    }
}
