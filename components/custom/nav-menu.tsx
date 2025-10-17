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
                  ? "bg-[#1f1f1f] text-[#1fd5f9] hover:bg-[#252525] hover:text-[#1fd5f9]"
                  : "text-[#cccccc] hover:bg-[#1a1a1a] hover:text-[#ffffff]"
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

