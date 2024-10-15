import { ServiceAccount } from "firebase-admin";
import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { FieldValue, getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";

export const firebaseAdmin =
  getApps()[0] ??
  initializeApp({
    credential: cert(JSON.parse(process.env.FIREBASE_CREDENTIALS || "") as ServiceAccount),
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

    return user;
  } catch (error) {
    console.error("Error creating new user:", error);
  }
};

export const uploadIcon = async (uid: string, buffer: Buffer) => {
  try {
    const bucket = storage.bucket();
    const file = bucket.file(`profileImages/${uid}`);

    await file.save(buffer);
    await file.makePublic();
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

export const updateUserToStorage = async (
  uid: string,
  username?: string,
  imageUrl?: string,
  birth?: string,
  gender?: string
) => {
  try {
    const updateData: Partial<{ username: string; imageUrl: string; birth: string; gender: string }> = {};

    if (username) updateData.username = username;
    if (imageUrl) updateData.imageUrl = imageUrl;
    if (birth) updateData.birth = birth;
    if (gender) updateData.gender = gender;

    const userDocRef = firestore.doc(`users/${uid}`);
    await userDocRef.update(updateData);
  } catch (error) {
    console.error("Error registering user to storage:", error);
  }
};

export const createFeed = async (authorId: string, content: string) => {
  try {
    const docRef = await firestore.collection("feeds").add({
      content,
      authorId,
      createdAt: FieldValue.serverTimestamp()
    });
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
    throw new Error("Failed to create feed");
  }
};
