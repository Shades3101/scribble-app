import { Renderer } from "../renderer/Renderer";
import { Rect } from "../shapes";
import { Tool } from "./Tools";

export class RectTool implements Tool {
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


}