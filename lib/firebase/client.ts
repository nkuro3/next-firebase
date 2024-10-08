import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import {
  getFirestore,
  connectFirestoreEmulator,
  QueryDocumentSnapshot,
  query,
  collection,
  orderBy,
  limit,
  startAfter,
  getDocs,
  getDoc,
  doc,
  addDoc,
  serverTimestamp,
  Timestamp
} from "firebase/firestore";
import { getStorage, connectStorageEmulator } from "firebase/storage";
import { ITEMS_PER_PAGE } from "@/lib/constant";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);

if (process.env.NODE_ENV === "development") {
  connectAuthEmulator(auth, "http://127.0.0.1:9099");
  connectFirestoreEmulator(firestore, "127.0.0.1", 8080);
  connectStorageEmulator(storage, "127.0.0.1", 9199);
}

export type FeedItem = {
  id: string;
  content: string;
  authorId: string;
  createdAt: Date;
};

export type UserData = {
  uid: string;
  username: string;
  email: string;
  gender: string;
  isAgreeTerms: boolean;
  imageUrl: string;
  birth: string;
  createdAt: Timestamp;
};

export async function getFeedItems(
  lastDoc?: QueryDocumentSnapshot
): Promise<{ items: FeedItem[]; lastDoc: QueryDocumentSnapshot | undefined }> {
  let q = query(collection(firestore, "feeds"), orderBy("createdAt", "desc"), limit(ITEMS_PER_PAGE));
  if (lastDoc) {
    q = query(q, startAfter(lastDoc));
  }

  const querySnapshot = await getDocs(q);
  const items = querySnapshot.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt.toDate()
      }) as FeedItem
  );

  return { items, lastDoc: querySnapshot.docs[querySnapshot.docs.length - 1] };
}

export const createFeed = async (content: string, authorId: string) => {
  try {
    const docRef = await addDoc(collection(firestore, "feeds"), {
      content,
      authorId,
      createdAt: serverTimestamp()
    });
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export async function getUserData(userId: string): Promise<UserData | null> {
  const userDoc = await getDoc(doc(firestore, "users", userId));
  if (userDoc.exists()) {
    return userDoc.data() as UserData;
  }
  return null;
}
