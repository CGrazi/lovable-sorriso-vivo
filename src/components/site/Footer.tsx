import { Link } from "@tanstack/react-router";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { clinic } from "@/lib/clinic";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="bg-ink text-ink-foreground">
      <div className="container-site grid gap-12 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo inverted />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink-muted">
            Odontologia moderna, humana e completa para você e sua família, no coração de São Paulo.
          </p>
        </div>
        <div className="space-y-3 text-sm">
          <p className="font-semibold">Contato</p>
          <p className="flex gap-2 text-ink-muted">
            <MapPin className="mt-0.5 size-4 shrink-0" /> {clinic.address}
          </p>
          <a href={clinic.phoneHref} className="flex gap-2 text-ink-muted hover:text-ink-foreground">
            <Phone className="mt-0.5 size-4 shrink-0" /> {clinic.phone}
          </a>
          <a href={`mailto:${clinic.email}`} className="flex gap-2 text-ink-muted hover:text-ink-foreground">
            <Mail className="mt-0.5 size-4 shrink-0" /> {clinic.email}
          </a>
        </div>
        <div className="space-y-3 text-sm">
          <p className="font-semibold">Horários</p>
          {clinic.hours.map((h) => (
            <p key={h.days} className="flex gap-2 text-ink-muted">
              <Clock className="mt-0.5 size-4 shrink-0" />
              <span>
                {h.days}: {h.time}
              </span>
            </p>
          ))}
          <div className="flex flex-wrap gap-4 pt-3">
            <Link to="/servicos" className="text-ink-muted hover:text-ink-foreground">Serviços</Link>
            <Link to="/sobre" className="text-ink-muted hover:text-ink-foreground">A clínica</Link>
            <Link to="/contato" className="text-ink-muted hover:text-ink-foreground">Agendar</Link>
          </div>
        </div>
      </div>
      <div className="border-t border-ink-foreground/10">
        <div className="container-site py-6 text-xs text-ink-muted">
          © {new Date().getFullYear()} Sorriso Vivo Odontologia · São Paulo/SP
        </div>
      </div>
    </footer>
  );
}
