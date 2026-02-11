import { Camera } from "../camera/Camera";
import { Shape } from "../shapes";

export class Renderer {

    constructor(
        private ctx: CanvasRenderingContext2D,
        private bgColor: string,
        private strokeColor: string,
        private camera: Camera
    ) { }


    setTheme(bg: string, stroke: string) {
        this.bgColor = bg,
            this.strokeColor = stroke
    }

    clear(width: number, height: number) {
        this.ctx.resetTransform();
        this.ctx.fillStyle = this.bgColor;
        this.ctx.clearRect(0, 0, width, height);
    }

    drawShapes(shapes: Shape[]) {
        this.camera.apply(this.ctx);

        for(const shape of shapes){
            shape.draw(this.ctx, this.strokeColor);
        }
    }

    previewRect(x: number, y: number, w: number, h: number) {
        this.ctx.strokeStyle = this.strokeColor;
        this.ctx.strokeRect(x, y, w, h);
    }

    previewCircle(centerX: number, centerY: number, radius: number) {
        this.ctx.strokeStyle = this.strokeColor;
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        this.ctx.stroke();
    }

    previewPencil(points: { x: number, y: number }[]) {
        if (points.length < 2) {
            return
        }

        this.ctx.strokeStyle = this.strokeColor;
        this.ctx.lineWidth = 2;
        this.ctx.lineCap = "round";

        this.ctx.beginPath();
        this.ctx.moveTo(points[0].x, points[0].y);

        for (let i = 1; i < points.length; i++) {
            this.ctx.lineTo(points[i].x, points[i].y);
        }

        this.ctx.stroke();
        this.ctx.closePath();
    }
}