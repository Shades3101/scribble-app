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
    intersectsWithLine(x1: number, y1: number, x2: number, y2: number, threshold: number): boolean {
        const edges = [
            [this.x, this.y, this.x + this.width, this.y], // top
            [this.x + this.width, this.y, this.x + this.width, this.y + this.height], //right
            [this.x + this.width, this.y + this.height, this.x, this.y + this.height], //bottom
            [this.x, this.y + this.height, this.x, this.y] //left
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
