"use client";

import { useState, useCallback, useRef } from "react";
import { Share2, Check, Copy, Link2 } from "lucide-react";
import { FaWhatsapp, FaXTwitter, FaFacebookF, FaLinkedinIn } from "react-icons/fa6";
import { SiGmail } from "react-icons/si";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogTrigger,
} from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";

const SHARE_PLATFORMS = [
    {
        name: "WhatsApp",
        icon: FaWhatsapp,
        color: "bg-[#25D366]",
        hoverColor: "hover:bg-[#1da851]",
        textColor: "text-white",
        getUrl: (url: string, text: string) =>
            `https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`,
    },
    {
        name: "Twitter",
        icon: FaXTwitter,
        color: "bg-[#000000]",
        hoverColor: "hover:bg-[#1a1a1a]",
        textColor: "text-white",
        getUrl: (url: string, text: string) =>
            `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
    },
    {
        name: "Facebook",
        icon: FaFacebookF,
        color: "bg-[#1877F2]",
        hoverColor: "hover:bg-[#0d65d9]",
        textColor: "text-white",
        getUrl: (url: string) =>
            `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    },
    {
        name: "LinkedIn",
        icon: FaLinkedinIn,
        color: "bg-[#0A66C2]",
        hoverColor: "hover:bg-[#084e96]",
        textColor: "text-white",
        getUrl: (url: string) =>
            `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    },
    {
        name: "Email",
        icon: SiGmail,
        color: "bg-[#EA4335]",
        hoverColor: "hover:bg-[#d33426]",
        textColor: "text-white",
        getUrl: (url: string, text: string) =>
            `mailto:?subject=${encodeURIComponent(text)}&body=${encodeURIComponent(`Check this out: ${url}`)}`,
    },
] as const;

export function ShareButton() {
    const [copied, setCopied] = useState(false);
    const [open, setOpen] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const getShareUrl = useCallback(() => {

        if (typeof window !== "undefined") {
            return window.location.href;
        }

        return "";
    }, []);

    const copyToClipboard = useCallback(async () => {
        const url = getShareUrl();
        try {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                await navigator.clipboard.writeText(url);
            } else {
                // for older browsers / insecure contexts (new for me)
                const textArea = document.createElement("textarea");
                textArea.value = url;
                textArea.style.position = "fixed";
                textArea.style.left = "-9999px";
                textArea.style.top = "-9999px";
                textArea.style.opacity = "0";
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                document.execCommand("copy");
                document.body.removeChild(textArea);
            }
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            console.error("Failed to copy to clipboard");
        }
    }, [getShareUrl]);

    const handlePlatformClick = useCallback(
        (getUrl: (url: string, text: string) => string) => {
            const url = getShareUrl();
            const text = "Join my Scribble drawing session!";
            const shareUrl = getUrl(url, text);
            window.open(shareUrl, "_blank", "noopener,noreferrer,width=600,height=500");
        },
        [getShareUrl]
    );

    const selectInput = useCallback(() => {
        inputRef.current?.select();
    }, []);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="sm" id="share-button" aria-label="Share this canvas">
                    <Share2 className="w-3.5 h-3.5" />
                    Share
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md border-2 border-[#2c2c2c] dark:border-zinc-100 rounded-none shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.3)] bg-white dark:bg-zinc-950 p-0 gap-0 overflow-hidden">
                {/* Header */}
                <DialogHeader className="px-6 pt-6 pb-4">
                    <DialogTitle className="text-xl font-black uppercase tracking-tight text-[#2c2c2c] dark:text-zinc-100 flex items-center gap-2">
                        <div className="p-1.5 bg-[#2c2c2c] dark:bg-zinc-100 -rotate-3">
                            <Share2 className="w-4 h-4 text-white dark:text-zinc-900" />
                        </div>
                        Share Canvas
                    </DialogTitle>
                    <DialogDescription className="text-sm text-zinc-500 dark:text-zinc-400">
                        Share this drawing session with your friends and collaborate in real-time.
                    </DialogDescription>
                </DialogHeader>

                {/* URL Copy Section */}
                <div className="px-6 pb-5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-2 block">
                        Share Link
                    </label>
                    <div className="flex gap-2">
                        <div className="flex-1 relative">
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                <Link2 className="w-4 h-4 text-zinc-400 dark:text-zinc-500" />
                            </div>
                            <input ref={inputRef} type="text" readOnly value={getShareUrl()} onClick={selectInput}
                                className="w-full h-10 pl-10 pr-3 text-sm font-mono bg-zinc-50 dark:bg-zinc-900 border-2 border-[#2c2c2c] dark:border-zinc-700 text-[#2c2c2c] dark:text-zinc-100 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 transition-colors truncate"
                            />
                        </div>
                        <button onClick={copyToClipboard}
                            className="h-10 px-4 flex items-center gap-2 bg-[#2c2c2c] dark:bg-zinc-100 text-white dark:text-zinc-900 border-2 border-[#2c2c2c] dark:border-zinc-100 font-black text-[10px] uppercase tracking-widest shadow-[3px_3px_0px_0px_rgba(59,130,246,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_rgba(59,130,246,1)] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all cursor-pointer whitespace-nowrap"
                        >
                            <AnimatePresence mode="wait">
                                {copied ? (
                                    <motion.span key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex items-center gap-1.5">
                                        <Check className="w-3.5 h-3.5" />
                                        Copied
                                    </motion.span>
                                ) : (
                                    <motion.span key="copy" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex items-center gap-1.5">
                                        <Copy className="w-3.5 h-3.5" />
                                        Copy
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </button>
                    </div>
                </div>

                {/* Divider */}
                <div className="px-6">
                    <div className="flex items-center gap-3">
                        <div className="flex-1 h-[2px] bg-zinc-200 dark:bg-zinc-800" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-600">
                            or share via
                        </span>
                        <div className="flex-1 h-[2px] bg-zinc-200 dark:bg-zinc-800" />
                    </div>
                </div>

                {/* Social Share Grid */}
                <div className="px-6 pt-5 pb-6">
                    <div className="grid grid-cols-5 gap-3">
                        {SHARE_PLATFORMS.map((platform) => {
                            const Icon = platform.icon;
                            return (
                                <motion.button key={platform.name} whileHover={{ scale: 1.05, rotate: -2 }} whileTap={{ scale: 0.95 }} onClick={() => handlePlatformClick(platform.getUrl)} 
                                    className="flex flex-col items-center gap-2 group cursor-pointer">
                                    <div
                                        className={`w-12 h-12 ${platform.color} ${platform.hoverColor} ${platform.textColor} flex items-center justify-center border-2 border-[#2c2c2c] dark:border-zinc-600 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.2)] group-hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:group-hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)] group-hover:translate-x-[1px] group-hover:translate-y-[1px] transition-all`}
                                    >
                                        <Icon className="w-5 h-5" />
                                    </div>
                                    <span className="text-[9px] font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 group-hover:text-[#2c2c2c] dark:group-hover:text-zinc-100 transition-colors">
                                        {platform.name}
                                    </span>
                                </motion.button>
                            );
                        })}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
