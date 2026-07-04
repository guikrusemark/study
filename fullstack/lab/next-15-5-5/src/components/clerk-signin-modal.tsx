"use client";

import { SignIn } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ClerkSignInModal() {
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const openParam = searchParams?.get("openSignIn");
    if (openParam === "true") {
      setOpen(true);
    }
  }, [searchParams]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded p-6 w-full max-w-md">
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="float-right text-sm text-gray-500 mb-2 hover:text-gray-700"
        >
          Close
        </button>
        <SignIn routing="hash" afterSignInUrl="/dashboard" />
      </div>
    </div>
  );
}
