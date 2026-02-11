import { ToolInterface } from "./tools/Tools";
import { getExistingShapes } from "./http";
import { Shape } from "./shapes";
import { Mouse } from "./mouse/Mouse";
import { Renderer } from "./renderer/Renderer";
import { toolRegistry } from "./tools";
import { SocketQueue } from "./SocketQueue";
import { ShapeFactory } from "./shapes/ShapeFactory";
import { Camera } from "./camera/Camera";
export class Game {

    private canvas: HTMLCanvasElement;

    private renderer: Renderer;

    private existingShapes: Shape[] = [];
    private roomId: string;
    socket: WebSocket;
    private socketQueue: SocketQueue;
    private currentTool: ToolInterface = toolRegistry.circle;
    private camera = new Camera();
    private mouse = new Mouse(this.camera);

    private bgColor: string = "#fafafa";
    private strokeColor: string = "#2c2c2c";

    constructor(canvas: HTMLCanvasElement, roomId: string, socket: WebSocket, isDark: boolean = false) {
        this.canvas = canvas;
        this.roomId = roomId;
        this.socket = socket;
        this.socketQueue = new SocketQueue(socket);
        this.bgColor = isDark ? "#09090b" : "#fafafa";
        this.strokeColor = isDark ? "#f4f4f5" : "#2c2c2c";
        const ctx = canvas.getContext("2d")!;
        this.renderer = new Renderer(ctx, this.bgColor, this.strokeColor, this.camera);

        this.init();
        this.initHandlers();
        this.initMouseHandlers();

    }

    destroy() {
        this.canvas.removeEventListener("mousedown", this.mouseDownHandler)

        this.canvas.removeEventListener("mouseup", this.mouseUpHandler)

        this.canvas.removeEventListener("mousemove", this.mouseMoveHandler)
    }

    setTool(tool: "circle" | "rect" | "pencil" | "pointer") {
        if (tool in toolRegistry) {
            this.currentTool = toolRegistry[tool as keyof typeof toolRegistry];
        }
    }

    setTheme(isDark: boolean) {
        this.bgColor = isDark ? "#09090b" : "#fafafa";
        this.strokeColor = isDark ? "#f4f4f5" : "#2c2c2c";
        this.renderer.setTheme(this.bgColor, this.strokeColor)
        this.clearCanvas();
    }

    async init() {

        if (!this.roomId.startsWith("guest_")) {
            try {
                const data = await getExistingShapes(this.roomId);
                this.existingShapes = data.map(ShapeFactory.fromDTO);
            } catch (error) {
                console.error("Failed to fetch existing shapes:", error);
                this.existingShapes = [];
            }
        }
        this.clearCanvas();

    }

    initHandlers() {
        this.socket.onmessage = (event) => {
            const message = JSON.parse(event.data);

            if (message.type === "chat") {

                const shape = ShapeFactory.fromDTO(message.message);
                this.existingShapes.push(shape);

                this.clearCanvas();
            }
        }
    }

    clearCanvas() {
        this.renderer.clear(this.canvas.width, this.canvas.height)
        this.renderer.drawShapes(this.existingShapes);
    }

    //TODO: Change e type : DONE
    mouseDownHandler = (e: MouseEvent) => {
        this.mouse.update(e, this.canvas);
        this.mouse.down();
    }

    mouseUpHandler = (e: MouseEvent) => {
        this.mouse.update(e, this.canvas);
        this.mouse.up();

        const shape = this.currentTool.create(
            this.mouse.startX,
            this.mouse.startY,
            this.mouse.worldX,
            this.mouse.worldY
        )

        if (!shape) {
            return
        }

        this.existingShapes.push(shape);
        this.clearCanvas();

        this.socketQueue.send({
            type: "chat",
            roomId: this.roomId,
            message: shape.toJSON()
        });
    }

    mouseMoveHandler = (e: MouseEvent) => {

        this.mouse.update(e, this.canvas);

        if (this.currentTool.type === "pointer" && this.mouse.isClicked) {
            this.camera.x += e.movementX;
            this.camera.y += e.movementY;
            this.clearCanvas();
            return;
        }


        if(!this.mouse.isClicked) {
            return
        }
        this.clearCanvas();

        this.currentTool.preview(
            this.renderer,
            this.mouse.startX,
            this.mouse.startY,
            this.mouse.worldX,
            this.mouse.worldY
        );
    }


    initMouseHandlers() {
        this.canvas.addEventListener("mousedown", this.mouseDownHandler)

        this.canvas.addEventListener("mouseup", this.mouseUpHandler)

        this.canvas.addEventListener("mousemove", this.mouseMoveHandler)
    }
}