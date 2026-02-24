import { Shape } from "./Shape";
import { Rect } from "./Rect";
import { Circle } from "./Circle";
import { ShapeDTO } from "./ShapesDTO";
import { Pencil } from "./Pencil";
import { Triangle } from "./Triangle";

export class ShapeFactory {
    static fromDTO(dto: ShapeDTO): Shape {
        switch (dto.type) {
            case "Rect":
                return new Rect(dto.x, dto.y, dto.width, dto.height);

            case "Circle":
                return new Circle(dto.centerX, dto.centerY, dto.radius);

            case "Pencil":
                return new Pencil(dto.points);

            case "Triangle":
                return new Triangle(dto.x1, dto.y1, dto.x2, dto.y2, dto.x3, dto.y3);

            default:
                throw new Error("Unknown ShapeDTO");
        }
    }
}
