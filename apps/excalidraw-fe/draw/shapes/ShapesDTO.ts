export type ShapeDTO =  {
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
        points: {x:number, y:number}[]
    };
