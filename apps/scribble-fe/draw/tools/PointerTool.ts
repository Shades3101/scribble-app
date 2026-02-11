import { Renderer } from "../renderer/Renderer";
import { ToolInterface, ToolType } from "./Tools";

export class PointerTool implements ToolInterface {
    type: ToolType = "pointer";

    //NOTE: this tool doesnt draw anything
    preview(renderer: Renderer, startX: number, startY: number, x: number, y: number) {
    }

    create(startX: number, startY: number, x: number, y: number) {
        return null;
    }
}
