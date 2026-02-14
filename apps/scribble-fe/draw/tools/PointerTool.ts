import { Renderer } from "../renderer/Renderer";
import { Camera } from "../camera/Camera";
import { Shape } from "../shapes";
import { ToolInterface, ToolType } from "./ToolInterface";

export class PointerTool implements ToolInterface {
    type: ToolType = "pointer";

    //NOTE: this tool doesnt draw anything
    preview(renderer: Renderer, startX: number, startY: number, x: number, y: number) {
    }

    create(startX: number, startY: number, x: number, y: number) {
        return null;
    }

    handleMouseUp(existingShapes: Shape[], startX: number, startY: number, x: number, y: number) {
        return { shapes: existingShapes, newShape: null };
    }

    handleMouseMove(camera: Camera, isClicked: boolean, movementX: number, movementY: number): boolean {
        if (!isClicked) {
            return false;
        }

        camera.x += movementX;
        camera.y += movementY;
        return true;
    }
}
