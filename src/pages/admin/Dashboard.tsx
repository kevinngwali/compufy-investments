import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserPlus, Wallet, TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } from "recharts";
import { format } from "date-fns";

const KpiCard = ({ label, value, icon: Icon, hint }: { label: string; value: string; icon: any; hint?: string }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium text-muted-foreground">{label}</CardTitle>
      <Icon className="h-4 w-4 text-tech-blue" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold text-tech-darkBlue">{value}</div>
      {hint && <p className="text-xs text-muted-foreground mt-1">{hint}</p>}
    </CardContent>
  </Card>
);

const COLORS = ["#22c55e", "#f59e0b", "#ef4444"];

const Dashboard = () => {
  const { data: students = [] } = useQuery({
    queryKey: ["students"],
    queryFn: async () => {
      const { data, error } = await supabase.from("students").select("*");
      if (error) throw error;
      return data;
    },
  });

  const { data: invoices = [] } = useQuery({
    queryKey: ["invoices"],
    queryFn: async () => {
      const { data, error } = await supabase.from("fee_invoices").select("*");
      if (error) throw error;
      return data;
    },
  });

  const { data: announcements = [] } = useQuery({
    queryKey: ["announcements"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("announcements")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(5);
      if (error) throw error;
      return data;
    },
  });

  const totalStudents = students.length;
  const pendingEnrol = students.filter((s: any) => s.enrolment_status === "pending").length;
  const totalDue = invoices.reduce((sum: number, i: any) => sum + Number(i.amount_due), 0);
  const totalPaid = invoices.reduce((sum: number, i: any) => sum + Number(i.amount_paid), 0);
  const outstanding = totalDue - totalPaid;

  // Enrolment by month
  const enrolByMonth: Record<string, number> = {};
  students.forEach((s: any) => {
    const key = format(new Date(s.created_at), "MMM yy");
    enrolByMonth[key] = (enrolByMonth[key] ?? 0) + 1;
  });
  const enrolData = Object.entries(enrolByMonth).map(([month, count]) => ({ month, count }));

  // Fee status split
  const feeSplit = ["paid", "partial", "unpaid"].map((status) => ({
    name: status,
    value: invoices.filter((i: any) => i.status === status).length,
  }));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-tech-darkBlue">Overview</h2>
        <p className="text-sm text-muted-foreground">Key metrics across the school.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard label="Total Students" value={String(totalStudents)} icon={Users} />
        <KpiCard label="Pending Enrolments" value={String(pendingEnrol)} icon={UserPlus} hint="Awaiting approval" />
        <KpiCard label="Fees Outstanding" value={`$${outstanding.toLocaleString()}`} icon={Wallet} />
        <KpiCard label="Fees Collected" value={`$${totalPaid.toLocaleString()}`} icon={TrendingUp} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Enrolment trend</CardTitle>
          </CardHeader>
          <CardContent>
            {enrolData.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-12">No data yet.</p>
            ) : (
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={enrolData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#0077CC" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Fee status</CardTitle>
          </CardHeader>
          <CardContent>
            {invoices.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-12">No invoices yet.</p>
            ) : (
              <ResponsiveContainer width="100%" height={240}>
                <PieChart>
                  <Pie data={feeSplit} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80} label>
                    {feeSplit.map((_, i) => (
                      <Cell key={i} fill={COLORS[i]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Latest announcements</CardTitle>
        </CardHeader>
        <CardContent>
          {announcements.length === 0 ? (
            <p className="text-sm text-muted-foreground">No announcements yet.</p>
          ) : (
            <ul className="space-y-3">
              {announcements.map((a: any) => (
                <li key={a.id} className="border-l-2 border-tech-blue pl-3">
                  <div className="font-medium text-sm">{a.title}</div>
                  <div className="text-xs text-muted-foreground">
                    {format(new Date(a.created_at), "d MMM yyyy")} · {a.published ? "Published" : "Draft"}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
