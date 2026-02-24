import { Shape } from "./Shape";

export class Triangle implements Shape {
    type: "Triangle" = "Triangle";

    constructor(
        public x1: number,
        public y1: number,
        public x2: number,
        public y2: number,
        public x3: number,
        public y3: number
    ) { }

    draw(ctx: CanvasRenderingContext2D, stroke: string): void {
        ctx.strokeStyle = stroke;
        ctx.beginPath();
        ctx.moveTo(this.x1, this.y1);
        ctx.lineTo(this.x2, this.y2);
        ctx.lineTo(this.x3, this.y3);
        ctx.closePath();
        ctx.stroke();
    }

    toJSON() {
        return {
            type: this.type,
            x1: this.x1,
            y1: this.y1,
            x2: this.x2,
            y2: this.y2,
            x3: this.x3,
            y3: this.y3,
        };
    }

    intersectsWithLine(x1: number, y1: number, x2: number, y2: number, threshold: number): boolean {
        const edges = [
            [this.x1, this.y1, this.x2, this.y2],
            [this.x2, this.y2, this.x3, this.y3],
            [this.x3, this.y3, this.x1, this.y1]
        ];

        for (const edge of edges) {
            if (this.lineSegmentDistance(x1, y1, x2, y2, edge[0], edge[1], edge[2], edge[3]) < threshold) {
                return true;
            }
        }

        return false;
    }

    private lineSegmentDistance(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, x4: number, y4: number): number {
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
