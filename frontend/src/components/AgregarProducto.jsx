import { useState } from "react";
import axios from "axios";

const AgregarProducto = ({ onProductAdded }) => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    categoryId: "",
    stock: "", // Nuevo campo
    imageUrl: "",
    file: null,
  });

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setProduct((prev) => ({ ...prev, file: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(product).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });

    try {
      await axios.post(`${backendUrl}/api/admin/addProduct`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Producto agregado exitosamente");
      setProduct({
        name: "",
        description: "",
        price: "",
        categoryId: "",
        stock: "",
        imageUrl: "",
        file: null,
      });
      onProductAdded();
    } catch (error) {
      console.error("Error al agregar el producto:", error);
      alert("Error al agregar producto");
    }
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Agregar Producto</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" placeholder="Nombre" value={product.name} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="text" name="description" placeholder="Descripción" value={product.description} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="number" name="price" placeholder="Precio" value={product.price} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="number" name="categoryId" placeholder="ID de Categoría" value={product.categoryId} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="text" name="imageUrl" placeholder="URL de Imagen (opcional)" value={product.imageUrl} onChange={handleChange} className="w-full p-2 border rounded" />
        <input type="file" name="file" onChange={handleFileChange} className="w-full p-2 border rounded" />
        <input type="number" name="stock" placeholder="Stock" value={product.stock} onChange={handleChange} className="w-full p-2 border rounded" required />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600">
          Agregar Producto
        </button>
      </form>
    </div>
  );
};

export default AgregarProducto;
