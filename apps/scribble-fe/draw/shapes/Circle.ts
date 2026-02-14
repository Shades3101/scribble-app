import { Shape } from "./Shape";

export class Circle implements Shape {

    type: "Circle" = "Circle"

    constructor(
        public centerX: number,
        public centerY: number,
        public radius: number

    ) { }

    draw(ctx: CanvasRenderingContext2D, stroke: string) {
        ctx.strokeStyle = stroke;
        ctx.beginPath();
        ctx.arc(this.centerX, this.centerY, Math.abs(this.radius), 0, Math.PI * 2);
        ctx.stroke();
        ctx.closePath();
    }

    toJSON() {
        return {
            type: this.type,
            centerX: this.centerX,
            centerY: this.centerY,
            radius: this.radius
        
        }
    }

    intersectsWithLine(x1: number, y1: number, x2: number, y2: number, threshold: number): boolean {
        const dx = x2 - x1;
        const dy = y2 - y1;
        const len = Math.sqrt(dx * dx + dy * dy);

        if(len === 0) {
            const dist = Math.sqrt(( x1 - this.centerX) ** 2 + (y1 - this.centerY) ** 2);
            return Math.abs(dist - this.radius) < threshold;
        }

        const t = Math.max(0, Math.min(1,
            ((this.centerX - x1) * dx + (this.centerY - y1) * dy) / (len * len)
        ));

        const nearestX = x1 + t *dx;
        const nearestY = y1 + t *dy;
        const dist = Math.sqrt((nearestX - this.centerX) ** 2  + (nearestY-this.centerY) ** 2);

        return Math.abs(dist - this.radius) < threshold;
    }
}