import olx from "../assets/olx.png";
import lens from "../assets/lens.png";
import arrow from "../assets/arrow.png";
import search from "../assets/search.png";
import favorite from "../assets/favorite.png";
import Login from "../components/Login";
import { useEffect, useState } from "react";
import { logoutUser } from "../firebase/setup"
import { getAuth, onAuthStateChanged } from "firebase/auth";


type searchProp = {
  setSearch: any,
}
const Navbar = (props:searchProp) => {
  const [loginPop, setLoginPop] = useState(false);
  const [sellLogin,setSellLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);  
      } else {
        setIsLoggedIn(false);  
      }
    });
    return () => unsubscribe();
  }, []);
  const handleLogout = async () => {
    try {
      await logoutUser(); 
      setIsLoggedIn(false); 
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  return (
    <>
      <div className="flex p-4 bg-gray-100 shadow-md">
        <img src={olx} alt="" className="w-12 h-9" />
        <div className="flex items-center border-[3px] w-auto p-2 border-black bg-white ml-5 space-x-2">
          <img src={lens} alt="Lens Icon" className="w-6 h-5" />
          <input
            type="text"
            placeholder="Search city, area, or locat..."
            className="flex-1 outline-none px-2"
          />
          <img src={arrow} alt="Arrow Icon" className="w-8 h-7" />
        </div>

        <div className="flex h-12 ml-4 border-[3px] border-black bg-white items-center space-x-2">
          <input onChange={(e)=>props?.setSearch(e.target.value)}
            type="text"
            placeholder="Find Cars, Mobile phones and more"
            className="ml-3 w-[600px] outline-none px-2"
          />
          <img src={search} alt="Search Icon" className="w-10 h-12 ml-2" />
        </div>

        <div className="flex h-12 p-3 ml-10 cursor-pointer">
          <h1 className="font-semibold text-lg">ENGLISH</h1>
          <img src={arrow} alt="" className="w-8 h-7" />
        </div>
        <div className="flex h-12 p-3 ml-2 cursor-pointer">
          <img src={favorite} alt="" className="w-8 h-7" />
        </div>
        {isLoggedIn ? (
          <div
            onClick={handleLogout}
            className="flex h-12 p-3 ml-2 cursor-pointer underline hover:no-underline"
          >
            <h1 className="font-medium text-xl">Logout</h1>
          </div>
        ):(
          <div
          onClick={() => {
            setLoginPop(!loginPop);
          }}
          className="flex h-12 p-3 ml-2 cursor-pointer underline hover:no-underline"
        >
          <h1 className="font-medium text-xl">Login</h1>
        </div>
        )}
        <div  
          onClick={() => {
            setSellLogin(!sellLogin);
          }}
          className="flex h-12 p-2 w-28 ml-4 cursor-pointer rounded-full border border-yellow-500 bg-white">
          <h1 className="font-semibold text-lg ml-3">+ SELL</h1>
        </div>
      </div>

      {(loginPop || sellLogin) && (
  <Login
    loginPop={loginPop}
    setLoginPop={setLoginPop}
    sellLogin={sellLogin}
    setSellLogin={setSellLogin}
  />
)}
    </>
  );
};

export default Navbar;


