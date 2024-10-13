import { ServiceAccount } from "firebase-admin";
import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { FieldValue, getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";
import secrets from "@/secrets.json";

export const firebaseAdmin =
  getApps()[0] ??
  initializeApp({
    credential: cert(secrets as ServiceAccount),
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
  });

export const firebaseAuth = getAuth();
export const firestore = getFirestore();
export const storage = getStorage();

export const createUser = async (email: string, password: string) => {
  try {
    const user = await firebaseAuth.createUser({
      email,
      password,
      emailVerified: false,
      disabled: false
    });

    if (!user) return false;

    console.log(`Successfully created new user: ${user.uid}`);
    return user;
  } catch (error) {
    console.error("Error creating new user:", error);
  }
};

export const uploadIcon = async (uid: string, buffer: Buffer) => {
  try {
    const bucket = storage.bucket();
    console.log("Uploading icon to storage...");
    const file = bucket.file(`profileImages/${uid}`);

    await file.save(buffer);
    return file.publicUrl();
  } catch (error) {
    console.error("Error uploading icon:", error);
  }
};

export const registerUserToStorage = async (
  uid: string,
  username: string,
  email: string,
  imageUrl: string,
  birth: string,
  gender: string,
  isAgreeTerms: boolean
) => {
  try {
    const userDocRef = firestore.doc(`users/${uid}`);
    await userDocRef.set({
      uid,
      username,
      email,
      imageUrl,
      birth,
      gender,
      isAgreeTerms,
      createdAt: FieldValue.serverTimestamp()
    });
  } catch (error) {
    console.error("Error registering user to storage:", error);
  }
};
