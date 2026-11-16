import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import { appointmentSchema } from "./appointment-schema";

export const submitAppointment = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => appointmentSchema.parse(input))
  .handler(async ({ data }) => {
    const url = process.env["SUPABASE_URL"];
    const key = process.env["SUPABASE_PUBLISHABLE_KEY"];
    if (!url || !key) {
      console.error("Backend configuration missing");
      return { ok: false as const, error: "Não foi possível enviar agora. Tente novamente." };
    }

    const supabase = createClient<Database>(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
      global: {
        fetch: (input, init) => {
          const h = new Headers(init?.headers);
          if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) {
            h.delete("Authorization");
          }
          h.set("apikey", key);
          return fetch(input, { ...init, headers: h });
        },
      },
    });

    const id = crypto.randomUUID();
    const { error } = await supabase.from("appointment_requests").insert({
      id,
      name: data.name,
      phone: data.phone,
      email: data.email,
      service: data.service,
      preferred_date: data.preferredDate ? data.preferredDate : null,
      preferred_period: data.preferredPeriod ? data.preferredPeriod : null,
      message: data.message ? data.message : null,
    });

    if (error) {
      console.error("appointment insert failed", error.message);
      return { ok: false as const, error: "Não foi possível enviar agora. Tente novamente." };
    }

    return { ok: true as const, id };
  });
