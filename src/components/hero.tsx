"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";


export default function Hero() {
const route = useRouter()
const nabigate=()=>{
  route.push("/ChatPage")
}
  return (
    <section className="relative min-h-screen bg-[#111111] overflow-hidden text-white">
  {/* Custom Glow Background with Conic Gradients */}
  <motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 3 }}
  className="absolute -inset-y-[25%] rotate-180 -left-24 flex w-[100vw] flex-col xl:-left-6 xl:w-[1200px] pointer-events-none opacity-80 z-0"
  style={{
    maskImage: "linear-gradient(to right, rgba(255, 255, 255, 0), rgb(255, 255, 255))",
    WebkitMaskImage: "linear-gradient(to right, rgba(255, 255, 255, 0), rgb(255, 255, 255))"  }}
>
  <div className="flex flex-col w-full h-full blur">
  <motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 4.5 }}
  className="grow"
  style={{
    background:
      "conic-gradient(from 180deg at 99% 40% in lab, rgb(255, 255, 255) 18deg, #3b82f6 36deg, rgba(17, 17, 17, 0) 90deg, rgba(17, 17, 17, 0) 342deg, rgb(255, 255, 255) 360deg)",
  }}
/>
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 4.5 }}
  className="grow"
  style={{
    background:
      "conic-gradient(from 0deg at 99% 60% in lab, rgb(255, 255, 255) 0deg, rgba(17, 17, 17, 0) 18deg, rgba(17, 17, 17, 0) 270deg, #3b82f6 324deg, rgb(255, 255, 255) 342deg)",
  }}
/>

  </div>
  <canvas className="absolute inset-0 h-full w-full" width="1200" height="1254" />
</motion.div>
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 0.3 }}
  transition={{ duration: 3 }}
  className="absolute -inset-y-[25%]  -right-36 flex w-[70vw] flex-col xl:-right-6 xl:w-[1000px] pointer-events-none opacity-30 z-0"
  style={{
    maskImage: "linear-gradient(to right, rgba(255, 255, 255, 0), rgb(255, 255, 255))",
    WebkitMaskImage: "linear-gradient(to right, rgba(255, 255, 255, 0), rgb(255, 255, 255))",
  }}
>
  <div className="flex flex-col w-full h-full blur">
  <motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 4.5 }}
      className="grow"
      style={{
        background:
        "conic-gradient(from 180deg at 99% 40% in lab, rgb(255, 255, 255) 18deg, #60a5fa 36deg, rgba(17, 17, 17, 0) 90deg, rgba(17, 17, 17, 0) 342deg, rgb(255, 255, 255) 360deg)",
      }}
    />
    <motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 4.5 }}
      className="grow"
      style={{
        background:
        "conic-gradient(from 0deg at 99% 60% in lab, rgb(255, 255, 255) 0deg, rgba(17, 17, 17, 0) 18deg, rgba(17, 17, 17, 0) 270deg, #3b82f6 324deg, rgb(255, 255, 255) 342deg)",
      }}
    />
  </div>
  <canvas className="absolute inset-0 h-full w-full" width="1200" height="1254" />
</motion.div>
      {/* Starry effect */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="w-full h-full bg-[radial-gradient(circle,_#ffffff20_1px,_transparent_1px)] [background-size:20px_20px] opacity-10" />
      </div>

      {/* Centered content */}
      <div className="relative z-10 flex flex-col justify-center items-center text-center h-screen px-4">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className=" md:mb-10 mb-6 text-4xl md:text-7xl font-bold text-gray-100   tracking-tight"
        >
          Meet Your Personal {" "}
          <span className="bg-gradient-to-r from-[#d4bb4c] via-[#aa963e] to-[#d3ae0b] bg-clip-text text-transparent " >
                AI Agent
              </span>
        </motion.h1>
        {/* --- 🔥 Your New Tagline and Buttons --- */}
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-slate-200 text-sm md:text-lg max-w-3xl mx-auto"
        >
         AI-powered 2D architectural layout generator that turns your natural language input into structured, professional floor plans — no CAD skills required.
        </motion.p>

        {/* <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <Button className="text-white bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 px-8 py-6 text-lg rounded-lg shadow-lg shadow-purple-500/20 transition-all hover:shadow-purple-500/30">
            Explore Our Work
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button variant="outline" className="bg-transparent border-slate-700 text-white hover:bg-slate-800 hover:text-white px-8 py-6 text-lg rounded-lg transition-all">
            Contact Us
          </Button>
        </motion.div> */}

        {/* --- 🔥 Cards Section --- */}
        {/* <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto mb-12"
        >
          <div className="flex items-center p-4 rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm transition-all hover:bg-slate-800/70 hover:border-slate-700">
            <div className="mr-4 p-3 rounded-lg bg-purple-500/10 text-purple-400">
              <Brain size={24} />
            </div>
            <div className="text-left">
              <h3 className="font-medium text-white">AI Solutions</h3>
              <p className="text-sm text-slate-400">
                Custom artificial intelligence solutions tailored to your business needs
              </p>
            </div>
          </div> */}

          {/* <div className="flex items-center p-4 rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm transition-all hover:bg-slate-800/70 hover:border-slate-700">
            <div className="mr-4 p-3 rounded-lg bg-purple-500/10 text-purple-400">
              <Code size={24} />
            </div>
            <div className="text-left">
              <h3 className="font-medium text-white">Web Development</h3>
              <p className="text-sm text-slate-400">
                Modern, responsive web applications with exceptional user experience
              </p>
            </div>
          </div>
        </motion.div> 

        {/* CTA buttons */}
        <motion.div
                 initial={{ opacity: 0, y: 40 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 1 }}
                  className="mt-6 flex gap-4">
          <button onClick={nabigate} className=" text-white px-6 py-2 border font-semibold border-white/70 rounded-full hover:bg-white hover:text-black transition">
            Get Started
          </button>
          {/* <button className="px-6 py-2 border border-white rounded-full hover:bg-white hover:text-black transition">
            LEARN MORE
          </button> */}
        </motion.div>
      </div>
    </section>
  );
}