import { CircleTool } from "./CircleTool";
import { PencilTool } from "./PencilTool";
import { RectTool } from "./RectTool";
import { PointerTool } from "./PointerTool";

export const toolRegistry = {
    pointer: new PointerTool(),
    rect: new RectTool(),
    circle: new CircleTool(),
    pencil: new PencilTool()
}