import { useContext } from "react";
import { MenuContext } from "../../store/MenuContext";

const Menubar = () => {
  const menuContext = useContext(MenuContext);
  if (!menuContext) {
    return <div>Error: MenuContext is not available!</div>;
  }
  const { setMenu } = menuContext;
  return (
    <div className="flex shadow-sm h-10 p-2 my-[6px]">
      <h1 onClick={() => setMenu("TV")} className="ml-48 cursor-pointer">
        TV
      </h1>
      <h1 onClick={() => setMenu("Mobile")} className="ml-10 cursor-pointer">
        Mobile phones
      </h1>
      <h1 onClick={() => setMenu("Furniture")} className="ml-10 cursor-pointer">
        Furniture
      </h1>
      <h1
        onClick={() => setMenu("Electronics")}
        className="ml-10 cursor-pointer"
      >
        Electronics
      </h1>
      <h1 onClick={() => setMenu("Scooters")} className="ml-10 cursor-pointer">
        Scooters
      </h1>
      <h1 onClick={() => setMenu("Bike")} className="ml-10 cursor-pointer">
        Bike
      </h1>
      <h1
        onClick={() => setMenu("Apartments")}
        className="ml-10 cursor-pointer"
      >
        Apartments
      </h1>
    </div>
  );
};

export default Menubar;
