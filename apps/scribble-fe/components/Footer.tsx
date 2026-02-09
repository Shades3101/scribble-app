"use client";

import Link from "next/link";
import { Github, Twitter } from "lucide-react";

export function Footer() {
    return (
        <footer className="py-12 border-t-4 border-[#2c2c2c] dark:border-zinc-100 px-6 bg-white dark:bg-zinc-950">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="flex items-center gap-2">
                    <span className="text-xl font-black tracking-tight uppercase italic">Scribble.</span>
                </div>
                <div className="flex gap-8 font-bold text-xs uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                    <Link href="#" className="hover:text-black dark:hover:text-white transition-colors">Privacy</Link>
                    <Link href="#" className="hover:text-black dark:hover:text-white transition-colors">Terms</Link>
                    <Link href="#" className="hover:text-black dark:hover:text-white flex items-center gap-1 transition-colors">
                        <Twitter className="w-4 h-4" />
                        Twitter
                    </Link>
                    <Link href="#" className="hover:text-black dark:hover:text-white flex items-center gap-1 transition-colors">
                        <Github className="w-4 h-4" />
                        GitHub
                    </Link>
                </div>
                <p className="text-xs font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                    &copy; {new Date().getFullYear()} Scribble Inc. Hand-crafted with ink.
                </p>
            </div>
        </footer>
    );
}
