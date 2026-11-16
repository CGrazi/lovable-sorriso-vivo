CREATE TABLE public.appointment_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL CHECK (char_length(name) BETWEEN 2 AND 100),
  phone TEXT NOT NULL CHECK (char_length(phone) BETWEEN 8 AND 30),
  email TEXT NOT NULL CHECK (char_length(email) BETWEEN 5 AND 255),
  service TEXT NOT NULL CHECK (char_length(service) BETWEEN 2 AND 100),
  preferred_date DATE,
  preferred_period TEXT CHECK (preferred_period IN ('manha', 'tarde', 'noite')),
  message TEXT CHECK (message IS NULL OR char_length(message) <= 1000),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT INSERT ON public.appointment_requests TO anon, authenticated;
GRANT ALL ON public.appointment_requests TO service_role;

ALTER TABLE public.appointment_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Visitors can submit appointment requests"
ON public.appointment_requests
FOR INSERT
TO anon, authenticated
WITH CHECK (true);