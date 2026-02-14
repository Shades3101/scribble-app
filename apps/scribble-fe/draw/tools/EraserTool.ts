import { Renderer } from "../renderer/Renderer";
import { Camera } from "../camera/Camera";
import { Shape } from "../shapes";
import { ToolInterface, ToolType } from "./ToolInterface";

export class EraserTool implements ToolInterface {
    type: ToolType = "eraser";

    private eraserPath: { x: number, y: number }[] = [];

    preview(renderer: Renderer, startX: number, startY: number, x: number, y: number): void {
        this.eraserPath.push({ x, y });

        renderer.previewEraser(this.eraserPath);
    }

    create(startX: number, startY: number, x: number, y: number): null {
        this.eraserPath = [];
        return null
    }

    handleMouseUp(existingShapes: Shape[], startX: number, startY: number, x: number, y: number) {
        const threshold = 20;

        const filteredShapes = existingShapes.filter(shape => {
            for (let i = 0; i < this.eraserPath.length - 1; i++) {
                if (shape.intersectsWithLine(
                    this.eraserPath[i].x, this.eraserPath[i].y,
                    this.eraserPath[i + 1].x, this.eraserPath[i + 1].y,
                    threshold
                )) {
                    return false; // Remove this shape
                }
            }
            return true; // Keep this shape
        });

        this.clearPath();

        return {
            shapes: filteredShapes,
            newShape: null
        };
    }

    getEraserPath() {
        return this.eraserPath;
    }

    clearPath() {
        this.eraserPath = []
    }

    handleMouseMove(camera: Camera, isClicked: boolean, movementX: number, movementY: number): boolean {
        if (!isClicked) {
            return false;
        }
        return true;
    }
}