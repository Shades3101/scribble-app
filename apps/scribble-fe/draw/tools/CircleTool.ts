import { Renderer } from "../renderer/Renderer";
import { Camera } from "../camera/Camera";
import { Circle, Shape } from "../shapes";
import { ToolInterface, ToolType } from "./ToolInterface";

export class CircleTool implements ToolInterface {
    type: ToolType = "circle";


    preview(renderer: Renderer, startX: number, startY: number, x: number, y: number) {
        const radius = Math.max(Math.abs(x - startX), Math.abs(y - startY)) / 2;

        renderer.previewCircle(
            startX + (x - startX) / 2,
            startY + (y - startY) / 2,
            radius
        );
    }

    create(startX: number, startY: number, x: number, y: number) {
        const radius = Math.max(Math.abs(x - startX), Math.abs(y - startY)) / 2;

        return new Circle(
            startX + (x - startX) / 2,
            startY + (y - startY) / 2,
            radius
        );
    }

    handleMouseUp(existingShapes: Shape[], startX: number, startY: number, x: number, y: number) {
        const newShape = this.create(startX, startY, x, y);
        
        return {
            shapes: existingShapes,
            newShape
        };
    }

    handleMouseMove(camera: Camera, isClicked: boolean, movementX: number, movementY: number): boolean {
        if (!isClicked) {
            return false;
        }

        return true;
    }
}