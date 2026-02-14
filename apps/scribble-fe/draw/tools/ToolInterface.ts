import { Renderer } from "../renderer/Renderer";
import { Camera } from "../camera/Camera";
import { Shape } from "../shapes";


//heart of my system :)

export type ToolType = "circle" | "rect" | "pencil" | "pointer" | "eraser";

export interface ToolInterface {
    type: ToolType;

    preview(
        renderer: Renderer,
        startX: number,
        startY: number,
        x: number,
        y: number
    ): void;

    create(
        startX: number,
        startY: number,
        x: number,
        y: number
    ): Shape | null;

    handleMouseUp(
        existingShapes: Shape[],
        startX: number,
        startY: number,
        x: number,
        y: number
    ): { shapes: Shape[], newShape: Shape | null };

    handleMouseMove(
        camera: Camera,
        isClicked: boolean,
        movementX: number,
        movementY: number
    ): boolean; // returns true if canvas needs redraw

}