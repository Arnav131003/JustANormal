import React from 'react';
import { Link } from 'react-router-dom';

import { ContainerScroll } from "./components/ui/container-scroll-animation";

import { LampContainer } from "./components/ui/lamp";
import { motion } from 'framer-motion';

const welcomeText = "Virtual Palette.ai";

const Welcome = () => {
  return (
    
    <div className="flex flex-col min-h-screen bg-white ">
      <div className="flex flex-col items-center justify-center flex-1" style={{ marginTop: '0px' }}>
        <LampContainer>
          <motion.h1
            initial={{ opacity: 0.5, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="mt-8 bg-gradient-to-br from-slate-100 to-slate-400 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-8xl"
          >
            Virtual Palette.ai <br />
            <Link to="/about" className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 mr-4">
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-6 py-1 text-lg font-medium text-white backdrop-blur-3xl">
              About
            </span>
          </Link>
          <Link to="/login" className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-lg font-semibold leading-6 text-white inline-block">
            <span className="absolute inset-0 overflow-hidden rounded-full">
              <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
            </span>
            <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-2 px-6 ring-1 ring-white/10">
              <span>Login</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.75 8.75L14.25 12L10.75 15.25"></path>
              </svg>
            </div>
            <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40"></span>
          </Link>
          </motion.h1>
        </LampContainer>
      </div>

      {/* ContainerScroll */}
      <div className="flex-1 overflow-hidden" style={{ marginTop: '.1px' }}>
        <ContainerScroll
          titleComponent={
            <>
              <h4 className="text-6xl md:text-5xl font-semibold text-black  mb-4">
                Empowering Education with
              </h4>
              <span className="text-5xl md:text-6xl font-bold mt-1  leading-none">
                Machine Learning & Computer Vision
              </span>
            </>
          }
        />
      </div>
     <footer />
    </div>
  );
};

export default Welcome;
