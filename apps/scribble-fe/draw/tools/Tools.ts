import { Renderer } from "../renderer/Renderer";
import { Shape } from "../shapes";


//heart of my system :)

export interface ToolInterface {
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

}