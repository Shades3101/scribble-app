export class Mouse {
    isClicked = false;

    startX = 0;
    startY = 0;

    x = 0;
    y = 0;

    update(e: MouseEvent, canvas: HTMLCanvasElement) {
        const rect = canvas.getBoundingClientRect();
        this.x = e.clientX - rect.left;
        this.y = e.clientY - rect.top;
    }

    down(){
        this.isClicked = true;
        this.startX = this.x;
        this.startY = this.y;
    }

    up(){
        this.isClicked = false;
    }
}