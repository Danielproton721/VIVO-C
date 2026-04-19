import Image from "next/image";

export function ScheduledRechargeBanner() {
  return (
    <section className="w-full bg-white px-4 pb-8 md:pb-12">
      <div className="mx-auto max-w-md md:max-w-2xl">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-neutral-600 md:text-sm">
          Exclusivo pra cliente Pré
        </p>

        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#6a0dad] via-[#8b1dbf] to-[#b026d3] shadow-lg">
          {/* Imagem de fundo (homem com celular) */}
          <div className="pointer-events-none absolute bottom-0 right-0 h-full w-[55%] md:w-[50%]">
            <Image
              src="/banner-recarga-agendada.png"
              alt="Homem segurando celular com tela roxa"
              fill
              sizes="(max-width: 768px) 55vw, 400px"
              className="object-contain object-bottom-right"
              priority={false}
            />
          </div>

          {/* Conteúdo textual */}
          <div className="relative z-10 flex flex-col gap-3 p-5 md:p-7">
            {/* Logo Pré */}
            <div className="flex items-center gap-1.5">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z"
                  fill="white"
                />
              </svg>
              <span className="text-lg font-semibold text-white md:text-xl">Pré</span>
            </div>

            {/* Espaço para a imagem aparecer */}
            <div className="h-16 md:h-20" />

            {/* Badge */}
            <div className="inline-flex w-fit items-center rounded-full bg-white px-4 py-1.5 shadow-sm">
              <span className="text-xs font-semibold text-[#6a0dad] md:text-sm">
                Recarga agendada
              </span>
            </div>

            {/* Título */}
            <h3 className="max-w-[60%] text-balance text-xl font-bold leading-tight text-white md:max-w-[65%] md:text-2xl">
              Bônus de 10GB todo mês
            </h3>

            {/* Descrição */}
            <p className="max-w-[60%] text-pretty text-sm leading-relaxed text-white/90 md:max-w-[65%] md:text-base">
              Defina valor e dia da recarga e receba seus 10GB de bônus todo mês.
            </p>

            {/* Botão */}
            <button
              type="button"
              className="mt-2 inline-flex w-fit items-center rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-[#6a0dad] shadow-sm transition-colors hover:bg-neutral-100 md:text-base"
            >
              Agendar agora
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
