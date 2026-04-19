'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { RechargeModal } from './RechargeModal';

interface Offer {
  id: number;
  totalInternet: string;
  price: string;
  details: string[];
  isFeatured: boolean;
}

const allOffers: Offer[] = [
  { id: 1, totalInternet: '25 GB de internet', price: '30', details: ['15 GB de uso livre', '5 GB de bônus', '5 GB de YouTube'], isFeatured: true },
  { id: 2, totalInternet: '11 GB de internet', price: '25', details: ['6 GB de uso livre', '2 GB de bônus', '3 GB de YouTube'], isFeatured: false },
  { id: 3, totalInternet: '6 GB de internet', price: '20', details: ['5 GB de uso livre', '1 GB de bônus'], isFeatured: false },
  { id: 4, totalInternet: '1 GB de internet', price: '17', details: ['500 MB de uso livre', '500 MB de bônus'], isFeatured: false },
  { id: 5, totalInternet: 'Sem bônus', price: '15', details: ['Recarga padrão'], isFeatured: false },
  { id: 6, totalInternet: '25 GB de internet', price: '35', details: ['10 GB de uso livre', '10 GB de bônus', '5 GB de YouTube'], isFeatured: false },
  { id: 7, totalInternet: '25 GB de internet', price: '40', details: ['10 GB de uso livre', '10 GB de bônus', '5 GB de YouTube'], isFeatured: false },
  { id: 8, totalInternet: '25 GB de internet', price: '50', details: ['10 GB de uso livre', '10 GB de bônus', '5 GB de YouTube'], isFeatured: false },
  { id: 9, totalInternet: '25 GB de internet', price: '60', details: ['10 GB de uso livre', '10 GB de bônus', '5 GB de YouTube'], isFeatured: false },
  { id: 10, totalInternet: '25 GB de internet', price: '100', details: ['10 GB de uso livre', '10 GB de bônus', '5 GB de YouTube'], isFeatured: false },
  { id: 11, totalInternet: '25 GB de internet', price: '200', details: ['10 GB de uso livre', '10 GB de bônus', '5 GB de YouTube'], isFeatured: false },
  { id: 12, totalInternet: '25 GB de internet', price: '300', details: ['10 GB de uso livre', '10 GB de bônus', '5 GB de YouTube'], isFeatured: false },
];

export const AmountGrid = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<number | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<string>('');

  const initialOffers = allOffers.slice(0, 4);
  const extraOffers = allOffers.slice(4);

  const handleSelectOffer = (offer: Offer) => {
    const value = Number(offer.price);
    const bonus = offer.totalInternet && offer.totalInternet !== 'Sem bônus'
      ? offer.totalInternet
      : '';
    const variant = bonus
      ? `Recarga R$ ${value},00 ${bonus}`
      : `Recarga R$ ${value},00`;

    setSelectedValue(value);
    setSelectedVariant(variant);
    setModalOpen(true);
  };

  return (
    <section className="py-8 bg-white px-4">
      <div className="max-w-[1200px] mx-auto">
        <div className="mb-6">
          <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">
            RECARGA DIGITAL
          </p>
          <h2 className="text-xl font-bold text-vivo-text">
            Escolha um valor de recarga
          </h2>
          <p className="text-gray-500 text-xs mt-0.5">
            Ganhe bônus de internet em sua recarga
          </p>
        </div>
        
        {/* Main Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {initialOffers.map((offer) => (
            <OfferCard key={offer.id} offer={offer} onSelect={handleSelectOffer} />
          ))}
        </div>

        {/* Drawer for extra offers */}
        <div className="overflow-hidden">
          <AnimatePresence initial={false}>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" as any }}
              >
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 pt-3">
                  {extraOffers.map((offer) => (
                    <OfferCard key={offer.id} offer={offer} onSelect={handleSelectOffer} />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full mt-6 py-3 border border-gray-200 rounded-full text-xs font-bold text-vivo-purple flex items-center justify-center gap-2 transition-all hover:bg-vivo-purple/5"
        >
          {isExpanded ? (
            <>Exibir menos valores <ChevronUp size={14} /></>
          ) : (
            <>Exibir mais valores <ChevronDown size={14} /></>
          )}
        </button>
      </div>

      {modalOpen && (
        <RechargeModal
          value={selectedValue}
          variant={selectedVariant}
          onClose={() => setModalOpen(false)}
        />
      )}
    </section>
  );
};

const OfferCard = ({ offer, onSelect }: { offer: Offer; onSelect: (offer: Offer) => void }) => (
  <motion.div
    whileHover={{ scale: 1.01 }}
    whileTap={{ scale: 0.99 }}
    className={`rounded-[16px] p-4 flex flex-col justify-between transition-all border shadow-sm ${
      offer.isFeatured 
      ? 'bg-vivo-purple text-white border-vivo-purple' 
      : 'bg-[#F6F6F6] text-vivo-text border-transparent'
    }`}
  >
    <div className="space-y-3">
      <span className={`inline-block px-2.5 py-1 rounded-full text-[9px] font-bold uppercase ${
        offer.isFeatured ? 'bg-white/20 text-white' : 'bg-[#EDE7F6] text-vivo-purple'
      }`}>
        {offer.totalInternet}
      </span>
      
      <div className="flex items-baseline gap-1">
        <span className="text-[10px] font-bold">R$</span>
        <span className="text-2xl font-bold tracking-tight">{offer.price}</span>
      </div>
      
      <ul className="space-y-1 opacity-80">
        {offer.details.map((detail, idx) => (
          <li key={idx} className="flex items-start gap-1.5 text-[9px] leading-tight">
            <span className="w-1 h-1 rounded-full bg-current mt-1 shrink-0" />
            {detail}
          </li>
        ))}
      </ul>
    </div>
    
    <button
      type="button"
      onClick={() => onSelect(offer)}
      className={`w-full py-2.5 mt-4 rounded-full font-bold text-[10px] transition-all relative overflow-hidden group ${
        offer.isFeatured 
        ? 'bg-white text-vivo-purple' 
        : 'bg-vivo-purple text-white'
      }`}
    >
      <span className="relative z-10">Recarregar</span>
    </button>
  </motion.div>
);
