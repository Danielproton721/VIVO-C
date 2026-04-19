import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { value, variant, phone, name, cpf } = body;

    // Validação dos campos obrigatórios
    if (!value || !phone || !name || !cpf) {
      return NextResponse.json(
        { error: "Campos obrigatórios ausentes: value, phone, name, cpf" },
        { status: 400 }
      );
    }

    const key = process.env.PAGOUAI_SECRET_KEY?.trim();
    if (!key) {
      console.error("[pix] PAGOUAI_SECRET_KEY não configurada");
      return NextResponse.json(
        { error: "Configuração de pagamento ausente no servidor" },
        { status: 500 }
      );
    }

    const BASE_URL = process.env.PAGOUAI_BASE_URL ?? "https://api.conta.pagou.ai";
    const url = `${BASE_URL}/v1/transactions`;

    // Basic Auth: base64("KEY:x")
    const auth = Buffer.from(`${key}:x`).toString("base64");

    // Sanitizar campos
    const phoneDigits = String(phone).replace(/\D/g, "");
    const cpfDigits = String(cpf).replace(/\D/g, "");

    // Data de expiração: 1 hora a partir de agora
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000);
    const expirationDate = expiresAt.toISOString().split("T")[0];

    const payload = {
      amount: Math.round(value * 100),
      paymentMethod: "pix",
      customer: {
        name: String(name),
        email: `${phoneDigits}@recarga.local`,
        phone: phoneDigits,
        document: {
          number: cpfDigits,
          type: "cpf",
        },
      },
      items: [
        {
          title: variant || `Recarga R$ ${value},00`,
          quantity: 1,
          unitPrice: Math.round(value * 100),
          tangible: false,
        },
      ],
      pix: {
        expirationDate,
      },
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${auth}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("[pix] endpoint:", url);
      console.error("[pix] status:", response.status, JSON.stringify(data));
      return NextResponse.json(
        {
          error: "Erro no gateway de pagamento",
          detail: data?.message ?? data?.error ?? JSON.stringify(data),
        },
        { status: 502 }
      );
    }

    return NextResponse.json({
      txid: data.id ?? data.txid,
      qrCode: data.pix?.qrcode,
      expiresAt: data.pix?.expirationDate ?? expiresAt.toISOString(),
      amount: value,
      phone: phoneDigits,
    });
  } catch (err) {
    console.error("[pix] Erro interno:", err);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}
