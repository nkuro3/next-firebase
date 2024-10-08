"use client";

import { onAuthStateChanged, User, signOut as firebaseSignOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { auth } from "@/lib/firebase/client";

export function useAuth() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signOut = useCallback(async () => {
    try {
      await firebaseSignOut(auth);
      router.push("/login");
    } catch (e) {
      console.error("Error signing out:", e);
    }
  }, [router]);

  return { user, loading, signOut };
}
