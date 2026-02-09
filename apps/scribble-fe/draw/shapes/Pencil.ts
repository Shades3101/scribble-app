import { Shape } from "./Shape";

export class Pencil implements Shape {
    type: "Pencil" = "Pencil";

    constructor(
        public points: { x: number, y: number }[]
    ) { }

    draw(ctx: CanvasRenderingContext2D, stroke: string) {
        if (this.points.length < 2) {
            return
        }

        ctx.strokeStyle = stroke;
        ctx.lineWidth = 2;
        ctx.lineCap = "round";

        ctx.beginPath();
        ctx.moveTo(this.points[0].x, this.points[0].y);

        for (let i = 1; i < this.points.length; i++) {
            ctx.lineTo(this.points[i].x, this.points[i].y);
        }

        ctx.stroke();
        ctx.closePath();
    }

    toJSON(): Record<string, any> {
        return {
            type: this.type,
            points: this.points
        }
    }

}