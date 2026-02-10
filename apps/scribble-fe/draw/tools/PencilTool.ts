import { Renderer } from "../renderer/Renderer";
import { Pencil } from "../shapes/Pencil";
import { ToolInterface } from "./Tools";

export class PencilTool implements ToolInterface {

    private points : {x: number, y: number}[] = [] ; 

    preview(renderer: Renderer, startX: number, startY: number, x: number, y: number) {
        this.points.push({x, y})
        renderer.previewPencil(this.points);
    }

    create (startX: number, startY: number, x: number, y: number) {

        if(this.points.length < 2) {
            return null;
        }

        const pencil = new Pencil([...this.points]);
        this.points = [];

        return pencil

    }
}