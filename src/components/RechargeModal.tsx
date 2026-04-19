"use client";

import React, { useState, useEffect, useCallback } from "react";
import { X, Copy, Check, Clock } from "lucide-react";
import Image from "next/image";

interface RechargeModalProps {
  value: number | null;
  variant?: string;
  onClose: () => void;
}

interface PixData {
  txid: string;
  qrCode: string;
  expiresAt: string;
  amount: number;
  phone: string;
}

type Step = "form" | "payment";

function formatPhone(raw: string): string {
  let v = raw.replace(/\D/g, "").slice(0, 11);
  if (v.length > 2) v = `(${v.slice(0, 2)}) ${v.slice(2)}`;
  if (v.length > 10) v = `${v.slice(0, 10)}-${v.slice(10)}`;
  return v;
}

function formatCPF(raw: string): string {
  let v = raw.replace(/\D/g, "").slice(0, 11);
  if (v.length > 9) v = `${v.slice(0, 3)}.${v.slice(3, 6)}.${v.slice(6, 9)}-${v.slice(9)}`;
  else if (v.length > 6) v = `${v.slice(0, 3)}.${v.slice(3, 6)}.${v.slice(6)}`;
  else if (v.length > 3) v = `${v.slice(0, 3)}.${v.slice(3)}`;
  return v;
}

function formatDisplayPhone(digits: string): string {
  const v = digits.replace(/\D/g, "").slice(0, 11);
  if (v.length > 6) return `(${v.slice(0, 2)}) ${v.slice(2, 7)}-${v.slice(7)}`;
  if (v.length > 2) return `(${v.slice(0, 2)}) ${v.slice(2)}`;
  return v;
}

export function RechargeModal({ value, variant, onClose }: RechargeModalProps) {
  const [step, setStep] = useState<Step>("form");
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [pixData, setPixData] = useState<PixData | null>(null);
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [totalTime, setTotalTime] = useState(0);

  const nameDigits = name.trim();
  const cpfDigits = cpf.replace(/\D/g, "");
  const phoneDigits = phone.replace(/\D/g, "");
  const isFormValid =
    nameDigits.length >= 3 && cpfDigits.length === 11 && phoneDigits.length >= 10;

  // Lock scroll & ESC
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  // Timer countdown
  useEffect(() => {
    if (step !== "payment" || !pixData) return;
    const expires = new Date(pixData.expiresAt).getTime();
    const now = Date.now();
    const total = Math.max(0, Math.floor((expires - now) / 1000));
    setTotalTime(total);
    setTimeLeft(total);

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [step, pixData]);

  const handleClose = useCallback(() => {
    setStep("form");
    setName("");
    setCpf("");
    setPhone("");
    setLoading(false);
    setApiError(null);
    setPixData(null);
    setCopied(false);
    onClose();
  }, [onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setApiError(null);

    try {
      const res = await fetch("/api/pix/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          value,
          variant,
          phone: phoneDigits,
          name: nameDigits,
          cpf: cpfDigits,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setApiError(data.detail ?? data.error ?? "Erro ao gerar PIX. Tente novamente.");
        return;
      }

      setPixData(data);
      setStep("payment");
    } catch {
      setApiError("Erro de conexão. Verifique sua internet e tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!pixData?.qrCode) return;
    await navigator.clipboard.writeText(pixData.qrCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");
  const progress = totalTime > 0 ? (timeLeft / totalTime) * 100 : 0;
  const expired = timeLeft === 0 && step === "payment";

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 px-0 sm:px-4"
      onClick={handleClose}
      aria-modal="true"
      role="dialog"
      aria-label="Modal de recarga"
    >
      <div
        className="bg-white w-full max-w-[440px] rounded-t-2xl sm:rounded-2xl shadow-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Image src="/logo-vivo.png" alt="Vivo" width={56} height={20} className="object-contain" />
          </div>
          <button
            onClick={handleClose}
            aria-label="Fechar modal"
            className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full"
          >
            <X size={20} />
          </button>
        </div>

        {/* Conteúdo */}
        <div className="px-5 py-5 sm:px-6">
          {step === "form" && (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Faça uma recarga e aproveite para falar e navegar ainda mais.
                </p>
                <p className="text-base font-bold text-vivo-purple mt-1">
                  {variant ?? (value ? `Recarga de R$ ${value},00` : "Recarga")}
                </p>
              </div>

              {/* Nome */}
              <div className="flex flex-col gap-1">
                <label htmlFor="modal-name" className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                  Nome completo
                </label>
                <input
                  id="modal-name"
                  type="text"
                  aria-label="Nome completo"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Seu nome completo"
                  className="v-input text-sm"
                  autoComplete="name"
                  required
                />
              </div>

              {/* CPF */}
              <div className="flex flex-col gap-1">
                <label htmlFor="modal-cpf" className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                  CPF
                </label>
                <input
                  id="modal-cpf"
                  type="text"
                  inputMode="numeric"
                  aria-label="CPF"
                  value={cpf}
                  onChange={(e) => setCpf(formatCPF(e.target.value))}
                  placeholder="000.000.000-00"
                  className="v-input text-sm"
                  autoComplete="off"
                  required
                />
              </div>

              {/* Telefone */}
              <div className="flex flex-col gap-1">
                <label htmlFor="modal-phone" className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                  Número de celular
                </label>
                <input
                  id="modal-phone"
                  type="tel"
                  inputMode="tel"
                  aria-label="Número de celular"
                  value={phone}
                  onChange={(e) => setPhone(formatPhone(e.target.value))}
                  placeholder="(00) 00000-0000"
                  className="v-input text-sm"
                  autoComplete="tel"
                  required
                />
              </div>

              {apiError && (
                <p className="text-red-500 text-xs bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                  {apiError}
                </p>
              )}

              <button
                type="submit"
                disabled={!isFormValid || loading}
                className="v-button-primary w-full mt-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Aguarde..." : "Continuar"}
              </button>
            </form>
          )}

          {step === "payment" && pixData && (
            <div className="flex flex-col gap-4">
              <div>
                <h2 className="text-base font-bold text-vivo-text">Pagamento via PIX</h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  Recarga de R$ {pixData.amount},00 para{" "}
                  <span className="font-medium">{formatDisplayPhone(pixData.phone)}</span>
                </p>
              </div>

              {/* Timer */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1 text-gray-500">
                    <Clock size={12} />
                    {expired ? "QR Code expirado" : "Expira em"}
                  </span>
                  {!expired && (
                    <span className="font-mono font-bold text-vivo-purple">
                      {minutes}:{seconds}
                    </span>
                  )}
                </div>
                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{
                      width: `${progress}%`,
                      backgroundColor: "#FFC400",
                    }}
                  />
                </div>
              </div>

              {expired ? (
                <div className="flex flex-col items-center gap-4 py-4">
                  <p className="text-sm text-gray-500 text-center">
                    O código PIX expirou. Gere uma nova recarga para continuar.
                  </p>
                  <button onClick={handleClose} className="v-button-primary">
                    Nova recarga
                  </button>
                </div>
              ) : (
                <>
                  {/* QR Code */}
                  <div className="flex justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=240x240&margin=0&data=${encodeURIComponent(pixData.qrCode)}`}
                      alt="QR Code PIX"
                      width={200}
                      height={200}
                      className="rounded-xl border border-gray-100 shadow-sm"
                    />
                  </div>

                  {/* Status */}
                  <div className="flex items-center justify-center gap-2">
                    <span
                      className="w-2 h-2 rounded-full animate-pulse"
                      style={{ backgroundColor: "#FFC400" }}
                    />
                    <span className="text-xs text-gray-500 font-medium">Aguardando pagamento</span>
                  </div>

                  {/* Código copia-e-cola */}
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-3">
                    <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
                      Código PIX copia e cola
                    </p>
                    <p className="font-mono text-[11px] text-gray-700 break-all leading-relaxed">
                      {pixData.qrCode}
                    </p>
                  </div>

                  {/* Botão copiar */}
                  <button
                    onClick={handleCopy}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-v-button border-2 border-vivo-purple text-vivo-purple font-bold text-sm transition-all hover:bg-vivo-purple/5 active:scale-[0.98]"
                  >
                    {copied ? (
                      <>
                        <Check size={16} />
                        Código copiado!
                      </>
                    ) : (
                      <>
                        <Copy size={16} />
                        Copiar código PIX
                      </>
                    )}
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
