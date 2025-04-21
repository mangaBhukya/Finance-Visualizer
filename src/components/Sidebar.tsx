"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  List,
  PieChart,
  CreditCard,
  Settings,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const nav = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Transactions", href: "/transactions", icon: List },
  { name: "Expenses", href: "/expenses", icon: PieChart },
  { name: "Budgets", href: "/budgets", icon: CreditCard },
];

export default function Sidebar() {
  const [expanded, setExpanded] = useState(true);
  const path = usePathname();

  const toggleSidebar = () => setExpanded(!expanded);

  return (
    <aside
      className={cn(
        "h-screen border-r bg-white dark:bg-gray-900 dark:border-gray-800 flex flex-col transition-all duration-300",
        expanded ? "w-64" : "w-20"
      )}
    >
      <div className="flex items-center justify-between px-4 py-4 border-b dark:border-gray-800">
        <span className={cn("text-2xl font-bold transition-all", !expanded && "hidden")}>Finance</span>
        <button onClick={toggleSidebar} className="text-gray-600 dark:text-gray-300">
          {expanded ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <nav className="flex-1 mt-6 space-y-2 px-2">
        {nav.map((item) => {
          const isActive = path === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-4 px-4 py-2 rounded-lg transition-all",
                isActive
                  ? "bg-gray-200 dark:bg-gray-800 text-primary"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300"
              )}
            >
              <item.icon className="w-5 h-5" />
              {expanded && <span className="text-sm font-medium">{item.name}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto mb-4 px-4">
        <button
          className="flex items-center gap-4 px-4 py-2 rounded-lg w-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300"
        >
          <Settings className="w-5 h-5" />
          {expanded && <span className="text-sm font-medium">Settings</span>}
        </button>
      </div>
    </aside>
  );
}
