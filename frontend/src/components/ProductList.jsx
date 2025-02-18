import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";

const ProductList = () => {
  const [products, setProducts] = useState([]); // Estado para los productos
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(null); // Estado para errores

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products`);
        setProducts(response.data);
      } catch (error) {
        console.error("Error al obtener productos:", error);
        setError("Hubo un problema al cargar los productos.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-600">Cargando productos...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600">{error}</p>;
  }

  return (
    <div className="flex flex-wrap justify-center gap-4 p-4">
      {Array.isArray(products) && products.length > 0 ? (
        products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            stock={product.stock}
            price={product.price}
            imageUrl={product.imageUrl}
          />
        ))
      ) : (
        <p className="text-center text-gray-600">No hay productos disponibles.</p>
      )}
    </div>
  );
};

export default ProductList;
