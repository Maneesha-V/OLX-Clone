import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";

const Details = () => {
  const location = useLocation();
  console.log(location);
  return (
    <>
    <Navbar setSearch={location?.state?.search} />
    <div className="grid grid-cols-10 gap-8 p-8 bg-gray-100">
      <div className="col-span-6 space-y-4">
        <div className="bg-white flex justify-center items-center">
          <img
            src={location?.state?.data?.images[0]}
            alt=""
            className="w-1/2 h-auto object-cover rounded-md"
          />
        </div>
        <div className="bg-white p-4">
          <h1 className="text-xl font-bold">Description</h1>
          <h1>{location?.state?.data?.description}</h1>
        </div>
      </div>
      <div className="col-span-4 space-y-8">
        <div className="bg-white p-4">
          <h1 className="text-3xl font-bold text-gray-800">
            {" "}
            ₹ {location?.state?.data?.price}
          </h1>
          <h1>{location?.state?.data?.title}</h1>
        </div>

        <div className="space-y-4 bg-white p-4">
          <h1 className="text-xl font-bold">OLX User</h1>
          <button className="w-full px-4 py-2 border-[3px] border-black bg-white text-black rounded-md">
            Chat with Seller
          </button>
        </div>
        <div className="bg-white p-4">
          <h1 className="text-xl font-bold">Posted in</h1>
          <h1>{location?.state?.data?.location}</h1>
        </div>
      </div>
    </div>
    </>
  );
};

export default Details;
