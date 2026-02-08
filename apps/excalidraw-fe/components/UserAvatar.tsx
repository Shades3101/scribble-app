"use client"

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { useSession, signOut } from "next-auth/react"
import { useState, useRef, useEffect } from "react"
import { LogOut, User, Settings } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface UserAvatarProps {
    size?: "sm" | "default" | "lg"
    showDropdown?: boolean
}

export function UserAvatar({ size = "default", showDropdown = true }: UserAvatarProps) {
    const { data: session, status } = useSession()
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const getInitials = (name: string | null | undefined) => {
        if (!name) return "?"
        return name
            .split(" ")
            .map(word => word[0])
            .join("")
            .toUpperCase()
            .slice(0, 2)
    }

    if (status === "loading") {
        return (
            <div className="w-10 h-10 bg-zinc-200 dark:bg-zinc-800 border-2 border-[#2c2c2c] dark:border-zinc-100 animate-pulse" />
        )
    }

    if (!session?.user) {
        return (
            <Button variant="primary" size="sm" asChild>
                <Link href="/signin">Sign In</Link>
            </Button>
        )
    }

    const sizeClasses = {
        sm: "w-8 h-8",
        default: "w-10 h-10",
        lg: "w-12 h-12"
    }

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => showDropdown && setIsOpen(!isOpen)}
                className={`${sizeClasses[size]} bg-white dark:bg-zinc-900 border-2 border-[#2c2c2c] dark:border-zinc-100 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.3)] transition-all overflow-hidden focus:outline-none`}
            >
                <Avatar size={size} className="w-full h-full rounded-none">
                    <AvatarImage
                        src={session.user.image || undefined}
                        alt={session.user.name || "User"}
                        className="object-cover"
                    />
                    <AvatarFallback className="bg-blue-500 text-white font-black text-sm rounded-none">
                        {getInitials(session.user.name)}
                    </AvatarFallback>
                </Avatar>
            </button>

            {/* Dropdown Menu */}
            {showDropdown && isOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-zinc-900 border-2 border-[#2c2c2c] dark:border-zinc-100 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.3)] z-50">
                    {/* User Info Header */}
                    <div className="p-3 border-b-2 border-[#2c2c2c]/10 dark:border-zinc-100/20">
                        <p className="font-black text-sm text-[#2c2c2c] dark:text-zinc-100 truncate">
                            {session.user.name}
                        </p>
                        <p className="text-[10px] text-[#2c2c2c]/60 dark:text-zinc-100/60 uppercase tracking-widest truncate">
                            {session.user.email}
                        </p>
                    </div>

                    {/* Menu Items */}
                    <div className="py-1">
                        <Link
                            href="/profile"
                            className="flex items-center gap-3 px-3 py-2 text-[#2c2c2c] dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            <User className="w-4 h-4" />
                            <span className="font-bold uppercase text-[10px] tracking-widest">Profile</span>
                        </Link>
                        <Link
                            href="/settings"
                            className="flex items-center gap-3 px-3 py-2 text-[#2c2c2c] dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            <Settings className="w-4 h-4" />
                            <span className="font-bold uppercase text-[10px] tracking-widest">Settings</span>
                        </Link>
                    </div>

                    {/* Sign Out */}
                    <div className="border-t-2 border-[#2c2c2c]/10 dark:border-zinc-100/20 py-1">
                        <button
                            onClick={() => signOut({ callbackUrl: "/" })}
                            className="flex items-center gap-3 px-3 py-2 w-full text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                        >
                            <LogOut className="w-4 h-4" />
                            <span className="font-bold uppercase text-[10px] tracking-widest">Sign Out</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
