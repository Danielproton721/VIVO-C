import React from 'react';

export const Footer = () => {
  return (
    <footer className="bg-[#F8F9FA] pt-12 pb-8 px-4 border-t border-gray-100">
      <div className="max-w-[1200px] mx-auto">
        {/* Navigation Links */}
        <div className="flex flex-col gap-5 mb-10">
          <a href="#" className="text-[13px] font-bold text-vivo-text border-b border-gray-200 pb-1 w-fit">
            Acessibilidade
          </a>
          <a href="#" className="text-[13px] font-bold text-vivo-text border-b border-gray-200 pb-1 w-fit">
            Privacidade
          </a>
          <a href="#" className="text-[13px] font-bold text-vivo-text border-b border-gray-200 pb-1 w-fit">
            Fale conosco
          </a>
          <a href="#" className="text-[13px] font-bold text-vivo-text border-b border-gray-200 pb-1 w-fit">
            Encontre uma Loja
          </a>
        </div>

        {/* Viva Tudo Section */}
        <div className="bg-white p-6 rounded-2xl mb-12 shadow-sm border border-gray-50">
          <h3 className="text-sm font-bold text-vivo-text mb-2">Viva Tudo</h3>
          <p className="text-xs text-gray-500">5G, Ultra Banda Larga, HDTV, Voz e mais.</p>
          
          <div className="mt-8 flex flex-col items-center gap-10">
            {/* CBF Logo */}
            <img 
              src="/cbf-patrocinio.png" 
              alt="Patrocinadora oficial da Seleção" 
              className="h-12 w-auto object-contain"
            />
            
            {/* Vivo 5G Logo */}
            <img 
              src="/vivo-5g.png" 
              alt="Vivo 5G" 
              className="h-10 w-auto object-contain"
            />
            
            {/* Telefonica Logo Placeholder - Blue dots T */}
            <div className="flex items-center gap-2 opacity-80">
               <svg width="120" height="30" viewBox="0 0 120 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.5 5C12.5 6.38071 11.3807 7.5 10 7.5C8.61929 7.5 7.5 6.38071 7.5 5C7.5 3.61929 8.61929 2.5 10 2.5C11.3807 2.5 12.5 3.61929 12.5 5Z" fill="#0066FF"/>
                  <path d="M7.5 10C7.5 11.3807 6.38071 12.5 5 12.5C3.61929 12.5 2.5 11.3807 2.5 10C2.5 8.61929 3.61929 7.5 5 7.5C6.38071 7.5 7.5 8.61929 7.5 10Z" fill="#0066FF"/>
                  <path d="M17.5 10C17.5 11.3807 16.3807 12.5 15 12.5C13.6193 12.5 12.5 11.3807 12.5 10C12.5 8.61929 13.6193 7.5 15 7.5C16.3807 7.5 17.5 8.61929 17.5 10Z" fill="#0066FF"/>
                  <path d="M12.5 15C12.5 16.3807 11.3807 17.5 10 17.5C8.61929 17.5 7.5 16.3807 7.5 15C7.5 13.6193 8.61929 12.5 10 12.5C11.3807 12.5 12.5 13.6193 12.5 15Z" fill="#0066FF"/>
                  <path d="M12.5 25C12.5 26.3807 11.3807 27.5 10 27.5C8.61929 27.5 7.5 26.3807 7.5 25C7.5 23.6193 8.61929 22.5 10 22.5C11.3807 22.5 12.5 23.6193 12.5 25Z" fill="#0066FF"/>
                  <text x="25" y="20" className="text-[16px] font-bold fill-[#0066FF]">Telefónica</text>
               </svg>
            </div>
          </div>
        </div>

        {/* Copyright Text — rodapé final */}
        <div className="border-t border-gray-200 pt-6">
          <p className="text-[11px] text-gray-500 leading-relaxed text-center">
            Telefônica Brasil S.A CNPJ: 02.558.157/0001- 62. Copyright 2021 © Vivo. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};
