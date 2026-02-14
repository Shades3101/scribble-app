import { Renderer } from "../renderer/Renderer";
import { Camera } from "../camera/Camera";
import { Pencil } from "../shapes/Pencil";
import { Shape } from "../shapes";
import { ToolInterface, ToolType } from "./ToolInterface";

export class PencilTool implements ToolInterface {
    type: ToolType = "pencil";


    private points: { x: number, y: number }[] = [];

    preview(renderer: Renderer, startX: number, startY: number, x: number, y: number) {
        this.points.push({ x, y })
        renderer.previewPencil(this.points);
    }

    create(startX: number, startY: number, x: number, y: number) {

        if (this.points.length < 2) {
            return null;
        }

        const pencil = new Pencil([...this.points]);
        this.points = [];

        return pencil

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