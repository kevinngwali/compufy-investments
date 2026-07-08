import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, DollarSign, FileText } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";

const FinancePage = () => {
  const { user } = useAuth();
  const qc = useQueryClient();
  const { hasRole } = useAuth();
  const canWrite = hasRole("admin") || hasRole("finance");

  const [open, setOpen] = useState(false);
  const [payOpen, setPayOpen] = useState<string | null>(null);
  const [payment, setPayment] = useState({ amount: "", method: "cash", reference: "", paid_on: format(new Date(), "yyyy-MM-dd"), notes: "" });
  const [form, setForm] = useState({ student_id: "", term: "Term 1", amount_due: "", due_date: "" });

  const { data: invoices = [] } = useQuery({
    queryKey: ["finance-invoices"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("fee_invoices")
        .select("*, students(first_name, last_name, grade)")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const { data: students = [] } = useQuery({
    queryKey: ["students-for-finance"],
    queryFn: async () => {
      const { data, error } = await supabase.from("students").select("id, first_name, last_name, grade").order("last_name");
      if (error) throw error;
      return data;
    },
  });

  const totalDue = invoices.reduce((s: number, i: any) => s + Number(i.amount_due), 0);
  const totalPaid = invoices.reduce((s: number, i: any) => s + Number(i.amount_paid), 0);
  const outstanding = totalDue - totalPaid;

  const createInvoice = async () => {
    if (!form.student_id || !form.amount_due) {
      toast.error("Student and amount required");
      return;
    }
    const { error } = await supabase.from("fee_invoices").insert({
      student_id: form.student_id,
      term: form.term,
      amount_due: Number(form.amount_due),
      due_date: form.due_date || null,
    });
    if (error) return toast.error(error.message);
    toast.success("Invoice created");
    setOpen(false);
    setForm({ student_id: "", term: "Term 1", amount_due: "", due_date: "" });
    qc.invalidateQueries({ queryKey: ["finance-invoices"] });
  };

  const recordPayment = async (invoiceId: string, balance: number) => {
    const amt = Number(payment.amount);
    if (!amt || amt <= 0) return toast.error("Enter a valid amount");
    if (amt > balance + 0.001) return toast.error("Amount exceeds outstanding balance");
    const { error } = await supabase.from("fee_payments").insert({
      invoice_id: invoiceId,
      amount: amt,
      method: payment.method,
      reference: payment.reference || null,
      paid_on: payment.paid_on,
      notes: payment.notes || null,
      recorded_by: user?.id ?? null,
    });
    if (error) return toast.error(error.message);
    toast.success("Payment recorded");
    setPayOpen(null);
    setPayment({ amount: "", method: "cash", reference: "", paid_on: format(new Date(), "yyyy-MM-dd"), notes: "" });
    qc.invalidateQueries({ queryKey: ["finance-invoices"] });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-tech-darkBlue">Finance</h2>
          <p className="text-sm text-muted-foreground">Invoices, payments, and balances.</p>
        </div>
        {canWrite && (
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="bg-tech-blue hover:bg-tech-darkBlue">
                <Plus className="h-4 w-4 mr-2" /> New Invoice
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Create invoice</DialogTitle></DialogHeader>
              <div className="space-y-3">
                <div className="space-y-1">
                  <Label>Student</Label>
                  <Select value={form.student_id} onValueChange={(v) => setForm({ ...form, student_id: v })}>
                    <SelectTrigger><SelectValue placeholder="Select a student" /></SelectTrigger>
                    <SelectContent>
                      {students.map((s: any) => (
                        <SelectItem key={s.id} value={s.id}>
                          {s.first_name} {s.last_name} (Grade {s.grade})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label>Term</Label>
                  <Select value={form.term} onValueChange={(v) => setForm({ ...form, term: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Term 1">Term 1</SelectItem>
                      <SelectItem value="Term 2">Term 2</SelectItem>
                      <SelectItem value="Term 3">Term 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label>Amount due</Label>
                  <Input type="number" step="0.01" value={form.amount_due} onChange={(e) => setForm({ ...form, amount_due: e.target.value })} />
                </div>
                <div className="space-y-1">
                  <Label>Due date</Label>
                  <Input type="date" value={form.due_date} onChange={(e) => setForm({ ...form, due_date: e.target.value })} />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                <Button onClick={createInvoice} className="bg-tech-blue hover:bg-tech-darkBlue">Create</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Invoiced</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">${totalDue.toLocaleString()}</div></CardContent>
        </Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Collected</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold text-green-600">${totalPaid.toLocaleString()}</div></CardContent>
        </Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Outstanding</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold text-amber-600">${outstanding.toLocaleString()}</div></CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-base">All invoices</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Term</TableHead>
                <TableHead>Due</TableHead>
                <TableHead>Paid</TableHead>
                <TableHead>Balance</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Due date</TableHead>
                {canWrite && <TableHead />}
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.length === 0 && (
                <TableRow><TableCell colSpan={canWrite ? 8 : 7} className="text-center text-muted-foreground">No invoices yet.</TableCell></TableRow>
              )}
              {invoices.map((i: any) => (
                <TableRow key={i.id}>
                  <TableCell className="font-medium">
                    {i.students ? `${i.students.first_name} ${i.students.last_name}` : "—"}
                    {i.students && <div className="text-xs text-muted-foreground">Grade {i.students.grade}</div>}
                  </TableCell>
                  <TableCell>{i.term}</TableCell>
                  <TableCell>${Number(i.amount_due).toLocaleString()}</TableCell>
                  <TableCell>${Number(i.amount_paid).toLocaleString()}</TableCell>
                  <TableCell>${(Number(i.amount_due) - Number(i.amount_paid)).toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge variant={i.status === "paid" ? "default" : i.status === "partial" ? "secondary" : "destructive"}>
                      {i.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm">{i.due_date ? format(new Date(i.due_date), "d MMM yyyy") : "—"}</TableCell>
                  {canWrite && (
                    <TableCell>
                      {i.status !== "paid" && (
                        <Dialog open={payOpen === i.id} onOpenChange={(o) => { setPayOpen(o ? i.id : null); setPayAmount(""); }}>
                          <DialogTrigger asChild>
                            <Button size="sm" variant="outline"><DollarSign className="h-3 w-3 mr-1" />Pay</Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader><DialogTitle>Record payment</DialogTitle></DialogHeader>
                            <div className="space-y-2">
                              <Label>Amount</Label>
                              <Input type="number" step="0.01" value={payAmount} onChange={(e) => setPayAmount(e.target.value)} />
                              <p className="text-xs text-muted-foreground">
                                Balance: ${(Number(i.amount_due) - Number(i.amount_paid)).toLocaleString()}
                              </p>
                            </div>
                            <DialogFooter>
                              <Button variant="outline" onClick={() => setPayOpen(null)}>Cancel</Button>
                              <Button className="bg-tech-blue hover:bg-tech-darkBlue" onClick={() => recordPayment(i.id, Number(i.amount_paid))}>Record</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      )}
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default FinancePage;
