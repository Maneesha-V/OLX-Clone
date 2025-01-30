import { useNavigate } from "react-router-dom";
import left_arrow from "../assets/left_arrow.png";
import Footer from "./Footer";
import { useState } from "react";

const Category = () => {
  const navigate = useNavigate();
  const [category,setCategory] = useState('');
  
  const handleCategory = (value:string) => {
    setCategory(value);
    
    if(category === value){
      navigate(`/add-product/${value.toLowerCase()}`)
    }
  }
  return (
    <div>
      <div className="flex p-4 bg-gray-100 shadow-md">
        <div onClick={() => navigate("/")} className="cursor-pointer my-3 ml-2">
          <img src={left_arrow} alt="" className="w-6 h-5" />
        </div>
      </div>
      <div className="mt-8 text-center">
        <h1 className="text-2xl font-bold">POST YOUR AD</h1>
        <div className="mt-8 mb-[64px] border-2 p-4 w-1/3 mx-auto">
          <h1 className="text-lg font-semibold">CHOOSE A CATEGORY</h1>
          <div className="mt-4">
            <table className="w-1/2 table-auto border-separate border-spacing-2">
              <tr className="hover:bg-gray-400 cursor-pointer" onClick={()=>handleCategory("TV")}>
                <td className="border border-gray-300 px-4 py-2">TV</td>
              </tr>
              <tr className="hover:bg-gray-400 cursor-pointer" onClick={()=>handleCategory("Mobile")}>
                <td className="border border-gray-300 px-4 py-2">Mobile</td>
              </tr>
              <tr className="hover:bg-gray-400 cursor-pointer" onClick={()=>handleCategory("Furniture")}>
                <td className="border border-gray-300 px-4 py-2">Furniture</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </div>
    
  );
};

export default Category;
