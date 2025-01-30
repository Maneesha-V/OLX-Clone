import React, { createContext, useState, ReactNode  } from "react";

import { auth, db } from "../src/firebase/setup"
type FirebaseContextType = {
  auth: any; 
  db: any; 
  user: string;
  setUser: React.Dispatch<React.SetStateAction<string>>;
};
export const FirebaseContext = createContext<FirebaseContextType|null>(null);
type FirebaseProviderProps = {
  children: ReactNode;
};
export const FirebaseProvider: React.FC<FirebaseProviderProps> = ({ children }:any) => {
  const [user, setUser] = useState("");
  return (
    <FirebaseContext.Provider value={{ auth, db, user, setUser }}>
      {children}
    </FirebaseContext.Provider>
  );
};
