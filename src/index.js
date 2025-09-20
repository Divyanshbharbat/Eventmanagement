// Import firebase modules
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  setDoc,
  doc,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";

// ---------------- Firebase Config ----------------
const firebaseConfig = {
  apiKey: "AIzaSyCYE52nUqAEjVqLLrd23AlSAxdbjmwOWyQ",
  authDomain: "react-71cf6.firebaseapp.com",
  databaseURL: "https://react-71cf6-default-rtdb.firebaseio.com",
  projectId: "react-71cf6",
storageBucket: "react-71cf6.appspot.com",
  messagingSenderId: "960452786178",
  appId: "1:960452786178:web:952292d480c9f839b74f1b",
  measurementId: "G-0G4Y9M1084",
  databaseURL:"https://react-71cf6-default-rtdb.firebaseio.com/"
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const  db = getFirestore(app);
export const storage=getStorage(app);
const firestore=getFirestore(app)
// ---------------- Auth Functions ----------------

// Signup with Email/Password
export const signupWithEmail = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "users", userCredential.user.uid), {
    email: userCredential.user.email,
    createdAt: new Date(),
  });

    console.log(userCredential)
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

// Signin with Email/Password
export const signinWithEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

// Signin with Google
export const signinWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
    prompt: "select_account" // <--- forces account selection every time
  });
  try {
    const result = await signInWithPopup(auth, provider);
      await setDoc(doc(db, "users", userCredential.user.uid), {
    email: userCredential.user.email,
    createdAt: new Date(),
  });

    return result.user;
  } catch (error) {
    throw error;
  }
};

// Signout
export const signout = async () => {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    throw error;
  }
};

// Auth state listener
export const onAuthStateChangedListener = (callback) => {
  return onAuthStateChanged(auth, callback);
};

// ---------------- Firestore Functions ----------------

// Add new document to collection
export const addData = async (collectionName, data) => {
  try {
    const docRef = await addDoc(collection('data', collectionName), data);
    return docRef.id;
  } catch (error) {
    throw error;
  }
};

// Set document with custom ID
export const setData = async (collectionName, docId, data) => {
  try {
    await setDoc(doc('data', collectionName, docId), data);
    return docId;
  } catch (error) {
    throw error;
  }
};
