'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const Hero = () => {
  return (
    <section className="relative w-full aspect-[3/1] md:aspect-[3.5/1] overflow-hidden bg-vivo-purple">
      <motion.img 
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        src="/banner-vivo.png" 
        alt="Promoção Vivo Pré" 
        className="w-full h-full object-cover md:object-fill"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-vivo-purple/20 to-transparent pointer-events-none" />
    </section>
  );
};
