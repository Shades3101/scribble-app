export type ShapeDTO = {
    type: "Rect";
    x: number;
    y: number;
    width: number;
    height: number;
} | {
    type: "Circle";
    centerX: number;
    centerY: number;
    radius: number;
} | {
    type: "Pencil";
    points: { x: number, y: number }[]
} | {
    type: "Triangle";
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    x3: number;
    y3: number;
};
