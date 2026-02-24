import { Renderer } from "../renderer/Renderer";
import { Camera } from "../camera/Camera";
import { Triangle, Shape } from "../shapes";
import { ToolInterface, ToolType } from "./ToolInterface";

export class TriangleTool implements ToolInterface {
    type: ToolType = "triangle" as any; // Using 'any' since ToolType update comes later or via Game

    preview(renderer: Renderer, startX: number, startY: number, x: number, y: number) {
        const { x1, y1, x2, y2, x3, y3 } = this.calculateVertices(startX, startY, x, y);
        renderer.previewTriangle(x1, y1, x2, y2, x3, y3);
    }

    create(startX: number, startY: number, x: number, y: number) {
        const { x1, y1, x2, y2, x3, y3 } = this.calculateVertices(startX, startY, x, y);
        return new Triangle(x1, y1, x2, y2, x3, y3);
    }

    handleMouseUp(existingShapes: Shape[], startX: number, startY: number, x: number, y: number) {
        const newShape = this.create(startX, startY, x, y);
        return {
            shapes: existingShapes,
            newShape
        };
    }

    handleMouseMove(camera: Camera, isClicked: boolean, movementX: number, movementY: number): boolean {
        return isClicked;
    }

    private calculateVertices(startX: number, startY: number, x: number, y: number) {
        // Isosceles triangle within the bounding box
        const topX = startX + (x - startX) / 2;
        const topY = startY;
        const bottomY = y;

        return {
            x1: topX, y1: topY,
            x2: startX, y2: bottomY,
            x3: x, y3: bottomY
        };
    }
}
