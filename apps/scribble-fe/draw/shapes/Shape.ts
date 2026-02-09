export interface Shape {
    type: "Circle" | "Rect" | "Pencil";

    draw(ctx: CanvasRenderingContext2D, stroke: string): void;

    toJSON() :  Record <string, any>
}