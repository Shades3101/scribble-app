import { Camera } from "../camera/Camera";

export class Mouse {
    isClicked = false;

    startX = 0;
    startY = 0;

    x = 0;
    y = 0;

    worldX = 0;
    worldY = 0;

    constructor(private camera: Camera) {}

    update(e: MouseEvent, canvas: HTMLCanvasElement) {
        const rect = canvas.getBoundingClientRect();
        this.x = e.clientX - rect.left;
        this.y = e.clientY - rect.top;

        const world = this.camera.screenToWorld(this.x, this.y);
        this.worldX = world.x;
        this.worldY = world.y;
    }

    down(){
        this.isClicked = true;
        this.startX = this.worldX;
        this.startY = this.worldY;
    }

    up(){
        this.isClicked = false;
    }
}