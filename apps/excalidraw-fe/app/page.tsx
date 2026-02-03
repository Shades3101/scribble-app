"use client";

import { motion } from "framer-motion";
import { 
  Pencil, 
  MousePointer2, 
  Square, 
  Circle, 
  Type, 
  Image as ImageIcon, 
  Users, 
  Share2, 
  Download, 
  Zap,
  Github
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#fafafa] text-[#2c2c2c] selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden">
      {/* Decorative Grid Background */}
      <div className="fixed inset-0 z-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
      
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 border-2 border-[#2c2c2c] rotate-3 flex items-center justify-center rounded-sm bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <Pencil className="w-6 h-6 -rotate-12" />
          </div>
          <span className="text-2xl font-black tracking-tight uppercase italic">Scribble.</span>
        </div>
        
          <div className="hidden md:flex items-center gap-8 font-bold text-sm uppercase tracking-widest">
            <Link href="#features" className="hover:underline decoration-2 underline-offset-4">Features</Link>
            <Link href="/signin" className="hover:underline decoration-2 underline-offset-4">Sign In</Link>
            <Link href="/workspace" className="px-6 py-2 border-2 border-[#2c2c2c] bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all">
              Launch Editor
            </Link>
          </div>
      </nav>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-6">
          <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-6xl md:text-8xl font-black tracking-tight mb-8 leading-[0.9]">
                THINK IN <br />
                <span className="relative inline-block">
                  SKETCHES.
                  <svg className="absolute -bottom-2 left-0 w-full h-4 text-blue-500 opacity-60" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0,5 Q20,0 40,5 T80,5 T100,5" fill="none" stroke="currentColor" strokeWidth="4" />
                  </svg>
                </span>
              </h1>
            </motion.div>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="max-w-xl text-xl md:text-2xl font-medium text-[#666] mb-12 leading-relaxed"
            >
              The hand-drawn virtual whiteboard for messy thinkers, visual builders, and collaborative dreamers.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <Link href="/workspace" className="px-10 py-5 bg-[#2c2c2c] text-white text-xl font-black rounded-sm shadow-[8px_8px_0px_0px_rgba(59,130,246,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[6px_6px_0px_0px_rgba(59,130,246,1)] transition-all uppercase tracking-tighter">
                Start Drawing Free
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Mock Editor Canvas */}
        <section className="px-6 pb-32">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto border-4 border-[#2c2c2c] bg-white rounded-lg shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] overflow-hidden"
          >
            {/* Toolbar Mock */}
            <div className="border-b-4 border-[#2c2c2c] bg-[#f0f0f0] p-4 flex items-center justify-between">
              <div className="flex items-center gap-2 md:gap-4">
                {[MousePointer2, Square, Circle, Pencil, Type, ImageIcon].map((Icon, i) => (
                  <div key={i} className={`p-2 border-2 border-[#2c2c2c] bg-white rounded cursor-pointer hover:bg-zinc-100 ${i === 3 ? 'bg-blue-50 border-blue-600' : ''}`}>
                    <Icon className={`w-5 h-5 ${i === 3 ? 'text-blue-600' : ''}`} />
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <div className="px-4 py-1.5 border-2 border-[#2c2c2c] bg-white font-bold text-xs rounded uppercase">Export</div>
                <div className="w-8 h-8 rounded-full bg-orange-400 border-2 border-[#2c2c2c]" />
                <div className="w-8 h-8 rounded-full bg-blue-400 border-2 border-[#2c2c2c] -ml-4" />
              </div>
            </div>
            
            {/* Canvas Area with sketchy elements */}
            <div className="h-[400px] md:h-[600px] relative bg-white overflow-hidden p-12">
              {/* Hand-drawn Mockups */}
              <div className="absolute top-20 left-20 w-48 h-32 border-4 border-[#2c2c2c] rotate-2 flex items-center justify-center font-black italic">
                USER FLOW
              </div>
              <svg className="absolute top-36 left-44 w-32 h-32 text-[#2c2c2c]" viewBox="0 0 100 100">
                <path d="M10,10 Q50,90 90,10" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                <path d="M80,15 L90,10 L85,25" fill="none" stroke="currentColor" strokeWidth="3" />
              </svg>
              <div className="absolute top-64 left-64 w-40 h-40 border-4 border-[#2c2c2c] -rotate-3 rounded-full flex items-center justify-center font-bold text-center p-4">
                IDEA BUBBLE
              </div>
              
              <div className="absolute top-1/4 right-20 space-y-4 max-w-xs rotate-1">
                <h3 className="text-2xl font-black italic border-b-4 border-[#2c2c2c] pb-2">PLANNING</h3>
                <ul className="font-bold space-y-2">
                  <li>- Wireframe the dashboard</li>
                  <li>- Real-time sync API</li>
                  <li>- Dark mode support</li>
                </ul>
              </div>

              {/* Collaborative Cursors */}
              <div className="absolute top-1/2 left-1/3 flex items-center gap-1 animate-bounce">
                <MousePointer2 className="w-6 h-6 text-orange-500 fill-orange-500" />
                <span className="bg-orange-500 text-white px-2 py-0.5 text-xs font-bold rounded-sm">Sarah</span>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Features Grid */}
        <section id="features" className="py-32 bg-[#2c2c2c] text-white skew-y-1">
          <div className="-skew-y-1 max-w-6xl mx-auto px-6">
            <h2 className="text-5xl md:text-7xl font-black italic mb-20 text-center tracking-tighter">
              BEYOND THE <span className="text-blue-400 underline decoration-4">PIXELS</span>
            </h2>
            
            <div className="grid md:grid-cols-3 gap-12">
              {[
                { 
                  icon: Users, 
                  title: "Multi-player", 
                  desc: "Draw together in real-time. No lag, just pure collaborative energy." 
                },
                { 
                  icon: Zap, 
                  title: "Instant Sync", 
                  desc: "Every stroke is persisted instantly. Never lose a midnight brainwave." 
                },
                { 
                  icon: Download, 
                  title: "Zero Export", 
                  desc: "Snap a link, export to SVG, or embed anywhere. Your work is portable." 
                },
                { 
                  icon: Share2, 
                  title: "Smart Sharing", 
                  desc: "Invite anyone with a link. No accounts required for viewing." 
                },
                { 
                  icon: Github, 
                  title: "Open Source", 
                  desc: "Built by the community, for the community. Audit the code anytime." 
                },
                { 
                  icon: Share2, 
                  title: "Cloud Backup", 
                  desc: "Optionally sync to the cloud to access your boards from anywhere." 
                }
              ].map((f, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-8 border-2 border-white/20 hover:border-blue-400 transition-colors group"
                >
                  <f.icon className="w-12 h-12 mb-6 group-hover:text-blue-400 transition-colors" />
                  <h3 className="text-2xl font-black uppercase mb-4 tracking-tight">{f.title}</h3>
                  <p className="text-zinc-400 font-medium leading-relaxed">{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-40 px-6">
          <div className="max-w-4xl mx-auto text-center border-8 border-[#2c2c2c] p-12 md:p-24 bg-white relative">
            <div className="absolute -top-6 -left-6 w-12 h-12 bg-blue-500 border-4 border-[#2c2c2c]" />
            <div className="absolute -bottom-6 -right-6 w-12 h-12 bg-orange-500 border-4 border-[#2c2c2c]" />
            
            <h2 className="text-5xl md:text-7xl font-black mb-8 italic tracking-tighter uppercase leading-[0.8]">
              Your best ideas <br />
              <span className="text-blue-600">Start here.</span>
            </h2>
            <p className="text-xl md:text-2xl font-bold text-zinc-500 mb-12 max-w-xl mx-auto uppercase">
              Free forever. No credit card. Just pure imagination.
            </p>
            <Link href="/workspace" className="inline-block px-12 py-6 bg-[#2c2c2c] text-white text-2xl font-black shadow-[8px_8px_0px_0px_rgba(59,130,246,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[6px_6px_0px_0px_rgba(59,130,246,1)] transition-all uppercase italic">
              Create My First Board
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 border-t-4 border-[#2c2c2c] px-6 bg-white">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <span className="text-xl font-black tracking-tight uppercase italic">Scribble.</span>
          </div>
          <div className="flex gap-8 font-bold text-xs uppercase tracking-widest text-zinc-500">
            <Link href="#" className="hover:text-black">Privacy</Link>
            <Link href="#" className="hover:text-black">Terms</Link>
            <Link href="#" className="hover:text-black">Twitter</Link>
            <Link href="#" className="hover:text-black">GitHub</Link>
          </div>
          <p className="text-xs font-bold uppercase tracking-widest text-zinc-400">
            &copy; 2026 Scribble Inc. Hand-crafted with ink.
          </p>
        </div>
      </footer>
    </div>
  );
}
