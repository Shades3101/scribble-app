"use client"

import { initDraw } from "@/draw";
import { useEffect, useRef, useState } from "react";
import { IconButton } from "./IconButton";
import { Circle, Pencil, RectangleHorizontalIcon, MousePointer2, Type, Eraser, Share2, Download, Home } from "lucide-react";
import { Game } from "@/draw/Game";
import Link from "next/link";
import { motion } from "framer-motion";

export type Tool = "circle" | "pencil" | "rect";

export function Canvas({
    roomId,
    socket
}: {
    socket: WebSocket;
    roomId: string;
}) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [game, setGame] = useState<Game>();
    const [selectedTool, setSelectedTool] = useState<Tool>("pencil");

    useEffect(() => {
        game?.setTool(selectedTool);
    }, [selectedTool, game]);

    useEffect(() => {
        if (canvasRef.current) {
            const g = new Game(canvasRef.current, roomId, socket);
            setGame(g);

            const handleResize = () => {
                if (canvasRef.current) {
                    canvasRef.current.width = window.innerWidth;
                    canvasRef.current.height = window.innerHeight;
                }
            };

            window.addEventListener('resize', handleResize);

            return () => {
                g.destroy();
                window.removeEventListener('resize', handleResize);
            }
        }
    }, [canvasRef, roomId, socket]);

    return (
        <div className="h-screen w-full overflow-hidden bg-[#fafafa] relative selection:bg-blue-100">
            {/* Decorative Grid Background */}
            <div className="fixed inset-0 z-0 opacity-[0.03] pointer-events-none" 
                 style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
            
            <canvas 
                ref={canvasRef} 
                width={typeof window !== 'undefined' ? window.innerWidth : 1000} 
                height={typeof window !== 'undefined' ? window.innerHeight : 1000}
                className="relative z-10 touch-none"
            />
            
            <Topbar />
            <Toolbar setSelectedTool={setSelectedTool} selectedTool={selectedTool} />
            
            {/* Room Info Tag */}
            <div className="absolute bottom-6 left-6 z-20 hidden md:block">
                <div className="bg-white border-2 border-[#2c2c2c] px-4 py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rotate-1">
                    <p className="font-black uppercase italic text-xs tracking-tighter">
                        ROOM: <span className="text-blue-600">{roomId}</span>
                    </p>
                </div>
            </div>
        </div>
    );
}

function Topbar() {
    return (
        <div className="absolute top-6 left-6 right-6 z-20 flex items-center justify-between pointer-events-none">
            <div className="flex items-center gap-4 pointer-events-auto">
                <Link href="/workspace" className="p-2 bg-white border-2 border-[#2c2c2c] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all">
                    <Home className="w-5 h-5" />
                </Link>
                <div className="px-4 py-2 bg-white border-2 border-[#2c2c2c] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -rotate-1">
                    <span className="font-black uppercase italic tracking-tighter">Scribble.</span>
                </div>
            </div>

            <div className="flex items-center gap-3 pointer-events-auto">
                <button className="px-4 py-2 bg-white border-2 border-[#2c2c2c] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold uppercase text-[10px] tracking-widest hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center gap-2">
                    <Share2 className="w-3.5 h-3.5" />
                    Share
                </button>
                <button className="px-4 py-2 bg-[#2c2c2c] text-white border-2 border-[#2c2c2c] shadow-[4px_4px_0px_0px_rgba(59,130,246,1)] font-bold uppercase text-[10px] tracking-widest hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0px_0px_rgba(59,130,246,1)] transition-all flex items-center gap-2">
                    <Download className="w-3.5 h-3.5" />
                    Export
                </button>
            </div>
        </div>
    );
}

function Toolbar({ selectedTool, setSelectedTool }: {
    selectedTool: Tool,
    setSelectedTool: (s: Tool) => void
}) {
    return (
        <div className="absolute top-1/2 -translate-y-1/2 left-6 z-20">
            <motion.div 
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="flex flex-col gap-3 p-2 bg-white border-4 border-[#2c2c2c] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
            >
                <IconButton 
                    activated={false} 
                    icon={<MousePointer2 className="w-5 h-5" />} 
                    onClick={() => {}} 
                />
                <div className="h-[2px] bg-[#2c2c2c]/10 mx-2" />
                
                <IconButton 
                    activated={selectedTool === "pencil"} 
                    icon={<Pencil className="w-5 h-5" />} 
                    onClick={() => setSelectedTool("pencil")}
                />

                <IconButton 
                    activated={selectedTool === "rect"} 
                    icon={<RectangleHorizontalIcon className="w-5 h-5" />} 
                    onClick={() => setSelectedTool("rect")}
                />

                <IconButton 
                    activated={selectedTool === "circle"} 
                    icon={<Circle className="w-5 h-5" />} 
                    onClick={() => setSelectedTool("circle")}
                />
                
                <IconButton 
                    activated={false} 
                    icon={<Type className="w-5 h-5" />} 
                    onClick={() => {}} 
                />
                
                <div className="h-[2px] bg-[#2c2c2c]/10 mx-2" />
                
                <IconButton 
                    activated={false} 
                    icon={<Eraser className="w-5 h-5" />} 
                    onClick={() => {}} 
                />
            </motion.div>
        </div>
    );
}
