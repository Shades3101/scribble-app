import { CircleTool } from "./CircleTool";
import { PencilTool } from "./PencilTool";
import { RectTool } from "./RectTool";

export const tools = {
    rect: new RectTool(),
    circle: new CircleTool(),
    pencil: new PencilTool()
}