import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Trash2, Edit2 } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";

const AnnouncementsPage = () => {
  const qc = useQueryClient();
  const { hasRole, user } = useAuth();
  const canWrite = hasRole("admin") || hasRole("teacher");

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any | null>(null);
  const [form, setForm] = useState({ title: "", body: "", published: false });

  const { data: items = [] } = useQuery({
    queryKey: ["announcements-admin"],
    queryFn: async () => {
      const { data, error } = await supabase.from("announcements").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const openNew = () => {
    setEditing(null);
    setForm({ title: "", body: "", published: false });
    setOpen(true);
  };

  const openEdit = (item: any) => {
    setEditing(item);
    setForm({ title: item.title, body: item.body, published: item.published });
    setOpen(true);
  };

  const save = async () => {
    if (!form.title || !form.body) return toast.error("Title and body required");
    if (editing) {
      const { error } = await supabase.from("announcements").update(form).eq("id", editing.id);
      if (error) return toast.error(error.message);
      toast.success("Updated");
    } else {
      const { error } = await supabase.from("announcements").insert({ ...form, author_id: user?.id });
      if (error) return toast.error(error.message);
      toast.success("Announcement created");
    }
    setOpen(false);
    qc.invalidateQueries({ queryKey: ["announcements-admin"] });
  };

  const togglePublish = async (item: any) => {
    const { error } = await supabase.from("announcements").update({ published: !item.published }).eq("id", item.id);
    if (error) return toast.error(error.message);
    qc.invalidateQueries({ queryKey: ["announcements-admin"] });
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this announcement?")) return;
    const { error } = await supabase.from("announcements").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Deleted");
    qc.invalidateQueries({ queryKey: ["announcements-admin"] });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-tech-darkBlue">Announcements</h2>
          <p className="text-sm text-muted-foreground">Create and publish notices to the school.</p>
        </div>
        {canWrite && (
          <Button onClick={openNew} className="bg-tech-blue hover:bg-tech-darkBlue">
            <Plus className="h-4 w-4 mr-2" /> New
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.length === 0 && (
          <p className="text-sm text-muted-foreground">No announcements yet.</p>
        )}
        {items.map((a: any) => (
          <Card key={a.id}>
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between gap-2">
                <CardTitle className="text-base">{a.title}</CardTitle>
                <Badge variant={a.published ? "default" : "secondary"}>{a.published ? "Published" : "Draft"}</Badge>
              </div>
              <p className="text-xs text-muted-foreground">{format(new Date(a.created_at), "d MMM yyyy")}</p>
            </CardHeader>
            <CardContent>
              <p className="text-sm whitespace-pre-wrap line-clamp-4">{a.body}</p>
              {canWrite && (
                <div className="flex items-center justify-between mt-4 pt-3 border-t">
                  <div className="flex items-center gap-2">
                    <Switch checked={a.published} onCheckedChange={() => togglePublish(a)} />
                    <span className="text-xs text-muted-foreground">Publish</span>
                  </div>
                  <div className="flex gap-1">
                    <Button size="sm" variant="ghost" onClick={() => openEdit(a)}><Edit2 className="h-3 w-3" /></Button>
                    <Button size="sm" variant="ghost" onClick={() => remove(a.id)}><Trash2 className="h-3 w-3 text-destructive" /></Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{editing ? "Edit" : "New"} announcement</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div className="space-y-1">
              <Label>Title</Label>
              <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            </div>
            <div className="space-y-1">
              <Label>Body</Label>
              <Textarea rows={6} value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} />
            </div>
            <div className="flex items-center gap-2">
              <Switch checked={form.published} onCheckedChange={(v) => setForm({ ...form, published: v })} />
              <Label className="text-sm">Publish immediately</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={save} className="bg-tech-blue hover:bg-tech-darkBlue">Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AnnouncementsPage;
