import { Link } from "react-router-dom";
import { MenuContext } from "../../store/MenuContext";
import { useContext, useEffect, useState } from "react";
import { FirebaseContext } from "../../store/FirebaseContext";
import { collection, getDocs } from "firebase/firestore";

type productsProp = {
  search: any;
};
const Home = (props: productsProp) => {
  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);

  const firebaseContext = useContext(FirebaseContext);
  const menuContext = useContext(MenuContext);

  const menu = menuContext?.menu || "";
  useEffect(() => {
    if (firebaseContext) {
      const { db } = firebaseContext;
      console.log("db", db);
      const fetchProducts = async () => {
        try {
          const querySnapShot = await getDocs(collection(db, "products"));
          console.log("querySnapShot", querySnapShot);
          const productsData = querySnapShot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          console.log("productsData", productsData);
          console.log("menu",menu);
          
          setProducts(productsData);
        } catch (err) {
          console.error("Error fetching products: ", err);
        }
      };
      fetchProducts();
    }
  }, [firebaseContext]);
  useEffect(() => {
    const filtered = products.filter((product) =>
      menu
        ? product.category.toLowerCase().includes(menu.toLowerCase())
        : true
    );
    setFilteredProducts(filtered);
    console.log("filteredProducts",filteredProducts);
    
  }, [menu, products]);

  return (
    
    <div className="grid grid-cols-4 p-5 gap-3 mx-[5rem]">
      {filteredProducts
        ?.filter((data: any) =>
          data?.title
            ?.toLowerCase()
            .includes(props?.search?.toLowerCase() || "")
        )
        .map((product: any) => ( 
          <Link
            key={product.id}
            to="/details"
            state={{ data: product, search: props?.search }}
          >
            <div className="border border-spacing-1 p-4 flex flex-col space y-3">
              <div className="flex items-center justify-center">
                {product.images &&
                Array.isArray(product.images) &&
                product.images.length > 0 ? (
                  <img
                    src={product.images[0]}
                    className="w-60 h-48 object-cover"
                    alt={product.title}
                  />
                ) : (
                  <div className="w-60 h-48 bg-gray-200 flex items-center justify-center">
                    No Image
                  </div>
                )}
              </div>
              <div className="flex flex-col items-start space-y-1">
                <h1 className="font-bold text-xl">₹ {product.price}</h1>
                <h1>{product.title}</h1>
                <h1>{product.category}</h1>
              </div>
            </div>
          </Link>
        ))}
    </div>
  );
};

export default Home;
