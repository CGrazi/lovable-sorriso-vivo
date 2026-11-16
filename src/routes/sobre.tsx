import { createFileRoute, Link } from "@tanstack/react-router";
import { HeartHandshake, Cpu, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/clinica-hero.jpg";
import careImg from "@/assets/atendimento.jpg";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "A clínica — Sorriso Vivo Odontologia" },
      {
        name: "description",
        content:
          "Conheça a Sorriso Vivo: clínica odontológica em São Paulo com atendimento humano, tecnologia e especialistas.",
      },
      { property: "og:title", content: "A clínica — Sorriso Vivo Odontologia" },
      {
        property: "og:description",
        content: "Atendimento humano, tecnologia e especialistas em uma clínica acolhedora em São Paulo.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Sobre,
});

const values = [
  {
    icon: HeartHandshake,
    title: "Atendimento humano",
    text: "Consultas sem pressa, com escuta atenta e explicações claras em cada etapa.",
  },
  {
    icon: Cpu,
    title: "Tecnologia a seu favor",
    text: "Scanner intraoral, radiografia digital e planejamento 3D para tratamentos mais precisos.",
  },
  {
    icon: Leaf,
    title: "Conforto e segurança",
    text: "Ambiente tranquilo, protocolos rigorosos de biossegurança e opções de sedação leve.",
  },
];

function Sobre() {
  return (
    <>
      <section className="bg-hero">
        <div className="container-site grid gap-12 py-16 md:py-24 lg:grid-cols-2 lg:items-end">
          <div>
            <p className="eyebrow">A clínica</p>
            <h1 className="mt-5 text-5xl md:text-6xl">
              Odontologia feita com <em className="italic text-primary">calma</em>, ciência e
              carinho.
            </h1>
          </div>
          <p className="text-lg leading-relaxed text-muted-foreground">
            A Sorriso Vivo nasceu em São Paulo com uma ideia simples: ir ao dentista pode ser uma
            experiência leve. Reunimos especialistas de diferentes áreas em um espaço iluminado e
            acolhedor, para cuidar de cada paciente como gostaríamos de ser cuidados.
          </p>
        </div>
      </section>

      <section className="container-site py-16 md:py-24">
        <img
          src={heroImg}
          alt="Interior da clínica Sorriso Vivo com vista para São Paulo"
          width={1600}
          height={1104}
          loading="lazy"
          className="aspect-[16/8] w-full rounded-4xl object-cover"
        />
        <div className="mt-16 grid gap-10 md:grid-cols-3">
          {values.map((v) => (
            <div key={v.title}>
              <span className="grid size-12 place-items-center rounded-2xl bg-secondary text-primary">
                <v.icon className="size-6" />
              </span>
              <h2 className="mt-5 text-3xl">{v.title}</h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-ink text-ink-foreground">
        <div className="container-site grid items-center gap-12 py-20 md:grid-cols-[1fr_1.1fr] md:py-28">
          <img
            src={careImg}
            alt="Dentista da Sorriso Vivo em consulta com paciente"
            width={1200}
            height={1408}
            loading="lazy"
            className="aspect-square w-full rounded-4xl object-cover"
          />
          <div>
            <p className="eyebrow text-ink-muted">Nossa equipe</p>
            <h2 className="mt-4 text-4xl md:text-5xl">
              Especialistas que trabalham juntos pelo seu sorriso.
            </h2>
            <p className="mt-5 leading-relaxed text-ink-muted">
              Clínicos gerais, ortodontistas, implantodontistas, odontopediatras e especialistas em
              estética discutem cada caso em conjunto. Assim, você recebe um plano completo e
              coerente, sem precisar procurar vários consultórios.
            </p>
            <Button asChild variant="accent" size="xl" className="mt-10">
              <Link to="/contato">Agendar uma visita</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
