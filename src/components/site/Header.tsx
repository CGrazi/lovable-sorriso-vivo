import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "./Logo";

const nav = [
  { to: "/", label: "Início" },
  { to: "/sobre", label: "A clínica" },
  { to: "/servicos", label: "Serviços" },
  { to: "/contato", label: "Contato" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="container-site flex h-18 items-center justify-between py-4">
        <Link to="/" className="flex items-center" onClick={() => setOpen(false)}>
          <Logo />
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground data-[status=active]:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:block">
          <Button asChild variant="hero" size="lg">
            <Link to="/contato">Agendar consulta</Link>
          </Button>
        </div>
        <button
          className="md:hidden"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>
      {open && (
        <nav className="container-site flex flex-col gap-1 pb-6 md:hidden">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              activeOptions={{ exact: item.to === "/" }}
              className="rounded-lg px-3 py-3 text-base font-medium text-foreground hover:bg-muted data-[status=active]:text-primary"
            >
              {item.label}
            </Link>
          ))}
          <Button asChild variant="hero" size="xl" className="mt-3">
            <Link to="/contato" onClick={() => setOpen(false)}>
              Agendar consulta
            </Link>
          </Button>
        </nav>
      )}
    </header>
  );
}
