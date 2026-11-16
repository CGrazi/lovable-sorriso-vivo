import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { services } from "@/lib/clinic";
import heroImg from "@/assets/clinica-hero.jpg";
import careImg from "@/assets/atendimento.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sorriso Vivo — Clínica Odontológica em São Paulo" },
      {
        name: "description",
        content:
          "Odontologia moderna e acolhedora em São Paulo: clínica geral, ortodontia, implantes e estética. Agende sua consulta.",
      },
      { property: "og:title", content: "Sorriso Vivo — Clínica Odontológica em São Paulo" },
      {
        property: "og:description",
        content: "Odontologia moderna e acolhedora em São Paulo. Agende sua consulta online.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const stats = [
  { value: "15+", label: "anos de experiência" },
  { value: "12 mil", label: "pacientes atendidos" },
  { value: "6", label: "especialidades" },
];

function Index() {
  return (
    <>
      {/* Hero */}
      <section className="bg-hero">
        <div className="container-site grid items-center gap-12 py-16 md:py-24 lg:grid-cols-[1.05fr_1fr]">
          <div className="animate-rise">
            <p className="eyebrow">Clínica odontológica · São Paulo</p>
            <h1 className="mt-5 text-5xl text-foreground sm:text-6xl lg:text-7xl">
              Cuidado de verdade para um sorriso <em className="italic text-primary">vivo</em>.
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
              Na Sorriso Vivo, unimos tecnologia, especialistas experientes e um atendimento sem
              pressa para cuidar da saúde e da beleza do seu sorriso.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button asChild variant="hero" size="xl">
                <Link to="/contato">
                  Agendar consulta <ArrowRight />
                </Link>
              </Button>
              <Button asChild variant="outline-pill" size="xl">
                <Link to="/servicos">Conhecer serviços</Link>
              </Button>
            </div>
            <div className="mt-10 flex items-center gap-3 text-sm text-muted-foreground">
              <div className="flex text-accent-foreground">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4 fill-accent stroke-accent-foreground/60" />
                ))}
              </div>
              Atendimento avaliado com nota máxima por nossos pacientes
            </div>
          </div>
          <div className="relative animate-rise [animation-delay:150ms]">
            <img
              src={heroImg}
              alt="Consultório moderno e iluminado da clínica Sorriso Vivo"
              width={1600}
              height={1104}
              className="aspect-[4/3.4] w-full rounded-4xl object-cover shadow-lift"
            />
            <div className="absolute -bottom-6 left-6 rounded-2xl bg-card px-5 py-4 shadow-soft sm:left-[-1.5rem]">
              <p className="font-display text-3xl text-primary">Seg a sáb</p>
              <p className="text-sm text-muted-foreground">Horários estendidos até 20h</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border bg-card">
        <div className="container-site grid grid-cols-3 divide-x divide-border py-10">
          {stats.map((s) => (
            <div key={s.label} className="px-2 text-center">
              <p className="font-display text-4xl text-primary md:text-5xl">{s.value}</p>
              <p className="mt-1 text-xs text-muted-foreground md:text-sm">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services preview */}
      <section className="container-site py-20 md:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <p className="eyebrow">Serviços</p>
            <h2 className="mt-4 text-4xl md:text-5xl">Tudo para o seu sorriso, em um só lugar.</h2>
          </div>
          <Button asChild variant="link" className="px-0 text-base">
            <Link to="/servicos">
              Ver todos os serviços <ArrowRight />
            </Link>
          </Button>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <div
              key={s.slug}
              className="group rounded-3xl border border-border bg-card p-7 transition-all hover:-translate-y-1 hover:shadow-soft"
            >
              <span className="grid size-12 place-items-center rounded-2xl bg-secondary text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <s.icon className="size-6" />
              </span>
              <h3 className="mt-6 text-2xl">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.short}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About teaser */}
      <section className="bg-secondary/60">
        <div className="container-site grid items-center gap-12 py-20 md:grid-cols-2 md:py-28">
          <img
            src={careImg}
            alt="Dentista conversando com paciente sorridente"
            width={1200}
            height={1408}
            loading="lazy"
            className="aspect-[4/4.4] w-full rounded-4xl object-cover"
          />
          <div>
            <p className="eyebrow">Por que a Sorriso Vivo</p>
            <h2 className="mt-4 text-4xl md:text-5xl">Um atendimento que começa pela escuta.</h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              Cada plano de tratamento é pensado para você, com explicações claras, orçamento
              transparente e o tempo que for preciso para tirar todas as dúvidas.
            </p>
            <ul className="mt-8 space-y-4">
              {[
                "Diagnóstico digital e radiografia de baixa dose",
                "Especialistas em cada área, trabalhando juntos",
                "Ambiente confortável, pensado para quem tem medo de dentista",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
                    <Check className="size-3.5" />
                  </span>
                  <span className="text-foreground">{item}</span>
                </li>
              ))}
            </ul>
            <Button asChild variant="outline-pill" size="xl" className="mt-10">
              <Link to="/sobre">Conheça a clínica</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-site py-20 md:py-28">
        <div className="relative overflow-hidden rounded-4xl bg-primary-gradient px-8 py-16 text-center text-primary-foreground md:px-16">
          <h2 className="mx-auto max-w-2xl text-4xl md:text-5xl">
            Pronto para cuidar do seu sorriso?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-primary-foreground/80">
            Envie seu pedido de agendamento e nossa equipe entra em contato para confirmar o
            melhor horário.
          </p>
          <Button asChild variant="accent" size="xl" className="mt-8">
            <Link to="/contato">
              Agendar minha consulta <ArrowRight />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
