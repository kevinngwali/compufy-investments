import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Printer } from "lucide-react";
import { format } from "date-fns";

const StatementPage = () => {
  const { studentId } = useParams();

  const { data: student } = useQuery({
    queryKey: ["statement-student", studentId],
    queryFn: async () => {
      const { data, error } = await supabase.from("students").select("*").eq("id", studentId!).maybeSingle();
      if (error) throw error;
      return data;
    },
    enabled: !!studentId,
  });

  const { data: invoices = [] } = useQuery({
    queryKey: ["statement-invoices", studentId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("fee_invoices")
        .select("*")
        .eq("student_id", studentId!)
        .order("created_at", { ascending: true });
      if (error) throw error;
      return data;
    },
    enabled: !!studentId,
  });

  const invoiceIds = invoices.map((i: any) => i.id);
  const { data: payments = [] } = useQuery({
    queryKey: ["statement-payments", studentId, invoiceIds.join(",")],
    queryFn: async () => {
      if (invoiceIds.length === 0) return [];
      const { data, error } = await supabase
        .from("fee_payments")
        .select("*")
        .in("invoice_id", invoiceIds)
        .order("paid_on", { ascending: true });
      if (error) throw error;
      return data;
    },
    enabled: invoiceIds.length > 0,
  });

  const totalDue = invoices.reduce((s: number, i: any) => s + Number(i.amount_due), 0);
  const totalPaid = invoices.reduce((s: number, i: any) => s + Number(i.amount_paid), 0);
  const balance = totalDue - totalPaid;

  // Build ledger: invoices as debits, payments as credits, sorted by date
  type Row = { date: string; type: "invoice" | "payment"; desc: string; debit: number; credit: number };
  const rows: Row[] = [
    ...invoices.map((i: any) => ({
      date: i.created_at,
      type: "invoice" as const,
      desc: `Invoice — ${i.term}${i.due_date ? ` (due ${format(new Date(i.due_date), "d MMM yyyy")})` : ""}`,
      debit: Number(i.amount_due),
      credit: 0,
    })),
    ...payments.map((p: any) => ({
      date: p.paid_on,
      type: "payment" as const,
      desc: `Payment — ${p.method}${p.reference ? ` (Ref: ${p.reference})` : ""}`,
      debit: 0,
      credit: Number(p.amount),
    })),
  ].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  let running = 0;
  const ledger = rows.map((r) => {
    running += r.debit - r.credit;
    return { ...r, balance: running };
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between print:hidden">
        <Button variant="ghost" size="sm" asChild>
          <Link to="/admin/finance"><ArrowLeft className="h-4 w-4 mr-2" />Back to Finance</Link>
        </Button>
        <Button onClick={() => window.print()} className="bg-tech-blue hover:bg-tech-darkBlue">
          <Printer className="h-4 w-4 mr-2" /> Print statement
        </Button>
      </div>

      <Card className="print:shadow-none print:border-0">
        <CardContent className="p-8 space-y-6">
          <div className="flex items-start justify-between border-b pb-4">
            <div>
              <h1 className="text-xl font-bold text-tech-darkBlue">Kudakwashe Government Primary School</h1>
              <p className="text-sm text-muted-foreground">Fee Statement</p>
            </div>
            <div className="text-right text-sm text-muted-foreground">
              <div>Issued: {format(new Date(), "d MMM yyyy")}</div>
            </div>
          </div>

          {student && (
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-muted-foreground">Student</div>
                <div className="font-medium text-base">{student.first_name} {student.last_name}</div>
                <div>Grade {student.grade}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Guardian</div>
                <div>{student.guardian_name || "—"}</div>
                <div>{student.guardian_phone || ""}</div>
              </div>
            </div>
          )}

          <div>
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b bg-muted/40">
                  <th className="text-left p-2">Date</th>
                  <th className="text-left p-2">Description</th>
                  <th className="text-right p-2">Charges</th>
                  <th className="text-right p-2">Payments</th>
                  <th className="text-right p-2">Balance</th>
                </tr>
              </thead>
              <tbody>
                {ledger.length === 0 && (
                  <tr><td colSpan={5} className="p-4 text-center text-muted-foreground">No activity yet.</td></tr>
                )}
                {ledger.map((r, idx) => (
                  <tr key={idx} className="border-b">
                    <td className="p-2">{format(new Date(r.date), "d MMM yyyy")}</td>
                    <td className="p-2">{r.desc}</td>
                    <td className="p-2 text-right">{r.debit ? `$${r.debit.toLocaleString()}` : ""}</td>
                    <td className="p-2 text-right text-green-700">{r.credit ? `$${r.credit.toLocaleString()}` : ""}</td>
                    <td className="p-2 text-right font-medium">${r.balance.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end">
            <div className="w-full sm:w-72 space-y-1 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Total charged</span><span>${totalDue.toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Total paid</span><span className="text-green-700">${totalPaid.toLocaleString()}</span></div>
              <div className="flex justify-between border-t pt-2 font-bold text-base">
                <span>Balance due</span>
                <span className={balance > 0 ? "text-amber-600" : "text-green-700"}>${balance.toLocaleString()}</span>
              </div>
              <div className="pt-2">
                <Badge variant={balance <= 0 ? "default" : "destructive"}>
                  {balance <= 0 ? "Settled" : "Outstanding"}
                </Badge>
              </div>
            </div>
          </div>

          <div className="text-xs text-muted-foreground border-t pt-3">
            Please quote the student's name and grade with any payment. For queries, contact the school finance office.
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatementPage;
