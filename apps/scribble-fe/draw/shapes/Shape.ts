export interface Shape {
    type: string;

    draw(ctx: CanvasRenderingContext2D, stroke: string): void;

    toJSON() :  Record <string, any>

    intersectsWithLine(x1: number, y1: number, x2: number, y2: number, threshold: number): boolean;
}