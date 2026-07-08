-- Payments log
CREATE TABLE public.fee_payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_id uuid NOT NULL REFERENCES public.fee_invoices(id) ON DELETE CASCADE,
  amount numeric(12,2) NOT NULL CHECK (amount > 0),
  method text NOT NULL DEFAULT 'cash',
  reference text,
  paid_on date NOT NULL DEFAULT CURRENT_DATE,
  notes text,
  recorded_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.fee_payments TO authenticated;
GRANT ALL ON public.fee_payments TO service_role;

ALTER TABLE public.fee_payments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Staff read payments" ON public.fee_payments FOR SELECT TO authenticated
USING (has_role(auth.uid(),'admin') OR has_role(auth.uid(),'finance') OR has_role(auth.uid(),'teacher'));

CREATE POLICY "Admin/finance insert payments" ON public.fee_payments FOR INSERT TO authenticated
WITH CHECK (has_role(auth.uid(),'admin') OR has_role(auth.uid(),'finance'));

CREATE POLICY "Admin/finance update payments" ON public.fee_payments FOR UPDATE TO authenticated
USING (has_role(auth.uid(),'admin') OR has_role(auth.uid(),'finance'));

CREATE POLICY "Admin/finance delete payments" ON public.fee_payments FOR DELETE TO authenticated
USING (has_role(auth.uid(),'admin') OR has_role(auth.uid(),'finance'));

CREATE INDEX fee_payments_invoice_idx ON public.fee_payments(invoice_id);

-- Recompute invoice amount_paid from payments
CREATE OR REPLACE FUNCTION public.recompute_invoice_paid()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
DECLARE
  target uuid;
  total numeric(12,2);
BEGIN
  target := COALESCE(NEW.invoice_id, OLD.invoice_id);
  SELECT COALESCE(SUM(amount),0) INTO total FROM public.fee_payments WHERE invoice_id = target;
  UPDATE public.fee_invoices SET amount_paid = total WHERE id = target;
  RETURN NULL;
END;
$$;

CREATE TRIGGER fee_payments_recompute
AFTER INSERT OR UPDATE OR DELETE ON public.fee_payments
FOR EACH ROW EXECUTE FUNCTION public.recompute_invoice_paid();