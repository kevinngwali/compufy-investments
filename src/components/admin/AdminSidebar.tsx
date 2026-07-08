import { NavLink, useLocation } from "react-router-dom";
import { LayoutDashboard, Users, Wallet, Megaphone, LogOut, GraduationCap } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";

export const AdminSidebar = () => {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const { pathname } = useLocation();
  const { hasRole, signOut, user } = useAuth();

  const items = [
    { title: "Dashboard", url: "/admin", icon: LayoutDashboard, show: true },
    {
      title: "Students",
      url: "/admin/students",
      icon: Users,
      show: hasRole("admin") || hasRole("teacher") || hasRole("finance"),
    },
    {
      title: "Finance",
      url: "/admin/finance",
      icon: Wallet,
      show: hasRole("admin") || hasRole("finance"),
    },
    {
      title: "Announcements",
      url: "/admin/announcements",
      icon: Megaphone,
      show: hasRole("admin") || hasRole("teacher") || hasRole("finance"),
    },
  ];

  const isActive = (path: string) =>
    path === "/admin" ? pathname === "/admin" : pathname.startsWith(path);

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b p-4">
        <div className="flex items-center gap-2">
          <div className="bg-tech-blue text-white rounded-lg p-1.5">
            <GraduationCap className="h-5 w-5" />
          </div>
          {!collapsed && (
            <div className="flex flex-col leading-tight">
              <span className="font-bold text-sm">School Admin</span>
              <span className="text-xs text-muted-foreground">Staff Portal</span>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items
                .filter((i) => i.show)
                .map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={isActive(item.url)}>
                      <NavLink to={item.url} end={item.url === "/admin"}>
                        <item.icon className="h-4 w-4" />
                        {!collapsed && <span>{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t p-2">
        {!collapsed && user && (
          <div className="px-2 pb-2 text-xs text-muted-foreground truncate">{user.email}</div>
        )}
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start"
          onClick={() => signOut()}
        >
          <LogOut className="h-4 w-4" />
          {!collapsed && <span className="ml-2">Sign out</span>}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
};
