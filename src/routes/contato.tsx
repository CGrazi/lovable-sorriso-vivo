import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { clinic, services } from "@/lib/clinic";
import { appointmentSchema, periods, type AppointmentInput } from "@/lib/appointment-schema";
import { submitAppointment } from "@/lib/appointments.functions";

export const Route = createFileRoute("/contato")({
  head: () => ({
    meta: [
      { title: "Agende sua consulta — Sorriso Vivo São Paulo" },
      {
        name: "description",
        content:
          "Agende sua consulta na clínica odontológica Sorriso Vivo, em São Paulo. Preencha o formulário e retornamos em breve.",
      },
      { property: "og:title", content: "Agende sua consulta — Sorriso Vivo" },
      {
        property: "og:description",
        content: "Peça seu horário na Sorriso Vivo pelo formulário online.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Contato,
});

const defaults: AppointmentInput = {
  name: "",
  phone: "",
  email: "",
  service: "",
  preferredDate: "",
  preferredPeriod: "",
  message: "",
};

function Contato() {
  const submit = useServerFn(submitAppointment);
  const [sent, setSent] = useState(false);
  const [minDate, setMinDate] = useState<string>();

  useEffect(() => {
    const d = new Date();
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    setMinDate(d.toISOString().slice(0, 10));
  }, []);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AppointmentInput>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: defaults,
  });

  const onSubmit = async (values: AppointmentInput) => {
    try {
      const res = await submit({ data: values });
      if (!res.ok) {
        toast.error(res.error);
        return;
      }
      reset(defaults);
      setSent(true);
    } catch {
      toast.error("Não foi possível enviar agora. Tente novamente.");
    }
  };

  return (
    <section className="bg-hero">
      <div className="container-site grid gap-12 py-16 md:py-24 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="eyebrow">Agendamento</p>
          <h1 className="mt-5 text-5xl md:text-6xl">
            Vamos marcar sua <em className="italic text-primary">consulta</em>?
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground">
            Preencha o formulário com suas preferências. Nossa equipe entra em contato para
            confirmar o dia e o horário.
          </p>

          <div className="mt-10 space-y-5">
            <InfoRow icon={MapPin} title="Endereço" text={clinic.address} />
            <InfoRow icon={Phone} title="Telefone" text={clinic.phone} href={clinic.phoneHref} />
            <InfoRow
              icon={MessageCircle}
              title="WhatsApp"
              text={clinic.whatsapp}
              href={clinic.whatsappHref}
            />
            <InfoRow icon={Mail} title="E-mail" text={clinic.email} href={`mailto:${clinic.email}`} />
            <InfoRow
              icon={Clock}
              title="Horários"
              text={clinic.hours.map((h) => `${h.days}: ${h.time}`).join(" · ")}
            />
          </div>
        </div>

        <div className="rounded-4xl border border-border bg-card p-6 shadow-soft sm:p-10">
          {sent ? (
            <div className="flex min-h-[28rem] flex-col items-center justify-center text-center">
              <span className="grid size-16 place-items-center rounded-full bg-secondary text-primary">
                <CheckCircle2 className="size-8" />
              </span>
              <h2 className="mt-6 text-4xl">Pedido recebido!</h2>
              <p className="mt-3 max-w-sm text-muted-foreground">
                Obrigado pelo contato. Em breve nossa equipe vai falar com você para confirmar sua
                consulta.
              </p>
              <Button variant="soft" size="xl" className="mt-8" onClick={() => setSent(false)}>
                Fazer outro pedido
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-5">
              <h2 className="text-3xl">Solicitar agendamento</h2>

              <Field label="Nome completo" error={errors.name?.message} htmlFor="name">
                <Input id="name" autoComplete="name" className="h-11" {...register("name")} />
              </Field>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Telefone / WhatsApp" error={errors.phone?.message} htmlFor="phone">
                  <Input
                    id="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="(11) 90000-0000"
                    className="h-11"
                    {...register("phone")}
                  />
                </Field>
                <Field label="E-mail" error={errors.email?.message} htmlFor="email">
                  <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    className="h-11"
                    {...register("email")}
                  />
                </Field>
              </div>

              <Field label="Serviço desejado" error={errors.service?.message} htmlFor="service">
                <Controller
                  control={control}
                  name="service"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger id="service" className="h-11 w-full">
                        <SelectValue placeholder="Escolha um serviço" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Avaliação inicial">Avaliação inicial</SelectItem>
                        {services.map((s) => (
                          <SelectItem key={s.slug} value={s.title}>
                            {s.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </Field>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field
                  label="Data preferida (opcional)"
                  error={errors.preferredDate?.message}
                  htmlFor="preferredDate"
                >
                  <Input
                    id="preferredDate"
                    type="date"
                    min={minDate}
                    className="h-11"
                    {...register("preferredDate")}
                  />
                </Field>
                <Field
                  label="Período (opcional)"
                  error={errors.preferredPeriod?.message}
                  htmlFor="preferredPeriod"
                >
                  <Controller
                    control={control}
                    name="preferredPeriod"
                    render={({ field }) => (
                      <Select value={field.value ?? ""} onValueChange={field.onChange}>
                        <SelectTrigger id="preferredPeriod" className="h-11 w-full">
                          <SelectValue placeholder="Qualquer período" />
                        </SelectTrigger>
                        <SelectContent>
                          {periods.map((p) => (
                            <SelectItem key={p.value} value={p.value}>
                              {p.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </Field>
              </div>

              <Field label="Mensagem (opcional)" error={errors.message?.message} htmlFor="message">
                <Textarea
                  id="message"
                  rows={4}
                  placeholder="Conte um pouco sobre o que você precisa"
                  {...register("message")}
                />
              </Field>

              <Button type="submit" variant="hero" size="xl" disabled={isSubmitting} className="mt-2">
                {isSubmitting ? "Enviando..." : "Enviar pedido de agendamento"}
              </Button>
              <p className="text-center text-xs text-muted-foreground">
                Seus dados são usados apenas para entrarmos em contato sobre sua consulta.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  error,
  htmlFor,
  children,
}: {
  label: string;
  error?: string | undefined;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}

function InfoRow({
  icon: Icon,
  title,
  text,
  href,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  text: string;
  href?: string | undefined;
}) {
  const content = (
    <>
      <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-card text-primary shadow-soft">
        <Icon className="size-5" />
      </span>
      <span>
        <span className="block text-sm font-semibold text-foreground">{title}</span>
        <span className="block text-sm text-muted-foreground">{text}</span>
      </span>
    </>
  );
  return href ? (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noreferrer"
      className="flex items-start gap-4 transition-opacity hover:opacity-80"
    >
      {content}
    </a>
  ) : (
    <div className="flex items-start gap-4">{content}</div>
  );
}
