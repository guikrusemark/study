"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Home,
  BarChart3,
  PlusCircle,
  Settings,
  LogOut,
  TrendingUp,
  Wallet,
} from "lucide-react";

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Transações", href: "/dashboard/transactions", icon: Wallet },
  { name: "Relatórios", href: "/dashboard/reports", icon: BarChart3 },
  { name: "Investimentos", href: "/dashboard/investments", icon: TrendingUp },
  { name: "Configurações", href: "/dashboard/settings", icon: Settings },
];

interface SidebarProps {
  userName?: string;
}

export function Sidebar({ userName = "Usuário" }: SidebarProps) {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-64 flex-col bg-gray-900 text-white">
      <div className="p-6">
        <h1 className="text-2xl font-bold">💰 ContaFácil</h1>
        <p className="mt-2 text-sm text-gray-400">Olá, {userName}!</p>
      </div>

      <nav className="flex-1 space-y-1 px-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <Icon className="h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-gray-800 p-4">
        <form action="/api/auth/signout" method="POST">
          <button
            type="submit"
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
          >
            <LogOut className="h-5 w-5" />
            Sair
          </button>
        </form>
      </div>
    </div>
  );
}
