import { initDraw } from "@/draw";
import { useEffect, useRef, useState } from "react";
import { IconButton } from "./IconButton";
import { Circle, Pencil, RectangleHorizontalIcon } from "lucide-react";
import { Game } from "@/draw/Game";

export type Tool = "circle" | "pencil" | "rect";

export function Canvas({
    roomId,
    socket
} : {
    socket: WebSocket;
    roomId: string;
}) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [game , setGame] = useState<Game>();
    const [selectedTool, setSelectedTool] = useState<Tool>("circle");

    useEffect(() => {
       game?.setTool(selectedTool);

    }, [selectedTool, game]);

    useEffect(() => {

        if(canvasRef.current) {
                const g = new Game(canvasRef.current, roomId, socket);
                setGame(g);

                return () => {
                g.destroy();
            }
        } 
    }, [canvasRef]);

    return <div>
        <canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight}></canvas>
        <Topbar setSelectedTool = {setSelectedTool} selectedTool={selectedTool} />
    </div>
}

function Topbar({selectedTool, setSelectedTool} : {
    selectedTool: Tool,
    setSelectedTool: (s: Tool) => void
}) {

    return <div className ="absolute top-5 left-5 ">
            <div className ="flex gap-2">
                <IconButton activated = { selectedTool === "pencil" } icon = {<Pencil />} onClick={() => {
                    setSelectedTool("pencil");
                }}></IconButton>

                <IconButton activated = { selectedTool === "rect" } icon = {<RectangleHorizontalIcon />} onClick={() => {
                    setSelectedTool("rect")
                }}></IconButton>

                <IconButton activated ={ selectedTool === "circle" } icon = {<Circle/>} onClick={() => {
                    setSelectedTool("circle")
                }}></IconButton>
            </div>
        </div>
}