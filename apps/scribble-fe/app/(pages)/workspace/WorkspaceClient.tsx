"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Pencil, Plus, LayoutGrid, Settings, LogOut, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { HTTP_BACKEND } from "@/config";
import { signOut } from "next-auth/react";

interface RoomType {
    id: string;
    slug: string;
    rotate?: number;
    imageUrl?: string;
}

interface WorkspaceClientProps {
    Rooms: RoomType[];
    Token: string;
}


export default function WorkspaceClient({ Rooms, Token }: WorkspaceClientProps) {

    const router = useRouter();
    const [rooms, setRooms] = useState<RoomType[]>(Rooms || []);
    const [newRoomName, setNewRoomName] = useState("");
    const [imageUrl, setImageUrl] = useState("")
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleCreateRoom = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newRoomName.trim()) {
            return;
        };

        try {
            const response = await axios.post(`${HTTP_BACKEND}/room`,
                {
                    name: newRoomName,
                    imageUrl: imageUrl || undefined
                },
                {
                    headers: {
                        Authorization: `Bearer ${Token}`
                    }
                }
            )

            const newRoom: RoomType = {
                id: response.data.roomId,
                slug: newRoomName,
                imageUrl: imageUrl,
                rotate: Math.random() * 4 - 2
            };

            setRooms([...rooms, newRoom]);
            setDialogOpen(false);
            setNewRoomName("");
            setImageUrl("");

            router.push(`/canvas/${newRoomName}`);

        } catch (error) {
            console.error("Failed to create room", error);
        }
    };

    const handleDeleteRoom = async (roomId: string) => {
        try {
            await axios.delete(`${HTTP_BACKEND}/delete-room/${roomId}`, {
                headers: {
                    Authorization: `Bearer ${Token}`
                }
            });

            setRooms(rooms.filter(room => room.id !== roomId));
        } catch (error) {
            console.error("Failed to delete room", error);
        }
    };

    return (
        <div className="min-h-screen bg-[#fafafa] dark:bg-zinc-950 text-[#2c2c2c] dark:text-zinc-100 flex transition-colors duration-300">
            {/* Decorative Grid Background */}
            <div className="fixed inset-0 z-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

            {/* Sidebar */}
            <aside className="fixed left-0 top-0 bottom-0 w-64 border-r-4 border-[#2c2c2c] dark:border-zinc-100 bg-white dark:bg-zinc-900 z-20 hidden md:flex flex-col">
                <div className="p-6 border-b-4 border-[#2c2c2c] dark:border-zinc-100">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 border-2 border-[#2c2c2c] dark:border-zinc-100 rotate-3 flex items-center justify-center rounded-sm bg-white dark:bg-zinc-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.3)]">
                            <Pencil className="w-4 h-4 -rotate-12" />
                        </div>
                        <span className="text-xl font-black tracking-tight uppercase italic">Scribble.</span>
                    </Link>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    {[
                        { icon: LayoutGrid, label: "My Boards", active: true },
                        // { icon: Users, label: "Shared with me" },
                        // { icon: History, label: "Recent" },
                        // { icon: FolderOpen, label: "Templates" },

                    ].map((item, i) => (
                        <button
                            key={i}
                            className={`w-full flex items-center gap-3 px-4 py-3 font-bold uppercase tracking-tight text-sm transition-all border-2 border-transparent ${item.active
                                ? "bg-[#2c2c2c] dark:bg-zinc-100 text-white dark:text-zinc-900 shadow-[4px_4px_0px_0px_rgba(59,130,246,1)]"
                                : "hover:border-[#2c2c2c] dark:hover:border-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                                }`}
                        >
                            <item.icon className="w-5 h-5" />
                            {item.label}
                        </button>
                    ))}
                </nav>

                <div className="p-4 border-t-4 border-[#2c2c2c] dark:border-zinc-100 space-y-2">
                    <button className="w-full flex items-center gap-3 px-4 py-3 font-bold uppercase text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                        <Settings className="w-5 h-5" />
                        Settings
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-3 font-bold uppercase text-sm hover:text-red-600 transition-colors"
                        onClick={() => signOut({ callbackUrl: "/" })} >
                        <LogOut className="w-5 h-5" />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 md:ml-64 relative z-10 p-6 md:p-12">
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter leading-none mb-2">
                            MY WORKSPACE
                        </h1>
                        <p className="font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest text-xs">
                            {rooms.length} Boards
                        </p>
                    </div>

                    <div className="flex items-center gap-4">
                        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                            <DialogTrigger asChild>
                                <Button className="bg-blue-500 hover:bg-blue-500 italic">
                                    <Plus className="w-5 h-5" />
                                    New Board
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="border-4 border-[#2c2c2c] dark:border-zinc-100 bg-white dark:bg-zinc-900 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.3)] rounded-none">
                                <DialogHeader>
                                    <DialogTitle className="text-3xl font-black uppercase italic tracking-tight">Create New Board</DialogTitle>
                                </DialogHeader>
                                <form onSubmit={handleCreateRoom} className="space-y-6 pt-4">
                                    <div className="space-y-4">
                                        <label className="text-sm font-black uppercase tracking-widest">Board Name</label>
                                        <input autoFocus placeholder="e.g. My Next Big Idea" value={newRoomName} onChange={(e) => setNewRoomName(e.target.value)}
                                            className="w-full px-4 py-3 border-2 border-[#2c2c2c] dark:border-zinc-100 bg-white dark:bg-zinc-800 dark:text-zinc-100 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)] focus:outline-none font-bold text-lg"
                                        />

                                        <label className="text-sm font-black uppercase tracking-widest">Image URL (Optional)</label>
                                        <input autoFocus placeholder="Image URL (optional)" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)}
                                            className="w-full px-4 py-3 border-2 border-[#2c2c2c] dark:border-zinc-100 bg-white dark:bg-zinc-800 dark:text-zinc-100 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)] focus:outline-none font-bold text-lg"
                                        />
                                    </div>
                                    <div className="flex justify-end pt-4">
                                        <Button type="submit" variant="primary" disabled={!newRoomName.trim()} className="italic">
                                            Launch Editor
                                        </Button>
                                    </div>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </div>
                </header>

                {rooms.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-32 border-4 border-dashed border-[#2c2c2c] dark:border-zinc-100 bg-zinc-50/50 dark:bg-zinc-900/50">
                        <div className="w-20 h-20 border-2 border-[#2c2c2c] dark:border-zinc-100 rotate-12 flex items-center justify-center bg-white dark:bg-zinc-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)] mb-6">
                            <Pencil className="w-10 h-10 text-zinc-300 dark:text-zinc-600" />
                        </div>
                        <h3 className="text-2xl font-black uppercase italic mb-2">No boards found</h3>
                        <p className="font-bold text-zinc-400 dark:text-zinc-500 uppercase text-sm mb-8">Start sketching your next masterpiece</p>
                        <Button onClick={() => setDialogOpen(true)} className="italic">
                            Create Your First Board
                        </Button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {rooms.map((room) => (
                            <motion.div key={room.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} style={{ rotate: `${room.rotate}deg` }} className="group relative">
                                <div className="absolute inset-0 bg-[#2c2c2c] dark:bg-zinc-100 translate-x-1 translate-y-1 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform" />
                                <div className="relative border-2 border-[#2c2c2c] dark:border-zinc-100 bg-white dark:bg-zinc-900 h-full flex flex-col transition-transform group-hover:-translate-x-1 group-hover:-translate-y-1">
                                    {/* Card Preview Area */}
                                    <div className="h-40 border-b-2 border-[#2c2c2c] dark:border-zinc-100 relative overflow-hidden p-4 bg-zinc-50 dark:bg-zinc-800">
                                        {room.imageUrl ? (
                                            <img src={room.imageUrl} alt={room.slug} className="absolute inset-0 w-full h-full object-cover opacity-50" />
                                        ) : (
                                            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#000 0.5px, transparent 0.5px)', backgroundSize: '8px 8px' }} />
                                        )}
                                        <div className="relative w-full h-full border-2 border-dashed border-[#2c2c2c]/30 rounded flex items-center justify-center z-10">
                                            <Pencil className="w-8 h-8 text-[#2c2c2c]/20" />
                                        </div>
                                    </div>

                                    {/* Card Content */}
                                    <div className="p-5 flex-1 flex flex-col">
                                        <div className="flex justify-between items-start mb-4">
                                            <h3 className="font-black uppercase tracking-tight text-lg leading-tight group-hover:text-blue-600 transition-colors">
                                                {room.slug}
                                            </h3>
                                            <button onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                handleDeleteRoom(room.id);
                                            }}
                                                className="relative z-20 p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded group/delete text-zinc-400 hover:text-red-500 transition-colors"
                                                title="Delete Board"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>

                                    </div>

                                    {/* Hover Actions Overlay */}
                                    <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/5 transition-colors pointer-events-none" />
                                    <Link href={`/canvas/${room.slug}`} className="absolute inset-0 z-10" aria-label={`Open ${room.slug}`} />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}