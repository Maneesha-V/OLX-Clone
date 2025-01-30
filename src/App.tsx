import { Route, Routes } from "react-router-dom"
import Main from "./components/Main"
import Details from "./components/Details"
import Category from "./components/Category"
import AddProduct from "./components/AddProduct"
import { useContext, useEffect, useState } from "react"
import { FirebaseContext } from "../store/FirebaseContext"
import { onAuthStateChanged } from "firebase/auth"
import PrivateRoute from "./components/PrivateRoute"
import Login from "./components/Login"
import Sample from "./components/Sample"
import Reduce from "./components/Reduce"
import Callback from "./components/Callback"

const App = () => {
  const { setUser, auth }:any = useContext(FirebaseContext);
  const [loginPop, setLoginPop] = useState(false);
  const [sellLogin, setSellLogin] = useState(false);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("Auth state changed:", user);
      setUser(user);
    });
    return () => unsubscribe();
  },[auth, setUser]);
  return (
    <>
    <Routes>
      <Route path='/' element={<Main />} />
      <Route path='/login' element={
        <Login
        loginPop={loginPop}
        setLoginPop={setLoginPop}
        sellLogin={sellLogin}
        setSellLogin={setSellLogin}
      />
      } />
      <Route path='/details' element={<Details />} />
      <Route path='/sell-product' element={ <PrivateRoute><Category /></PrivateRoute>} />
      <Route path='/add-product/:category' element={<PrivateRoute><AddProduct /></PrivateRoute>} />
      <Route path='/sample' element={<Sample />} />
      <Route path='/reduce' element={<Reduce />} />
      <Route path='/callback' element={<Callback />} />
    </Routes>     
    </>
  )
}

export default App