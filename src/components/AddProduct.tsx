import { useNavigate, useParams } from "react-router-dom";
import left_arrow from "../assets/left_arrow.png";
import { useContext, useEffect, useState } from "react";
import { FirebaseContext } from "../../store/FirebaseContext";
import { addDoc, collection } from "firebase/firestore";

const AddProduct = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [title,setTitle] = useState("");
  const [price,setPrice] = useState<number>()
  const [location,setLocation] = useState("");
  const [description,setDescription] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const { db, user } = useContext(FirebaseContext);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    setImages(files);
  };
  const uploadImageToCloudinary = async (files: File[]) => {
    console.log("files",files);
    const urls = await Promise.all(
      files.map(async (file)=>{
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
      formData.append("cloud_name", import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);

      try {
        const response = await fetch(import.meta.env.VITE_CLOUDINARY_UPLOAD_URL, {
          method: "POST",
          body: formData,
        });
        const data = await response.json();
        return data.secure_url;
      } catch (error) {
        console.error("Error uploading file:", error);
        throw error;
      }
      })
    )
    return urls
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedCategory || !price || price <= 0 || !title || !description || !location || images.length === 0) {
      alert("All fields are required.");
      return;
    }

    try {
      const imageUrl = await uploadImageToCloudinary(images);

      if (!imageUrl) {
        alert("Image upload failed")
        return;
      }

      const productData = {
        category: selectedCategory,
        price: price,
        location: location,
        title: title,
        description: description,
        images: imageUrl,
        userId: user?.uid || "Guest",
        createdAt: new Date(),
      };
      console.log("productData",productData);
    const docRef = await addDoc(collection(db, "products"), productData);
    console.log("Document written with ID:", docRef.id);
      alert("Product uploaded successfully!");
      setSelectedCategory("");
      setTitle("");
      setPrice(0);
      setLocation("");
      setDescription("");
      setImages([]);
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Product upload failed.");
    }
  };
  useEffect(() => {
    if (category) {
      setSelectedCategory(category);
    }
  }, [category]);
  return (
    <div>
      <div className="flex p-4 bg-gray-100 shadow-md">
        <div onClick={() => navigate("/")} className="cursor-pointer my-3 ml-2">
          <img src={left_arrow} alt="" className="w-6 h-5" />
        </div>
      </div>
      <div className="mt-8 text-center">
        <h1 className="text-2xl font-bold">POST YOUR AD</h1>
        <div className="w-2/3 mx-auto mt-10 p-6 border border-gray-300 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-center mb-6">Add Your Item</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col">
              <label
                htmlFor="category"
                className="mb-2 text-lg font-medium text-left"
              >
                Select Category
              </label>
              <select
                id="category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="">Choose a category</option>
                <option value="car">TV</option>
                <option value="car">Mobile</option>
                <option value="electronics">Electronics</option>
                <option value="furniture">Furniture</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="location"
                className="mb-2 text-lg font-medium text-left"
              >
                Name of Item
              </label>
              <input
                type="text"
                id="title" value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter name of item"
                className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="price"
                className="mb-2 text-lg font-medium text-left"
              >
                Set Price
              </label>
              <input
                type="number"
                id="price" value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                placeholder="Enter price"
                className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="location"
                className="mb-2 text-lg font-medium text-left"
              >
                Location
              </label>
              <input
                type="text"
                id="location" value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter location"
                className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="description" className="mb-2 text-lg font-medium text-left">
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter a brief description"
                className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="image"
                className="mb-2 text-lg font-medium text-left"
              >
                Upload Image
              </label>
              <input
                type="file"
                id="image"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              {images.length > 0 && (
                <div className="mt-4 grid grid-cols-4 gap-3">
                  {images.slice(0, 4).map((image, index) => (
                    <img
                      key={index}
                      src={URL.createObjectURL(image)}
                      alt={`Preview ${index + 1}`}
                      className="w-32 h-32 object-cover rounded-lg border border-gray-300"
                    />
                  ))}
                </div>
              )}
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition duration-200"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
