import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { services } from "@/lib/clinic";
import servicosImg from "@/assets/servicos.jpg";

export const Route = createFileRoute("/servicos")({
  head: () => ({
    meta: [
      { title: "Serviços odontológicos — Sorriso Vivo São Paulo" },
      {
        name: "description",
        content:
          "Clínica geral, ortodontia, implantes, estética dental, odontopediatria, endodontia e periodontia na Sorriso Vivo.",
      },
      { property: "og:title", content: "Serviços odontológicos — Sorriso Vivo" },
      {
        property: "og:description",
        content: "Conheça todos os tratamentos da clínica Sorriso Vivo, em São Paulo.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Servicos,
});

function Servicos() {
  return (
    <>
      <section className="bg-hero">
        <div className="container-site py-16 md:py-24">
          <p className="eyebrow">Nossos serviços</p>
          <h1 className="mt-5 max-w-3xl text-5xl md:text-6xl">
            Tratamentos completos, do check-up ao sorriso dos sonhos.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            Especialistas em cada área trabalhando juntos para oferecer o tratamento certo para você.
          </p>
        </div>
      </section>

      <section className="container-site py-16 md:py-24">
        <div className="grid gap-px overflow-hidden rounded-4xl border border-border bg-border md:grid-cols-2">
          {services.map((s, i) => (
            <article key={s.slug} className="flex gap-6 bg-card p-8 md:p-10">
              <span className="font-display text-2xl text-primary/40">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <span className="grid size-12 place-items-center rounded-2xl bg-secondary text-primary">
                  <s.icon className="size-6" />
                </span>
                <h2 className="mt-5 text-3xl">{s.title}</h2>
                <p className="mt-3 leading-relaxed text-muted-foreground">{s.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="container-site pb-20 md:pb-28">
        <div className="grid items-center gap-10 overflow-hidden rounded-4xl bg-secondary md:grid-cols-2">
          <img
            src={servicosImg}
            alt="Alinhador transparente, escova e espelho odontológico"
            width={1600}
            height={1008}
            loading="lazy"
            className="h-full min-h-64 w-full object-cover"
          />
          <div className="p-8 md:p-12">
            <h2 className="text-4xl">Não sabe qual tratamento precisa?</h2>
            <p className="mt-4 text-muted-foreground">
              Comece por uma avaliação. Nossa equipe analisa seu caso e indica o melhor caminho.
            </p>
            <Button asChild variant="hero" size="xl" className="mt-8">
              <Link to="/contato">
                Agendar avaliação <ArrowRight />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
