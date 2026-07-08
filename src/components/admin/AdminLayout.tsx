import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "./AdminSidebar";
import { useAuth } from "@/hooks/useAuth";
import { Card } from "@/components/ui/card";
import { ShieldAlert } from "lucide-react";

export const AdminLayout = () => {
  const { roles, loading } = useAuth();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-muted/30">
        <AdminSidebar />
        <div className="flex-1 flex flex-col">
          <header className="h-14 flex items-center border-b bg-background px-4 gap-3">
            <SidebarTrigger />
            <h1 className="font-semibold text-tech-darkBlue">Kudakwashe Primary — Admin</h1>
          </header>
          <main className="flex-1 p-6 overflow-auto">
            {!loading && roles.length === 0 ? (
              <div className="max-w-lg mx-auto mt-16">
                <Card className="p-6 text-center">
                  <ShieldAlert className="h-10 w-10 text-amber-500 mx-auto mb-3" />
                  <h2 className="text-lg font-semibold mb-2">Awaiting access</h2>
                  <p className="text-sm text-muted-foreground">
                    Your account has been created but no role has been assigned yet.
                    Please ask an administrator to grant you access.
                  </p>
                </Card>
              </div>
            ) : (
              <Outlet />
            )}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};
