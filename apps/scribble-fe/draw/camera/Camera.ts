export class Camera {
    x= 0;
    y= 0;
    zoom = 1;

    apply(ctx: CanvasRenderingContext2D) {
        ctx.setTransform(this.zoom, 0, 0, this.zoom, this.x, this.y);
        
    }

    screenToWorld(x: number, y: number) {
        return {
            x: (x- this.x) / this.zoom,
            y: (y- this.y) / this.zoom
        }
    };
}