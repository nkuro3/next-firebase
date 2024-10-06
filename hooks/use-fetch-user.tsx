"use client";

import { signOut as firebaseSignOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import useSWRImmutable from "swr/immutable";
import { auth, firestore } from "@/lib/firebase/client";

const fetchUser = async (docId: string) => {
  const userDocRef = doc(firestore, "users", docId);
  const userDoc = await getDoc(userDocRef);
  if (!userDoc.exists()) return null;
  return userDoc.data();
};

export const useFetchUser = () => {
  const docId = auth.currentUser?.uid;
  const router = useRouter();
  const { data: user, mutate } = useSWRImmutable(["user", docId], () => (docId ? fetchUser(docId) : null));

  const signOut = useCallback(async () => {
    try {
      await firebaseSignOut(auth).then(() => mutate(["user", docId], false));
      router.push("/login");
    } catch (e) {
      console.error("Error signing out:", e);
    }
  }, [docId, router, mutate]);

  return { user, signOut };
};
