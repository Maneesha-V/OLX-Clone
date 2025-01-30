import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBHH-94OneszXM5MslRgsUVnywaatXryo8",
  authDomain: "olx-clone-e4c79.firebaseapp.com",
  databaseURL: "https://olx-clone-e4c79-default-rtdb.firebaseio.com",
  projectId: "olx-clone-e4c79",
  storageBucket: "olx-clone-e4c79.firebasestorage.app",
  messagingSenderId: "466102925249",
  appId: "1:466102925249:web:a23108c8d67c512a262140"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export const googleProvider = new GoogleAuthProvider()

export const loginWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const { uid, displayName, email } = user;
    const userRef = doc(db, "user", uid);
    const docSnap = await getDoc(userRef);

    if (!docSnap.exists()) {
      await setDoc(userRef, {
        uid,
        name: displayName || "Anonymous",
        email,
        authProvider: "google",
      });
    }

    return { success: true, user };
  } catch (error) {
    console.error("Google Sign-In error:", error);
    return { success: false, error: error };
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
    console.log("User logged out successfully");
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  }
};