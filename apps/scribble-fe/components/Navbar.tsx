"use client";

import { Pencil } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "@/components/theme-toggle";
import { UserAvatar } from "@/components/UserAvatar";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 backdrop-blur-sm bg-[#fafafa]/80 dark:bg-zinc-950/80 border-b border-transparent">
      <div className="flex items-center gap-2">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 border-2 border-[#2c2c2c] dark:border-zinc-100 rotate-3 flex items-center justify-center rounded-sm bg-white dark:bg-zinc-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)] group-hover:rotate-6 transition-transform">
            <Pencil className="w-6 h-6 -rotate-12" />
          </div>
          <span className="text-2xl font-black tracking-tight uppercase italic group-hover:underline decoration-4 underline-offset-4 decoration-blue-500">Scribble.</span>
        </Link>
      </div>

      <div className="hidden md:flex items-center gap-6 font-bold text-sm uppercase tracking-widest">
        <Link href="/features" className="hover:underline decoration-2 underline-offset-4 decoration-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Features</Link>
        <Button asChild className="font-bold border-2 border-black dark:border-zinc-200 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all bg-white text-black dark:bg-zinc-900 dark:text-zinc-100 dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.5)] dark:hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.5)]">
          <Link href="/Guest">Launch Editor</Link>
        </Button>
        <ModeToggle />
        <UserAvatar />
      </div>
    </nav>
  );
}
