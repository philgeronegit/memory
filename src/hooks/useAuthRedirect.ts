"use client";

import useNotesStore from "@/store/useNotesStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const useAuthRedirect = () => {
  const { isLoggedIn } = useNotesStore();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
    }
  }, [isLoggedIn, router]);

  return { isLoggedIn };
};
