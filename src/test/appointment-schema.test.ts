import { describe, expect, it } from "vitest";
import { appointmentSchema } from "@/lib/appointment-schema";

const valid = {
  name: "Maria Silva",
  phone: "(11) 98765-4321",
  email: "maria@example.com",
  service: "Ortodontia",
};

describe("appointment form rules", () => {
  it("accepts a request with only name, phone, email and service", () => {
    expect(appointmentSchema.safeParse(valid).success).toBe(true);
  });

  it("requires a valid email", () => {
    expect(appointmentSchema.safeParse({ ...valid, email: "maria" }).success).toBe(false);
  });

  it("requires a service to be chosen", () => {
    expect(appointmentSchema.safeParse({ ...valid, service: "" }).success).toBe(false);
  });

  it("rejects messages longer than 1000 characters", () => {
    expect(appointmentSchema.safeParse({ ...valid, message: "a".repeat(1001) }).success).toBe(false);
  });
});
