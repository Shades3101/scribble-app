"use client"

import { useEffect, useRef, useState } from "react";
import { IconButton } from "./IconButton";
import { Circle, Pencil, RectangleHorizontalIcon, MousePointer2, Type, Eraser, Download, ArrowLeft } from "lucide-react";
import { ShareButton } from "./ShareButton";
import { Game } from "@/draw/Game";
import Link from "next/link";
import { motion } from "framer-motion";
import { ModeToggle } from "./theme-toggle";
import { useTheme } from "next-themes";
import { UserAvatar } from "./UserAvatar";
import { Button } from "@/components/ui/button";

export type Tool = "circle" | "pencil" | "rect" | "pointer" | "eraser";

export function Canvas({
    roomId,
    socket
}: {
    socket: WebSocket;
    roomId: string;
}) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [game, setGame] = useState<Game>();
    const [selectedTool, setSelectedTool] = useState<Tool>("pointer");
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        game?.setTool(selectedTool);
    }, [selectedTool, game]);

    useEffect(() => {
        if (game && mounted) {
            game.setTheme(resolvedTheme === "dark");
        }
    }, [resolvedTheme, game, mounted]);

    useEffect(() => {
        if (canvasRef.current && mounted) {
            const isDark = resolvedTheme === "dark";
            const g = new Game(canvasRef.current, roomId, socket, isDark);
            setGame(g);

            const handleResize = () => {
                if (canvasRef.current) {
                    canvasRef.current.width = window.innerWidth;
                    canvasRef.current.height = window.innerHeight;
                    g.setTheme(resolvedTheme === "dark");
                }
            };

            window.addEventListener('resize', handleResize);

            return () => {
                g.destroy();
                window.removeEventListener('resize', handleResize);
            }
        }
    }, [canvasRef, roomId, socket, mounted]);

    return (
        <div className="h-screen w-full overflow-hidden bg-[#fafafa] dark:bg-zinc-950 relative selection:bg-blue-100 dark:selection:bg-blue-900 transition-colors duration-300">
            <canvas
                ref={canvasRef}
                width={typeof window !== 'undefined' ? window.innerWidth : 1000}
                height={typeof window !== 'undefined' ? window.innerHeight : 1000}
                className="relative z-10 touch-none"
                style={{ cursor: selectedTool === "pointer" ? "default" : "crosshair" }}
            />

            <Topbar roomId={roomId} />
            <Toolbar setSelectedTool={setSelectedTool} selectedTool={selectedTool} />
        </div>
    );
}

function Topbar({ roomId }: { roomId: string }) {
    const isGuest = roomId.startsWith("guest");

    return (
        <div className="absolute top-6 left-6 right-6 z-20 flex items-center justify-between pointer-events-none">
            <div className="flex items-center gap-4 pointer-events-auto">
                {!isGuest && (
                    <Link href="/workspace"
                        className="p-2 bg-white dark:bg-zinc-900 border-2 border-[#2c2c2c] dark:border-zinc-100 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.3)] transition-all">
                        <ArrowLeft className="w-5 h-5 text-[#2c2c2c] dark:text-zinc-100" />
                    </Link>
                )}
                <div className="px-4 py-2 bg-white dark:bg-zinc-900 border-2 border-[#2c2c2c] dark:border-zinc-100 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)] -rotate-1 cursor-pointer">
                    <Link href={"/"}>
                        <span className="font-black uppercase italic tracking-tighter text-[#2c2c2c] dark:text-zinc-100">Scribble.</span>
                    </Link>
                </div>
            </div>

            <div className="flex items-center gap-3 pointer-events-auto">
                <ModeToggle />
                <ShareButton />
                <Button variant="primary" size="sm" hidden>
                    <Download className="w-3.5 h-3.5" />
                    Export
                </Button>
                <UserAvatar />
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
                className="flex flex-col gap-3 p-2 bg-white dark:bg-zinc-900 border-4 border-[#2c2c2c] dark:border-zinc-100 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.3)]"
            >
                <IconButton
                    activated={selectedTool === "pointer"}
                    icon={<MousePointer2 className="w-5 h-5" />}
                    onClick={() => setSelectedTool("pointer")}
                />
                <div className="h-[2px] bg-[#2c2c2c]/10 dark:bg-zinc-100/20 mx-2" />

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
                    onClick={() => { }}
                />

                <div className="h-[2px] bg-[#2c2c2c]/10 dark:bg-zinc-100/20 mx-2" />

                <IconButton
                    activated={selectedTool === "eraser"}
                    icon={<Eraser className="w-5 h-5" />}
                    onClick={() => setSelectedTool("eraser")}
                />
            </motion.div>
        </div>
    );
}
