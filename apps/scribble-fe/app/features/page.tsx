"use client";

import { motion } from "framer-motion";
import {
    Users,
    Maximize,
    Pencil,
    Moon,
    Download,
    CheckCircle2,
    Clock,
    Save,
    Palette,
    Minus,
    Triangle,
    Video,
    MessageSquare,
    Eraser,
    MousePointer2
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function FeaturesPage() {
    const currentFeatures = [
        {
            icon: Users,
            title: "Real-time Collaboration",
            desc: "Work with your team in real-time. See shapes appear instantly as others draw and move."
        },
        {
            icon: MousePointer2,
            title: "Smart Selection",
            desc: "Select, move, and organize your ideas with precision using our intuitive selection tool."
        },
        {
            icon: Pencil,
            title: "Freehand Drawing",
            desc: "Express yourself naturally with a responsive pencil tool designed for sketches and scribbles."
        },
        {
            icon: Eraser,
            title: "Precision Erasing",
            desc: "Clean up your work instantly with a dedicated eraser tool for fine-tuning your sketches."
        },
        {
            icon: Maximize,
            title: "Infinite Canvas",
            desc: "Never run out of space. Pan and zoom across a limitless workspace that grows with your vision."
        },
        {
            icon: Moon,
            title: "Dark Mode",
            desc: "Easy on the eyes. Switch seamlessly between light and dark themes to match your workflow."
        },
        {
            icon: Save,
            title: "Auto-save",
            desc: "Your work is automatically saved to the room so you never lose your progress."
        }
    ];

    const upcomingFeatures = [
        {
            icon: Palette,
            title: "Hand-drawn Aesthetic",
            desc: "Rough, sketchy lines that make your diagrams feel like they were drawn on paper."
        },
        {
            icon: Download,
            title: "Flexible Export",
            desc: "Export your work to PNG, SVG, or generate shareable read-only links."
        },
        {
            icon: Triangle,
            title: "Advanced Shapes",
            desc: "More geometric tools are coming, including perfect triangles, diamonds, and more."
        },
        {
            icon: Minus,
            title: "Straight Lines",
            desc: "A dedicated tool for drawing perfectly straight lines and arrows."
        },
        {
            icon: Video,
            title: "Video Embedding",
            desc: "Paste YouTube or Loom links directly onto the canvas to add context to your diagrams."
        },
        {
            icon: MessageSquare,
            title: "Live Chat",
            desc: "Chat with your collaborators directly on the canvas without leaving your workflow."
        }
    ];

    return (
        <div className="min-h-screen bg-[#fafafa] dark:bg-zinc-950 text-[#2c2c2c] dark:text-zinc-100 selection:bg-blue-100 selection:text-blue-900 dark:selection:bg-blue-900 dark:selection:text-blue-100 overflow-x-hidden transition-colors duration-300">
            {/* Decorative Grid Background */}
            <div className="fixed inset-0 z-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

            <Navbar />

            <main className="relative z-10 pt-32 pb-20">

                {/* Header */}
                <section className="px-6 mb-24">
                    <div className="max-w-6xl mx-auto text-center">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-6xl md:text-8xl font-black tracking-tight mb-8 italic uppercase"
                        >
                            The <span className="text-blue-600 underline decoration-4 decoration-black dark:decoration-white underline-offset-8">Toolbox</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl md:text-2xl font-medium text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto"
                        >
                            Everything you need to think, plan, and build. From scribbles to systems.
                        </motion.p>
                    </div>
                </section>

                {/* Current Features */}
                <section className="px-6 mb-32">
                    <div className="max-w-6xl mx-auto">
                        <div className="flex items-center gap-4 mb-12 border-b-4 border-[#2c2c2c] dark:border-zinc-100 pb-4">
                            <CheckCircle2 className="w-8 h-8 text-green-500" />
                            <h2 className="text-4xl font-black uppercase italic tracking-tight">Available Now</h2>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {currentFeatures.map((f, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="bg-white dark:bg-zinc-900 p-8 border-4 border-[#2c2c2c] dark:border-zinc-100 rounded-xl hover:bg-[#f0f0f0] dark:hover:bg-zinc-800 transition-all duration-200"
                                >
                                    <f.icon className="w-12 h-12 mb-6 text-black dark:text-white" />
                                    <h3 className="text-2xl font-bold uppercase mb-3">{f.title}</h3>
                                    <p className="text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">{f.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Upcoming Features */}
                <section className="px-6 mb-20">
                    <div className="max-w-6xl mx-auto">
                        <div className="flex items-center gap-4 mb-12 border-b-4 border-dashed border-[#2c2c2c] dark:border-zinc-100 pb-4">
                            <Clock className="w-8 h-8 text-orange-500" />
                            <h2 className="text-4xl font-black uppercase italic tracking-tight text-zinc-500 dark:text-zinc-400">Coming Soon</h2>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 opacity-90">
                            {upcomingFeatures.map((f, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="bg-[#f0f0f0] dark:bg-zinc-800 p-8 border-4 border-dashed border-[#2c2c2c] dark:border-zinc-500 rounded-xl relative overflow-hidden group"
                                >
                                    <div className="absolute top-4 right-4 bg-orange-500 text-white text-xs font-bold px-2 py-1 uppercase rounded-sm rotate-3 transform group-hover:rotate-6 transition-transform">
                                        In Progress
                                    </div>
                                    <f.icon className="w-12 h-12 mb-6 text-zinc-400 dark:text-zinc-500" />
                                    <h3 className="text-2xl font-bold uppercase mb-3 text-zinc-600 dark:text-zinc-300">{f.title}</h3>
                                    <p className="text-zinc-500 dark:text-zinc-500 font-medium leading-relaxed">{f.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

            </main>

            <Footer />
        </div>
    );
}
