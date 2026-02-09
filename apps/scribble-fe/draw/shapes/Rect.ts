import { Shape } from "./Shape";

export class Rect implements Shape {
    type: "Rect" = "Rect";

    constructor(
        public x: number,
        public y: number,
        public width: number,
        public height: number
    ) { }

    draw(ctx: CanvasRenderingContext2D, stroke: string) {
        ctx.strokeStyle = stroke;
        ctx.strokeRect(this.x, this.y, this.width, this.height)
    }

    toJSON() {
        return {
            type: this.type,
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height
        }


    }
}