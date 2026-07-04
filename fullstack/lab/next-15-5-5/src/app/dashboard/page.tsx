import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/?openSignIn=true");
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="mt-4">
        Welcome to your dashboard — you're signed in as {userId}.
      </p>
    </div>
  );
}
