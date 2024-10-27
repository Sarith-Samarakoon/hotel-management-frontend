import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [categoriesIsLoaded, setCategoriesIsLoaded] = useState(false);
  useEffect(() => {
    if (!categoriesIsLoaded) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/category")
        .then((res) => {
          setCategories(res.data.categories);
          setCategoriesIsLoaded(true);
        });
    }
  }, [categoriesIsLoaded]);

  function deleteCategory(name) {
    alert("Are you sure you want to delete this " + name + " category?");
    axios
      .delete(import.meta.env.VITE_BACKEND_URL + "/api/category/" + name)
      .then((res) => {
        setCategoriesIsLoaded(false);
      });
  }

  return (
    <div className="w-full">
      <div className="p-4">
        <h1 className="text-3xl font-semibold mb-6 text-white">Categories</h1>
        <table className="min-w-full bg-white rounded-lg shadow-lg overflow-hidden">
          <thead>
            <tr className="bg-blue-600 text-white text-left">
              <th className="py-3 px-6 border-b font-medium">Category Name</th>
              <th className="py-3 px-6 border-b font-medium">Price</th>
              <th className="py-3 px-6 border-b font-medium">Features</th>
              <th className="py-3 px-6 border-b font-medium">Description</th>
              <th className="py-3 px-6 border-b font-medium">Image</th>
              <th className="py-3 px-6 border-b font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
              <tr
                key={index}
                className={`hover:bg-gray-100 ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
              >
                <td className="py-4 px-6 border-b text-gray-700">
                  {category.name}
                </td>
                <td className="py-4 px-6 border-b text-gray-700">
                  ${category.price}
                </td>
                <td className="py-4 px-6 border-b text-gray-700">
                  {category.features.join(", ")}
                </td>
                <td className="py-4 px-6 border-b text-gray-700">
                  {category.description}
                </td>
                <td className="py-4 px-6 border-b">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-16 h-16 object-cover rounded-full shadow-md"
                  />
                </td>
                <td className="py-4 px-6 border-b text-gray-700">
                  <button
                    onClick={() => {
                      deleteCategory(category.name);
                    }}
                    className="bg-red-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
