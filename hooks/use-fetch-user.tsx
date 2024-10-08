"use client";

import { doc, getDoc } from "firebase/firestore";
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
  const { data: user } = useSWRImmutable(["user", docId], () => (docId ? fetchUser(docId) : null));
  return { user };
};
