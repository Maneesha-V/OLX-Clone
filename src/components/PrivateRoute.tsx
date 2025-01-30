import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const PrivateRoute = ({children}:{children: JSX.Element}) => {
    const [isAuthenticated,setIsAuthenticated] = useState(false);
    const navigate = useNavigate();
    useEffect(()=> {
        const auth = getAuth()
        const unsubscribe = onAuthStateChanged(auth,(user)=>{
            if(user){
                setIsAuthenticated(true)
            } else {
                setIsAuthenticated(false)
                navigate("/login")
            }
        })
        return () => unsubscribe();
    },[navigate])
    if(!isAuthenticated){
        return null
    }
    return children
}
export default PrivateRoute