import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext"; // Ajusta la ruta según la ubicación de tu contexto

const CategoryProduct = () => {
  const { categoryId } = useParams();
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // Extraemos la función para agregar productos al carrito
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await axios.get(
          `${backendUrl}/api/categories/${categoryId}/products`
        );
        setProductos(response.data);
      } catch (error) {
        setError(error.response?.data || "Error al obtener productos");
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, [categoryId, backendUrl]);

  if (loading)
    return (
      <p className="text-center text-gray-600">Cargando productos...</p>
    );
  if (error)
    return <p className="text-center text-red-600">{error}</p>;

  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-3xl font-semibold mb-6">
        Productos de {categoryId}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {productos.map((producto) => (
          <div
            key={producto.id}
            className="border rounded-lg p-4 shadow-md flex flex-col"
          >
            <img
              src={producto.imageUrl}
              alt={producto.name}
              className="w-full h-48 object-cover rounded-md"
            />
            <h3 className="text-lg font-semibold mt-2">{producto.name}</h3>
            <p className="text-gray-600">${producto.price}</p>
            <button
              onClick={() => addToCart(producto)}
              className="mt-auto bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mt-4"
            >
              Agregar al carrito
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryProduct;
