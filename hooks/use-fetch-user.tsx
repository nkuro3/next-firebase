"use client";

import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import useSWRImmutable from "swr/immutable";
import { auth, firestore } from "@/lib/firebase/client";

const fetchUser = async (docId: string) => {
  const userDocRef = doc(firestore, "users", docId);
  const userDoc = await getDoc(userDocRef);
  if (!userDoc.exists()) return null;
  return userDoc.data();
};

export const useFetchUser = () => {
  const [docId, setDocId] = useState("");
  const { data: user, mutate } = useSWRImmutable(["user", docId], () => (docId ? fetchUser(docId) : null));

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setDocId(currentUser.uid);
      } else {
        setDocId("");
      }
    });

    return () => unsubscribe();
  }, []);

  return { user, mutate };
};
