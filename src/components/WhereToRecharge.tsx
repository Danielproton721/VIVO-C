import Image from "next/image";
import { ChevronRight } from "lucide-react";

export function WhereToRecharge() {
  return (
    <section className="w-full bg-white px-4 pb-10">
      <div className="max-w-[1200px] mx-auto">
        <h2 className="text-vivo-purple text-xs md:text-sm font-bold uppercase tracking-wide mb-3">
          Onde recarregar
        </h2>

        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
          {/* App Vivo */}
          <a
            href="#"
            className="flex items-center gap-4 p-4 md:p-5 hover:bg-gray-50 transition-colors"
          >
            <div className="relative w-14 h-14 md:w-16 md:h-16 shrink-0 rounded-xl overflow-hidden">
              <Image
                src="/icon-app-vivo.png"
                alt="App Vivo"
                fill
                sizes="64px"
                className="object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-gray-900 font-bold text-base md:text-lg leading-tight">
                App Vivo
              </h3>
              <p className="text-gray-500 text-sm leading-snug mt-1">
                Nossos serviços e facilidades em um só lugar. Tudo de forma simples, rápida e segura
              </p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400 shrink-0" strokeWidth={2.5} />
          </a>

          {/* Divider */}
          <div className="mx-4 md:mx-5 h-px bg-gray-200" />

          {/* WhatsApp */}
          <a
            href="#"
            className="flex items-center gap-4 p-4 md:p-5 hover:bg-gray-50 transition-colors"
          >
            <div className="relative w-14 h-14 md:w-16 md:h-16 shrink-0 flex items-center justify-center">
              <Image
                src="/icon-whatsapp.svg"
                alt="WhatsApp"
                width={56}
                height={56}
                className="w-full h-full"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-gray-900 font-bold text-base md:text-lg leading-tight">
                WhatsApp
              </h3>
              <p className="text-gray-500 text-sm leading-snug mt-1">
                Adicione o número (11) 99915-1515 e converse pra recarregar, consultar saldo e muito mais
              </p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400 shrink-0" strokeWidth={2.5} />
          </a>
        </div>
      </div>
    </section>
  );
}
