import { z } from "zod";

export const periods = [
  { value: "manha", label: "Manhã" },
  { value: "tarde", label: "Tarde" },
  { value: "noite", label: "Noite" },
] as const;

export const appointmentSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Informe seu nome completo" })
    .max(100, { message: "Use até 100 caracteres" }),
  phone: z
    .string()
    .trim()
    .min(8, { message: "Informe um telefone válido" })
    .max(30, { message: "Telefone muito longo" })
    .regex(/^[0-9()+\-\s]+$/, { message: "Use apenas números, espaços, ( ) + -" }),
  email: z
    .string()
    .trim()
    .email({ message: "Informe um e-mail válido" })
    .max(255, { message: "E-mail muito longo" }),
  service: z
    .string()
    .trim()
    .min(2, { message: "Escolha um serviço" })
    .max(100),
  preferredDate: z
    .string()
    .trim()
    .regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Data inválida" })
    .optional()
    .or(z.literal("")),
  preferredPeriod: z.enum(["manha", "tarde", "noite"]).optional().or(z.literal("")),
  message: z.string().trim().max(1000, { message: "Use até 1000 caracteres" }).optional(),
});

export type AppointmentInput = z.infer<typeof appointmentSchema>;
