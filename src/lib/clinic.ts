import {
  Sparkles,
  ShieldCheck,
  Smile,
  Baby,
  Stethoscope,
  HeartPulse,
  type LucideIcon,
} from "lucide-react";

export const clinic = {
  name: "Sorriso Vivo",
  tagline: "Odontologia completa em São Paulo",
  address: "Rua Haddock Lobo, 1200 — Cerqueira César, São Paulo/SP",
  phone: "(11) 3456-7890",
  phoneHref: "tel:+551134567890",
  whatsapp: "(11) 98765-4321",
  whatsappHref: "https://wa.me/5511987654321",
  email: "contato@sorrisovivo.com.br",
  hours: [
    { days: "Segunda a sexta", time: "8h às 20h" },
    { days: "Sábado", time: "8h às 13h" },
  ],
};

export type Service = {
  slug: string;
  title: string;
  short: string;
  description: string;
  icon: LucideIcon;
};

export const services: Service[] = [
  {
    slug: "clinica-geral",
    title: "Clínica geral",
    short: "Check-ups, limpeza e prevenção para toda a família.",
    description:
      "Avaliação completa, profilaxia, restaurações e orientação de higiene para manter sua saúde bucal em dia.",
    icon: Stethoscope,
  },
  {
    slug: "ortodontia",
    title: "Ortodontia",
    short: "Aparelhos fixos e alinhadores transparentes.",
    description:
      "Correção do alinhamento dos dentes e da mordida com aparelhos tradicionais, estéticos ou alinhadores invisíveis.",
    icon: Smile,
  },
  {
    slug: "implantes",
    title: "Implantes dentários",
    short: "Reposição de dentes com segurança e naturalidade.",
    description:
      "Planejamento digital e implantes de titânio para devolver função, conforto e estética ao seu sorriso.",
    icon: ShieldCheck,
  },
  {
    slug: "estetica",
    title: "Estética dental",
    short: "Clareamento, lentes e facetas de porcelana.",
    description:
      "Tratamentos que harmonizam cor, forma e proporção dos dentes, sempre preservando a naturalidade.",
    icon: Sparkles,
  },
  {
    slug: "odontopediatria",
    title: "Odontopediatria",
    short: "Cuidado leve e acolhedor para os pequenos.",
    description:
      "Atendimento lúdico e paciente para crianças, com foco em prevenção e em criar uma relação tranquila com o dentista.",
    icon: Baby,
  },
  {
    slug: "endodontia",
    title: "Endodontia e periodontia",
    short: "Tratamento de canal e saúde da gengiva.",
    description:
      "Tratamentos de canal com tecnologia rotatória e cuidado da gengiva para preservar seus dentes naturais.",
    icon: HeartPulse,
  },
];
