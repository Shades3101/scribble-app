import { Renderer } from "../renderer/Renderer";
import { Circle, Shape } from "../shapes";
import { Tool } from "./Tools";

export class CircleTool implements Tool{

    preview(renderer: Renderer, startX: number, startY: number, x: number, y: number) {
        const radius = Math.max( Math.abs( x - startX ), Math.abs( y - startY )) / 2;
        
        renderer.previewCircle(
            startX + (x-startX) / 2 ,
            startY + (y-startY) / 2,
            radius
        );
    }

    create(startX: number, startY: number, x: number, y: number) {
        const radius = Math.max( Math.abs( x - startX ), Math.abs( y - startY )) / 2;
        
        return new Circle(
            startX + (x-startX) / 2 ,
            startY + (y-startY) / 2,
            radius
        );
    }
}