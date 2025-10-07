import { type ReactNode } from "react";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { Sidebar } from "@/components/dashboard/Sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  //   const session = await auth();

  //   if (!session) {
  //     redirect("/auth/signin");
  //   }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar userName={"session.user?.name" || "Usuário"} />
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
