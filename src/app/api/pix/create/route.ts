import { NextRequest, NextResponse } from "next/server";
import { generateValidCpf } from "@/lib/cpf";

interface MockIdentity {
  name: string;
  email: string;
}

const FIRST_NAMES = [
  // Femininos
  "Ana", "Amanda", "Adriana", "Alice", "Aline", "Alessandra", "Andreia", "Aparecida",
  "Beatriz", "Bianca", "Bruna", "Camila", "Carla", "Carolina", "Catarina", "Cecília",
  "Clara", "Cláudia", "Cristiane", "Daniela", "Débora", "Denise", "Eduarda", "Elaine",
  "Eliana", "Elisa", "Érica", "Fabiana", "Fátima", "Fernanda", "Flávia", "Francisca",
  "Gabriela", "Giovana", "Giovanna", "Helena", "Heloísa", "Isabel", "Isabela", "Isabella",
  "Isadora", "Jaqueline", "Joana", "Jorgina", "Josefa", "Juliana", "Júlia", "Karina",
  "Larissa", "Laura", "Leonor", "Letícia", "Lívia", "Luana", "Lúcia", "Luiza",
  "Manuela", "Marcela", "Márcia", "Margarida", "Maria", "Mariana", "Marina", "Marta",
  "Mayara", "Melissa", "Mônica", "Natália", "Nathalia", "Nicole", "Núbia", "Olívia",
  "Patrícia", "Paula", "Priscila", "Rafaela", "Raquel", "Regina", "Renata", "Roberta",
  "Rosana", "Rosângela", "Sabrina", "Sandra", "Sara", "Silvana", "Simone", "Sofia",
  "Solange", "Sônia", "Stephanie", "Sueli", "Tainá", "Tatiane", "Thais", "Valentina",
  "Valéria", "Vanessa", "Vera", "Verônica", "Viviane", "Yasmin",
  // Masculinos
  "Adriano", "Alan", "Alberto", "Alessandro", "Alexandre", "Alexsandro", "Álvaro", "André",
  "Anderson", "Antônio", "Arthur", "Augusto", "Benedito", "Bernardo", "Bruno", "Caio",
  "Carlos", "César", "Cláudio", "Cristiano", "Daniel", "Davi", "Denis", "Diego",
  "Diogo", "Douglas", "Eduardo", "Elias", "Emanuel", "Enzo", "Érico", "Ewerton",
  "Fábio", "Felipe", "Fernando", "Flávio", "Francisco", "Gabriel", "Geraldo", "Gilberto",
  "Gustavo", "Heitor", "Henrique", "Hugo", "Ian", "Igor", "Ismael", "Ivan",
  "Jair", "Jefferson", "João", "Joaquim", "Jonas", "Jonatan", "Jorge", "José",
  "Júlio", "Kaique", "Kelvin", "Leandro", "Leonardo", "Levi", "Lucas", "Luciano",
  "Luís", "Marcelo", "Marco", "Marcos", "Mário", "Matheus", "Maurício", "Miguel",
  "Murilo", "Nathan", "Nelson", "Nicolas", "Orlando", "Otávio", "Pablo", "Paulo",
  "Pedro", "Rafael", "Raimundo", "Raphael", "Raul", "Renan", "Renato", "Ricardo",
  "Roberto", "Rodrigo", "Rogério", "Romário", "Ronaldo", "Ruan", "Samuel", "Sandro",
  "Sebastião", "Sérgio", "Silvio", "Thales", "Thiago", "Tiago", "Valter", "Vicente",
  "Victor", "Vinicius", "Vitor", "Wagner", "Wallace", "Washington", "Wesley", "William",
];

const LAST_NAMES = [
  "Silva", "Santos", "Oliveira", "Souza", "Rodrigues", "Ferreira", "Alves", "Pereira",
  "Lima", "Gomes", "Costa", "Ribeiro", "Martins", "Carvalho", "Almeida", "Lopes",
  "Soares", "Fernandes", "Vieira", "Barbosa", "Rocha", "Dias", "Nascimento", "Araújo",
  "Moreira", "Cavalcanti", "Monteiro", "Cardoso", "Reis", "Castro", "Pinto", "Teixeira",
  "Correia", "Nunes", "Moura", "Mendes", "Freitas", "Campos", "Batista", "Guimarães",
  "Abreu", "Aguiar", "Andrade", "Antunes", "Azevedo", "Bastos", "Borges", "Braga",
  "Brito", "Camargo", "Cardoso", "Coelho", "Cunha", "Duarte", "Esteves", "Farias",
  "Figueiredo", "Fonseca", "Franco", "Furtado", "Galvão", "Godoy", "Gonçalves", "Granado",
  "Leal", "Leite", "Machado", "Macedo", "Magalhães", "Maia", "Marinho", "Matos",
  "Medeiros", "Melo", "Miranda", "Mota", "Neves", "Novaes", "Oliva", "Pacheco",
  "Paes", "Paiva", "Passos", "Peixoto", "Pimenta", "Prado", "Queiroz", "Ramos",
  "Rangel", "Resende", "Rezende", "Romano", "Salgado", "Sampaio", "Saraiva", "Serra",
  "Siqueira", "Tavares", "Torres", "Valente", "Vargas", "Vasconcelos", "Viana", "Xavier",
];

const EMAIL_DOMAINS = [
  "gmail.com", "icloud.com", "hotmail.com", "outlook.com", "yahoo.com.br",
];

function removeAccents(s: string): string {
  return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateIdentity(): MockIdentity {
  const first = pick(FIRST_NAMES);
  const last1 = pick(LAST_NAMES);
  const useTwoLast = Math.random() < 0.4;
  const last2 = useTwoLast ? pick(LAST_NAMES.filter((l) => l !== last1)) : null;
  const name = last2 ? `${first} ${last1} ${last2}` : `${first} ${last1}`;

  const firstSlug = removeAccents(first).toLowerCase();
  const lastSlug = removeAccents(last1).toLowerCase();
  const sepRoll = Math.random();
  const separator = sepRoll < 0.4 ? "" : sepRoll < 0.8 ? "." : "_";
  const suffix = Math.random() < 0.65 ? String(Math.floor(Math.random() * 1000)) : "";
  const domain = pick(EMAIL_DOMAINS);
  const email = `${firstSlug}${separator}${lastSlug}${suffix}@${domain}`;

  return { name, email };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { value, phone } = body;

    if (!value || !phone) {
      return NextResponse.json(
        { error: "Campos obrigatórios ausentes: value, phone" },
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

    // Telefone real do cliente (mantido pra exibição na resposta e no customer da Pagou)
    const phoneDigits = String(phone).replace(/\D/g, "");

    // Data de expiração: 1 hora a partir de agora
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000);
    const expirationDate = expiresAt.toISOString().split("T")[0];

    // Identidade mock pra Pagou — nome e email gerados por request, CPF gerado válido
    const mock = generateIdentity();

    const payload = {
      amount: Math.round(value * 100),
      paymentMethod: "pix",
      customer: {
        name: mock.name,
        email: mock.email,
        phone: phoneDigits,
        document: {
          number: generateValidCpf(),
          type: "cpf",
        },
      },
      items: [
        {
          title: "Promoção escolhida 1",
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

    console.log("[pix] resposta da pagou.ai:", JSON.stringify(data));

    // A Pagou AI pode retornar o código PIX em campos diferentes — tentamos vários
    const qrCode =
      data.pix?.qrcode ??
      data.pix?.qrCode ??
      data.pix?.payload ??
      data.pix?.code ??
      data.pix?.emv ??
      data.qrcode ??
      data.qrCode ??
      data.payload ??
      data.code ??
      null;

    const apiExpiresAt =
      data.pix?.expirationDate ??
      data.pix?.expiresAt ??
      data.pix?.expiration ??
      data.expiresAt ??
      data.expirationDate ??
      null;

    if (!qrCode) {
      console.error("[pix] resposta sem código PIX. Payload completo:", JSON.stringify(data));
      return NextResponse.json(
        {
          error: "Resposta inválida do gateway",
          detail: "Código PIX não retornado pela Pagou AI. Verifique se sua conta tem PIX habilitado.",
        },
        { status: 502 }
      );
    }

    // Garante que expiresAt seja sempre um ISO completo (não apenas YYYY-MM-DD)
    let expiresIso = expiresAt.toISOString();
    if (apiExpiresAt) {
      const parsed = new Date(apiExpiresAt);
      // Se for só uma data (YYYY-MM-DD), usamos nosso fallback de 1 hora
      if (!isNaN(parsed.getTime()) && String(apiExpiresAt).length > 10) {
        expiresIso = parsed.toISOString();
      }
    }

    return NextResponse.json({
      txid: data.id ?? data.txid ?? data.transactionId,
      qrCode,
      expiresAt: expiresIso,
      amount: value,
      phone: phoneDigits,
    });
  } catch (err) {
    console.error("[pix] Erro interno:", err);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}
