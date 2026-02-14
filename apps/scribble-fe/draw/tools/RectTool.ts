import { Renderer } from "../renderer/Renderer";
import { Camera } from "../camera/Camera";
import { Rect, Shape } from "../shapes";
import { ToolInterface, ToolType } from "./ToolInterface";

export class RectTool implements ToolInterface {
    type: ToolType = "rect";

    preview(renderer: Renderer, startX: number, startY: number, x: number, y: number) {
        const width = x - startX;
        const height = y - startY;

        renderer.previewRect(
            Math.min(startX, startX + width),
            Math.min(startY, startY + height),
            Math.abs(width),
            Math.abs(height)
        )
    }

    create(startX: number, startY: number, x: number, y: number) {
        const width = x - startX;
        const height = y - startY;

        return new Rect(
            Math.min(startX, startX + width),
            Math.min(startY, startY + height),
            Math.abs(width),
            Math.abs(height)
        )
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