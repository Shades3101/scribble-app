"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Loader2, Pencil, ArrowLeft, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import axios from "axios";
import { HTTP_BACKEND } from "@/config";
import { motion } from "framer-motion";

const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSignUp = async () => {
        setIsLoading(true);
        setError("");

        if (!name || !email || !password || !confirmPassword) {
            setError("All fields are required");
            setIsLoading(false);
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            setIsLoading(false);
            return;
        }

        try {
            const response = await axios.post(`${HTTP_BACKEND}/signup`, {
                name,
                username: email,
                password,
            });

            console.log("SignUp Successful", response.data);
            router.push("/signin");
        } catch (error: any) {
            console.error("SignUp Failed:", error.response?.data || error.message);
            setError(error.response?.data?.message || "SignUp Failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#fafafa] text-[#2c2c2c] selection:bg-blue-100 selection:text-blue-900 flex flex-col md:flex-row overflow-hidden">
            {/* Decorative Grid Background */}
            <div className="fixed inset-0 z-0 opacity-[0.03] pointer-events-none" 
                 style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

            {/* Left Side - Branding/Illustration (Visible on Desktop) */}
            <div className="hidden md:flex md:w-1/2 bg-blue-600 relative items-center justify-center p-12 overflow-hidden">
                <div className="absolute inset-0 opacity-10" 
                     style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
                
                <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 text-white group">
                    <div className="w-8 h-8 border-2 border-white flex items-center justify-center rounded-sm bg-transparent group-hover:bg-white group-hover:text-blue-600 transition-all">
                        <ArrowLeft className="w-5 h-5" />
                    </div>
                    <span className="font-bold uppercase tracking-widest text-xs">Back to Home</span>
                </Link>

                <div className="relative z-10 text-center">
                    <motion.div
                        initial={{ rotate: 12, scale: 0.9, opacity: 0 }}
                        animate={{ rotate: -5, scale: 1, opacity: 1 }}
                        className="w-24 h-24 border-4 border-white mx-auto mb-8 flex items-center justify-center bg-white text-blue-600 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
                    >
                        <Sparkles className="w-12 h-12 rotate-12" />
                    </motion.div>
                    <h1 className="text-6xl font-black text-white uppercase italic tracking-tighter mb-4 leading-none">
                        Join the <br /> Club.
                    </h1>
                    <p className="text-blue-100 font-bold uppercase tracking-widest text-sm">
                        Start your creative journey today.
                    </p>
                    
                    {/* Decorative sketchy element */}
                    <div className="absolute -bottom-20 -left-20 w-64 h-64 border-8 border-white/10 rounded-full -rotate-12" />
                    <div className="absolute -top-20 -right-20 w-48 h-48 border-4 border-black/20 rotate-12" />
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="flex-1 flex items-center justify-center p-6 relative z-10">
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="w-full max-w-md"
                >
                    <div className="bg-white border-4 border-[#2c2c2c] p-8 md:p-10 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] relative">
                        {/* Accent square */}
                        <div className="absolute -top-4 -left-4 w-8 h-8 bg-orange-400 border-4 border-[#2c2c2c] -rotate-12" />
                        
                        <div className="mb-8 text-center md:text-left">
                            <h2 className="text-4xl font-black uppercase italic tracking-tighter mb-2">Sign Up</h2>
                            <p className="text-[#666] font-bold uppercase text-xs tracking-widest">Create your digital studio</p>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-1.5">
                                <Label htmlFor="name" className="font-black uppercase text-[10px] tracking-wider text-[#2c2c2c]">Full Name</Label>
                                <Input 
                                    id="name" 
                                    type="text" 
                                    placeholder="LEONARDO DA VINCI" 
                                    className="h-12 border-2 border-[#2c2c2c] rounded-none focus-visible:ring-0 focus-visible:border-blue-500 bg-white font-bold placeholder:text-zinc-300 transition-all text-sm"
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            <div className="space-y-1.5">
                                <Label htmlFor="email" className="font-black uppercase text-[10px] tracking-wider text-[#2c2c2c]">Email Address</Label>
                                <Input 
                                    id="email" 
                                    type="email" 
                                    placeholder="ARTIST@SCRIBBLE.COM" 
                                    className="h-12 border-2 border-[#2c2c2c] rounded-none focus-visible:ring-0 focus-visible:border-blue-500 bg-white font-bold placeholder:text-zinc-300 transition-all text-sm"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <Label htmlFor="password" className="font-black uppercase text-[10px] tracking-wider text-[#2c2c2c]">Password</Label>
                                    <Input 
                                        id="password" 
                                        type="password" 
                                        placeholder="••••••••" 
                                        className="h-12 border-2 border-[#2c2c2c] rounded-none focus-visible:ring-0 focus-visible:border-blue-500 bg-white font-bold placeholder:text-zinc-300 transition-all text-sm"
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <Label htmlFor="confirm-password" className="font-black uppercase text-[10px] tracking-wider text-[#2c2c2c]">Confirm</Label>
                                    <Input 
                                        id="confirm-password" 
                                        type="password" 
                                        placeholder="••••••••" 
                                        className="h-12 border-2 border-[#2c2c2c] rounded-none focus-visible:ring-0 focus-visible:border-blue-500 bg-white font-bold placeholder:text-zinc-300 transition-all text-sm"
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </div>
                            </div>

                            {error && (
                                <div className="p-3 border-2 border-red-500 bg-red-50 text-red-600 text-[10px] font-black uppercase tracking-tight italic">
                                    Error: {error}
                                </div>
                            )}

                            <div className="pt-2">
                                <Button 
                                    className="w-full h-14 bg-[#2c2c2c] hover:bg-[#2c2c2c] text-white font-black uppercase italic text-lg rounded-none shadow-[4px_4px_0px_0px_rgba(251,146,60,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(251,146,60,1)] transition-all active:translate-x-[4px] active:translate-y-[4px] active:shadow-none disabled:opacity-50 disabled:cursor-not-allowed border-2 border-[#2c2c2c]" 
                                    onClick={handleSignUp} 
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <div className="flex items-center justify-center gap-2">
                                            <Loader2 className="h-5 w-5 animate-spin" />
                                            <span>Creating Artist Profile...</span>
                                        </div>
                                    ) : (
                                        "Create Account"
                                    )}
                                </Button>
                            </div>

                            <div className="relative flex items-center py-2">
                                <div className="flex-grow border-t-2 border-[#2c2c2c]/10"></div>
                                <span className="flex-shrink mx-4 text-[10px] font-black uppercase tracking-[0.2em] text-[#2c2c2c]/40 italic">or register via</span>
                                <div className="flex-grow border-t-2 border-[#2c2c2c]/10"></div>
                            </div>

                            <Button 
                                variant="outline" 
                                className="w-full h-12 border-2 border-[#2c2c2c] rounded-none bg-white hover:bg-zinc-50 font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-3 transition-all" 
                                onClick={() => signIn("google", { callbackUrl: "/" })}
                            >
                                <Image src={"/google.svg"} width={16} height={16} alt="Google" className="grayscale contrast-125" />
                                Google Account
                            </Button>
                        </div>

                        <div className="mt-8 text-center">
                            <p className="text-xs font-bold uppercase tracking-widest text-[#666]">
                                Already a member?{" "}
                                <Link href="/signin" className="text-blue-600 hover:underline font-black italic">
                                    Sign in instead
                                </Link>
                            </p>
                        </div>
                    </div>
                    
                    {/* Footnote */}
                    <p className="mt-8 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-[#2c2c2c]/30">
                        &copy; 2026 Scribble Inc. / Join 10k+ Messy thinkers
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default SignUp;
