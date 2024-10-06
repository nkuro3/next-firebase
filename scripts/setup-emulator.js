import fs from "fs";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator, doc, setDoc } from "firebase/firestore";
import { getStorage, connectStorageEmulator, ref, uploadBytes, getDownloadURL } from "firebase/storage";

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
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

connectAuthEmulator(auth, "http://127.0.0.1:9099");
connectFirestoreEmulator(firestore, "127.0.0.1", 8080);
connectStorageEmulator(storage, "127.0.0.1", 9199);

const users = [
  {
    username: "User 1",
    email: "abc123@test.com",
    password: "abcABC123",
    imagePath: "./data/images/user1.png",
    birth: "1990-01-01",
    gender: 0,
    isAgree: true
  },
  {
    username: "User 2",
    email: "xyz789@test.com",
    password: "xyzXYZ789",
    imagePath: "./data/images/user2.png",
    birth: "1995-01-01",
    gender: 1,
    isAgree: true
  }
];

const uploadProfileImage = async (uid, imagePath) => {
  const profileImageRef = ref(storage, `profileImages/${uid}`);
  const imageBuffer = fs.readFileSync(imagePath);
  await uploadBytes(profileImageRef, imageBuffer);
  return getDownloadURL(profileImageRef);
};

const saveUserToFirestore = async (uid, user, imageUrl) => {
  const { email, username, birth, gender, isAgree } = user;
  const userDocRef = doc(firestore, "users", uid);

  console.log({
    uid,
    email,
    username,
    imageUrl,
    birth,
    gender,
    isAgree,
    createdAt: new Date()
  });

  await setDoc(userDocRef, {
    uid,
    email,
    username,
    imageUrl,
    birth,
    gender,
    isAgree,
    createdAt: new Date()
  });
};

const createTestUsers = async () => {
  const signup = async (testUser) => {
    try {
      const { user } = await createUserWithEmailAndPassword(auth, testUser.email, testUser.password);
      const downloadURL = await uploadProfileImage(user.uid, testUser.imagePath);
      await saveUserToFirestore(user.uid, testUser, downloadURL);
      console.log(`User ${user.uid} saved to Firestore.`);
    } catch (error) {
      console.error("Failed to save user to Firestore:", error);
    }
  };

  await Promise.all(
    users.map(async (user) => {
      await signup(user);
    })
  );
};

createTestUsers();
