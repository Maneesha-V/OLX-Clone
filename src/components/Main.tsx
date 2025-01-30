import { useState } from "react"
import Menubar from "./Menubar"
import Navbar from "./Navbar"
import Home from "./Home"
import Footer from "./Footer"

const Main = () => {

  const [search,setSearch] = useState('')
  return (
    <div>
        <Navbar setSearch={setSearch} />
        <Menubar />
        <h1 className="text-2xl font-medium ml-[100px] mt-[10px]">Fresh recommendations</h1>
        <Home search={search} />
        <Footer />
    </div>
  )
}

export default Main