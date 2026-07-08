import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Check, X, Trash2, Search } from "lucide-react";
import { toast } from "sonner";

const StudentsPage = () => {
  const qc = useQueryClient();
  const { hasRole } = useAuth();
  const canWrite = hasRole("admin") || hasRole("teacher");
  const canDelete = hasRole("admin");

  const [search, setSearch] = useState("");
  const [gradeFilter, setGradeFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    first_name: "", last_name: "", grade: "1", guardian_name: "", guardian_phone: "", guardian_email: "",
  });

  const { data: students = [], isLoading } = useQuery({
    queryKey: ["students"],
    queryFn: async () => {
      const { data, error } = await supabase.from("students").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const addStudent = async () => {
    if (!form.first_name || !form.last_name) {
      toast.error("First and last name required");
      return;
    }
    const { error } = await supabase.from("students").insert({ ...form, enrolment_status: "pending" });
    if (error) return toast.error(error.message);
    toast.success("Student added");
    setOpen(false);
    setForm({ first_name: "", last_name: "", grade: "1", guardian_name: "", guardian_phone: "", guardian_email: "" });
    qc.invalidateQueries({ queryKey: ["students"] });
  };

  const setStatus = async (id: string, enrolment_status: "approved" | "rejected") => {
    const patch: any = { enrolment_status };
    if (enrolment_status === "approved") patch.enrolled_at = new Date().toISOString();
    const { error } = await supabase.from("students").update(patch).eq("id", id);
    if (error) return toast.error(error.message);
    toast.success(`Enrolment ${enrolment_status}`);
    qc.invalidateQueries({ queryKey: ["students"] });
  };

  const removeStudent = async (id: string) => {
    if (!confirm("Delete this student?")) return;
    const { error } = await supabase.from("students").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Deleted");
    qc.invalidateQueries({ queryKey: ["students"] });
  };

  const filtered = students.filter((s: any) => {
    const matchesSearch = `${s.first_name} ${s.last_name}`.toLowerCase().includes(search.toLowerCase());
    const matchesGrade = gradeFilter === "all" || s.grade === gradeFilter;
    const matchesStatus = statusFilter === "all" || s.enrolment_status === statusFilter;
    return matchesSearch && matchesGrade && matchesStatus;
  });

  const grades = ["1", "2", "3", "4", "5", "6", "7"];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-tech-darkBlue">Students</h2>
          <p className="text-sm text-muted-foreground">Manage learners and enrolment approvals.</p>
        </div>
        {canWrite && (
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="bg-tech-blue hover:bg-tech-darkBlue">
                <Plus className="h-4 w-4 mr-2" /> Add Student
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>New student</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label>First name</Label>
                  <Input value={form.first_name} onChange={(e) => setForm({ ...form, first_name: e.target.value })} />
                </div>
                <div className="space-y-1">
                  <Label>Last name</Label>
                  <Input value={form.last_name} onChange={(e) => setForm({ ...form, last_name: e.target.value })} />
                </div>
                <div className="space-y-1">
                  <Label>Grade</Label>
                  <Select value={form.grade} onValueChange={(v) => setForm({ ...form, grade: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {grades.map((g) => <SelectItem key={g} value={g}>Grade {g}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label>Guardian name</Label>
                  <Input value={form.guardian_name} onChange={(e) => setForm({ ...form, guardian_name: e.target.value })} />
                </div>
                <div className="space-y-1">
                  <Label>Guardian phone</Label>
                  <Input value={form.guardian_phone} onChange={(e) => setForm({ ...form, guardian_phone: e.target.value })} />
                </div>
                <div className="space-y-1">
                  <Label>Guardian email</Label>
                  <Input type="email" value={form.guardian_email} onChange={(e) => setForm({ ...form, guardian_email: e.target.value })} />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                <Button onClick={addStudent} className="bg-tech-blue hover:bg-tech-darkBlue">Save</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search by name" className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <Select value={gradeFilter} onValueChange={setGradeFilter}>
              <SelectTrigger className="w-full md:w-[160px]"><SelectValue placeholder="Grade" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All grades</SelectItem>
                {grades.map((g) => <SelectItem key={g} value={g}>Grade {g}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[160px]"><SelectValue placeholder="Status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Grade</TableHead>
                <TableHead>Guardian</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading && (
                <TableRow><TableCell colSpan={5} className="text-center text-muted-foreground">Loading…</TableCell></TableRow>
              )}
              {!isLoading && filtered.length === 0 && (
                <TableRow><TableCell colSpan={5} className="text-center text-muted-foreground">No students found.</TableCell></TableRow>
              )}
              {filtered.map((s: any) => (
                <TableRow key={s.id}>
                  <TableCell className="font-medium">{s.first_name} {s.last_name}</TableCell>
                  <TableCell>Grade {s.grade}</TableCell>
                  <TableCell className="text-sm">
                    {s.guardian_name || "—"}
                    {s.guardian_phone && <div className="text-xs text-muted-foreground">{s.guardian_phone}</div>}
                  </TableCell>
                  <TableCell>
                    <Badge variant={s.enrolment_status === "approved" ? "default" : s.enrolment_status === "rejected" ? "destructive" : "secondary"}>
                      {s.enrolment_status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right space-x-1">
                    {canWrite && s.enrolment_status === "pending" && (
                      <>
                        <Button size="sm" variant="outline" onClick={() => setStatus(s.id, "approved")}>
                          <Check className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => setStatus(s.id, "rejected")}>
                          <X className="h-3 w-3" />
                        </Button>
                      </>
                    )}
                    {canDelete && (
                      <Button size="sm" variant="ghost" onClick={() => removeStudent(s.id)}>
                        <Trash2 className="h-3 w-3 text-destructive" />
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentsPage;
