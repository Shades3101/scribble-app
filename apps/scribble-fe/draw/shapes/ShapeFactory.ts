import { Shape } from "./Shape";
import { Rect } from "./Rect";
import { Circle } from "./Circle";
import { ShapeDTO } from "./ShapesDTO";
import { Pencil } from "./Pencil";

export class ShapeFactory {
    static fromDTO(dto: ShapeDTO): Shape {
        switch (dto.type) {
            case "Rect":
                return new Rect(dto.x, dto.y, dto.width, dto.height);

            case "Circle":
                return new Circle(dto.centerX, dto.centerY, dto.radius);

            case "Pencil":
                return new Pencil(dto.points);

            default:
                throw new Error("Unknown ShapeDTO");
        }
    }
}
