import React, { createContext, useContext, useState, useEffect } from "react";
import {
  signupWithEmail,signinWithEmail,
  signinWithGoogle,
  signout,
  onAuthStateChangedListener,
  addData,
  setData
} from "./index"; // Import the helper file

// Create Context
const AuthContext = createContext();

// Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // track auth loading state

  // Listen to auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe(); // cleanup
  }, []);

  // Auth functions
  const register = (email, password) => signupWithEmail(email, password);
  const login = (email, password) => signinWithEmail(email, password);
  const loginWithGoogle = () => signinWithGoogle();
  const logout = () => signout();

  // Firestore functions
  const addDocument = (collectionName, data) => addData(collectionName, data);
  const setDocument = (collectionName, docId, data) => setData(collectionName, docId, data);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        register,
        login,
        loginWithGoogle,
        logout,
        addDocument,
        setDocument
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth
export const useAuth = () => {
  return useContext(AuthContext);
};
