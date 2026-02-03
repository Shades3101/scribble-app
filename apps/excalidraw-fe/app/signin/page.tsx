"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Pencil, ArrowLeft } from "lucide-react";
import { signIn } from "next-auth/react";
import { motion } from "framer-motion";

const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const isFormValid = email.trim() !== "" && password.trim() !== "";
    const router = useRouter();

    const handleSignin = async () => {
        if (!isFormValid) {
            return;
        }
        setIsLoading(true);
        setError("");

        try {
            const result = await signIn("credentials", {
                email,
                password,
                redirect: false
            });

            if (result?.ok) {
                router.push("/canvas");
            } else {
                setError(result?.error || "Invalid email or password");
            }
        } catch (error) {
            console.error(error);
            setError("An error occurred while signing in");
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
            <div className="hidden md:flex md:w-1/2 bg-[#2c2c2c] relative items-center justify-center p-12 overflow-hidden">
                <div className="absolute inset-0 opacity-10" 
                     style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
                
                <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 text-white group">
                    <div className="w-8 h-8 border-2 border-white flex items-center justify-center rounded-sm bg-transparent group-hover:bg-white group-hover:text-[#2c2c2c] transition-all">
                        <ArrowLeft className="w-5 h-5" />
                    </div>
                    <span className="font-bold uppercase tracking-widest text-xs">Back to Home</span>
                </Link>

                <div className="relative z-10 text-center">
                    <motion.div
                        initial={{ rotate: -5, scale: 0.9, opacity: 0 }}
                        animate={{ rotate: 2, scale: 1, opacity: 1 }}
                        className="w-24 h-24 border-4 border-white mx-auto mb-8 flex items-center justify-center bg-white text-[#2c2c2c] shadow-[8px_8px_0px_0px_rgba(59,130,246,1)]"
                    >
                        <Pencil className="w-12 h-12 -rotate-12" />
                    </motion.div>
                    <h1 className="text-6xl font-black text-white uppercase italic tracking-tighter mb-4 leading-none">
                        Welcome <br /> Back.
                    </h1>
                    <p className="text-blue-400 font-bold uppercase tracking-widest text-sm">
                        Ready to sketch some ideas?
                    </p>
                    
                    {/* Decorative sketchy element */}
                    <div className="absolute -bottom-20 -right-20 w-64 h-64 border-8 border-white/10 rounded-full rotate-12" />
                    <div className="absolute -top-20 -left-20 w-48 h-48 border-4 border-blue-500/20 rotate-45" />
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="flex-1 flex items-center justify-center p-6 relative z-10">
                <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="w-full max-w-md"
                >
                    <div className="bg-white border-4 border-[#2c2c2c] p-8 md:p-10 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] relative">
                        {/* Accent square */}
                        <div className="absolute -top-4 -right-4 w-8 h-8 bg-blue-500 border-4 border-[#2c2c2c] rotate-12" />
                        
                        <div className="mb-10 text-center md:text-left">
                            <h2 className="text-4xl font-black uppercase italic tracking-tighter mb-2">Sign In</h2>
                            <p className="text-[#666] font-bold uppercase text-xs tracking-widest">Access your digital sketchbook</p>
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="email" className="font-black uppercase text-xs tracking-wider text-[#2c2c2c]">Email Address</Label>
                                <Input 
                                    id="email" 
                                    type="email" 
                                    placeholder="YOU@EXAMPLE.COM" 
                                    className="h-14 border-2 border-[#2c2c2c] rounded-none focus-visible:ring-0 focus-visible:border-blue-500 bg-white font-bold placeholder:text-zinc-300 transition-all"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password" className="font-black uppercase text-xs tracking-wider text-[#2c2c2c]">Password</Label>
                                    <Link href="/forgot-password" title="Wait, did you really forget?" className="text-[10px] font-black uppercase tracking-widest text-blue-600 hover:underline">
                                        Forgot?
                                    </Link>
                                </div>
                                <Input 
                                    id="password" 
                                    type="password" 
                                    placeholder="••••••••" 
                                    className="h-14 border-2 border-[#2c2c2c] rounded-none focus-visible:ring-0 focus-visible:border-blue-500 bg-white font-bold placeholder:text-zinc-300 transition-all"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            {error && (
                                <div className="p-3 border-2 border-red-500 bg-red-50 text-red-600 text-xs font-black uppercase tracking-tight italic">
                                    Error: {error}
                                </div>
                            )}

                            <Button 
                                className="w-full h-14 bg-[#2c2c2c] hover:bg-[#2c2c2c] text-white font-black uppercase italic text-lg rounded-none shadow-[4px_4px_0px_0px_rgba(59,130,246,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(59,130,246,1)] transition-all active:translate-x-[4px] active:translate-y-[4px] active:shadow-none disabled:opacity-50 disabled:cursor-not-allowed border-2 border-[#2c2c2c]" 
                                onClick={handleSignin} 
                                disabled={!isFormValid || isLoading}
                            >
                                {isLoading ? (
                                    <div className="flex items-center justify-center gap-2">
                                        <Loader2 className="h-5 w-5 animate-spin" />
                                        <span>Authentication in progress...</span>
                                    </div>
                                ) : (
                                    "Enter Workspace"
                                )}
                            </Button>

                            <div className="relative flex items-center py-2">
                                <div className="flex-grow border-t-2 border-[#2c2c2c]/10"></div>
                                <span className="flex-shrink mx-4 text-[10px] font-black uppercase tracking-[0.2em] text-[#2c2c2c]/40 italic">or explore via</span>
                                <div className="flex-grow border-t-2 border-[#2c2c2c]/10"></div>
                            </div>

                            <Button 
                                variant="outline" 
                                className="w-full h-14 border-2 border-[#2c2c2c] rounded-none bg-white hover:bg-zinc-50 font-black uppercase text-sm tracking-widest flex items-center justify-center gap-3 transition-all" 
                                onClick={() => signIn("google", { callbackUrl: "/" })}
                            >
                                <Image src={"/google.svg"} width={20} height={20} alt="Google" className="grayscale contrast-125" />
                                Google Account
                            </Button>
                        </div>

                        <div className="mt-10 text-center">
                            <p className="text-xs font-bold uppercase tracking-widest text-[#666]">
                                New to Scribble?{" "}
                                <Link href="/signup" className="text-blue-600 hover:underline font-black italic">
                                    Create a free account
                                </Link>
                            </p>
                        </div>
                    </div>
                    
                    {/* Footnote */}
                    <p className="mt-8 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-[#2c2c2c]/30">
                        &copy; 2026 Scribble Inc. / Built for messy thinkers
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default SignIn;
