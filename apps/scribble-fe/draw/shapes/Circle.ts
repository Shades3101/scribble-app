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
}