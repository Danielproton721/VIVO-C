'use client';

import React from 'react';
import { ShieldCheck, Clock, Zap, Gift } from 'lucide-react';
import { motion } from 'framer-motion';

const benefits = [
  {
    icon: <Zap className="text-vivo-purple" size={20} />,
    title: 'Rapidez',
    description: 'Créditos em minutos'
  },
  {
    icon: <ShieldCheck className="text-vivo-purple" size={20} />,
    title: 'Segurança',
    description: 'Dados 100% protegidos'
  },
  {
    icon: <Clock className="text-vivo-purple" size={20} />,
    title: 'Disponibilidade',
    description: '24 horas por dia'
  },
  {
    icon: <Gift className="text-vivo-purple" size={20} />,
    title: 'Bônus',
    description: 'Internet extra inclusa'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
  }
};

export const Benefits = () => {
  return (
    <section className="py-16 border-t border-gray-100 bg-gray-50/30">
      <div className="v-container">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {benefits.map((benefit, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="flex items-center gap-4 group"
            >
              <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center shrink-0 transition-all group-hover:bg-vivo-purple/10 group-hover:shadow-md">
                {benefit.icon}
              </div>
              <div>
                <h3 className="text-sm font-bold text-vivo-text group-hover:text-vivo-purple transition-colors">{benefit.title}</h3>
                <p className="text-[11px] text-gray-400">{benefit.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
