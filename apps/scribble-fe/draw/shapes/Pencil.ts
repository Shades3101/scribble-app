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

    intersectsWithLine(x1: number, y1: number, x2: number, y2: number, threshold: number = 20): boolean {
        for (let i = 0; i < this.points.length - 1; i++) {
            const p1 = this.points[i];
            const p2 = this.points[i + 1];

            if (this.lineSegmentDistance(x1, y1, x2, y2, p1.x, p1.y, p2.x, p2.y) < threshold) {
                return true;
            }
        }
        return false;
    }

    private lineSegmentDistance(x1: number, y1: number, x2: number, y2: number,
        x3: number, y3: number, x4: number, y4: number): number {
            
        const pointToSegDist = (px: number, py: number, sx1: number, sy1: number, sx2: number, sy2: number) => {
            const dx = sx2 - sx1;
            const dy = sy2 - sy1;
            const len = dx * dx + dy * dy;

            if (len === 0) {
                return Math.sqrt((px - sx1) ** 2 + (py - sy1) ** 2);
            }

            const t = Math.max(0, Math.min(1, ((px - sx1) * dx + (py - sy1) * dy) / len));

            return Math.sqrt((px - (sx1 + t * dx)) ** 2 + (py - (sy1 + t * dy)) ** 2);
        };

        return Math.min(
            pointToSegDist(x1, y1, x3, y3, x4, y4),
            pointToSegDist(x2, y2, x3, y3, x4, y4),
            pointToSegDist(x3, y3, x1, y1, x2, y2),
            pointToSegDist(x4, y4, x1, y1, x2, y2)
        );
    }

}