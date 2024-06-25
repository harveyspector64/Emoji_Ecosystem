// src/ui/emoji-panel.js

export class EmojiPanel {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.emojis = ['🌼', '🦋', '🌳', '🐦']; // Add more as needed
        this.emojiSize = 40;
        this.padding = 10;
    }

    render(ctx) {
        ctx.fillStyle = 'rgba(200, 200, 200, 0.8)';
        ctx.fillRect(this.x, this.y, this.width, this.height);

        ctx.font = `${this.emojiSize}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        for (let i = 0; i < this.emojis.length; i++) {
            const emojiX = this.x + this.padding + (this.emojiSize + this.padding) * (i % 2);
            const emojiY = this.y + this.padding + (this.emojiSize + this.padding) * Math.floor(i / 2);
            ctx.fillText(this.emojis[i], emojiX + this.emojiSize / 2, emojiY + this.emojiSize / 2);
        }
    }

    getEmojiAt(x, y) {
        for (let i = 0; i < this.emojis.length; i++) {
            const emojiX = this.x + this.padding + (this.emojiSize + this.padding) * (i % 2);
            const emojiY = this.y + this.padding + (this.emojiSize + this.padding) * Math.floor(i / 2);
            if (x >= emojiX && x <= emojiX + this.emojiSize &&
                y >= emojiY && y <= emojiY + this.emojiSize) {
                return this.emojis[i];
            }
        }
        return null;
    }
}
