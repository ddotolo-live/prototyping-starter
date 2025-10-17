'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

export function NavMenu() {
  const pathname = usePathname();

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Agent builder", href: "/layout-2" },
  ];

  return (
    <SidebarMenu>
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <SidebarMenuItem key={item.href}>
            <SidebarMenuButton
              asChild
              className={cn(
                "h-9 transition-colors",
                isActive
                  ? "bg-bgAccent1 text-fgAccent1 hover:bg-bgAccent1 hover:text-fgAccent1"
                  : "text-fg1 hover:bg-bg2 hover:text-fg1"
              )}
            >
              <Link href={item.href}>
                <span>{item.label}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
}

