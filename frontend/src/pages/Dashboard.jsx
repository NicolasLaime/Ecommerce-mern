import axios from "axios";
import { useState, useEffect } from "react";
import AgregarProducto from "../components/AgregarProducto";

const Dashboard = () => {
  const [productos, setProductos] = useState([]);
  const [vistaActual, setVistaActual] = useState("bienvenida");
  const [totalVentas, setTotalVentas] = useState(0);
  const [productoEditando, setProductoEditando] = useState(null);
  const [formEdit, setFormEdit] = useState({ name: "", description: "", price: 0, categoryId: "" });

  // Obtenemos la URL del backend desde el .env
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    if (vistaActual === "productos") fetchProductos();
    if (vistaActual === "ventas") fetchTotalVentas();
  }, [vistaActual]);

  const fetchProductos = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/admin/products`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setProductos(response.data);
    } catch (error) {
      console.error("Error al obtener productos:", error);
    }
  };

  const fetchTotalVentas = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/admin/total-ventas`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setTotalVentas(response.data);
    } catch (error) {
      console.error("Error al obtener total de ventas:", error);
    }
  };

  const eliminarProducto = async (id) => {
    try {
      await axios.delete(`${backendUrl}/api/admin/deleteProduct/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setProductos(productos.filter((producto) => producto.id !== id));
    } catch (error) {
      console.error("Error al eliminar producto:", error);
    }
  };

  const cargarEdicion = (producto) => {
    setProductoEditando(producto);
    setFormEdit({ ...producto });
    setVistaActual("editar");
  };

  const editarProducto = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", formEdit.name);
      formData.append("description", formEdit.description);
      formData.append("price", formEdit.price);
      formData.append("categoryId", formEdit.categoryId);

      if (formEdit.imageUrl) {
        formData.append("imageUrl", formEdit.imageUrl);
      }

      if (formEdit.file) {
        formData.append("file", formEdit.file);
      }

      await axios.put(
        `${backendUrl}/api/admin/updateProduct/${productoEditando.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setProductos(
        productos.map((p) =>
          p.id === productoEditando.id ? { ...p, ...formEdit } : p
        )
      );
      setVistaActual("productos");
    } catch (error) {
      console.error("Error al editar producto:", error);
    }
  };

  return (
    <div className="flex mt-20">
      <aside className="bg-gray-800 text-white w-64 min-h-screen p-4">
        <nav>
          <ul className="space-y-2">
            <li>
              <button className="p-2 w-full text-left" onClick={() => setVistaActual("agregar")}>
                Agregar Producto
              </button>
            </li>
            <li>
              <button className="p-2 w-full text-left" onClick={() => setVistaActual("productos")}>
                Mostrar Productos
              </button>
            </li>
            <li>
              <button className="p-2 w-full text-left" onClick={() => setVistaActual("ventas")}>
                Total de Ventas
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      <div className="p-4 flex-1">
        {vistaActual === "bienvenida" && (
          <>
            <h1 className="text-3xl font-bold mb-4">Bienvenido al Dashboard Admin</h1>
            <p className="text-gray-700 mb-6">
              Aquí puedes administrar tus productos y ver tus ventas.
            </p>
          </>
        )}
        {vistaActual === "agregar" && <AgregarProducto onProductAdded={fetchProductos} />}
        {vistaActual === "productos" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Lista de Productos</h2>
            <ul>
              {productos.map((producto) => (
                <li key={producto.id} className="border p-2 mb-2 flex justify-between items-center">
                  <span>
                    {producto.name} - ${producto.price}
                  </span>
                  <div>
                    <button className="bg-blue-500 text-white px-2 py-1 mr-2 rounded" onClick={() => cargarEdicion(producto)}>
                      Editar
                    </button>
                    <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => eliminarProducto(producto.id)}>
                      Eliminar
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
        {vistaActual === "editar" && (
          <div className="bg-white p-4 rounded-lg shadow-md mt-4">
            <h2 className="text-2xl font-bold mb-4">Editar Producto</h2>
            <form onSubmit={editarProducto}>
              <input
                type="text"
                className="border p-2 w-full mb-2"
                placeholder="Nombre del producto"
                value={formEdit.name}
                onChange={(e) => setFormEdit({ ...formEdit, name: e.target.value })}
              />

              <input
                type="text"
                className="border p-2 w-full mb-2"
                placeholder="Descripción"
                value={formEdit.description}
                onChange={(e) => setFormEdit({ ...formEdit, description: e.target.value })}
              />

              <input
                type="number"
                className="border p-2 w-full mb-2"
                placeholder="Precio"
                value={formEdit.price}
                onChange={(e) => setFormEdit({ ...formEdit, price: e.target.value })}
              />

              <input
                type="number"
                className="border p-2 w-full mb-2"
                placeholder="ID de Categoría"
                value={formEdit.categoryId || ""}
                onChange={(e) => setFormEdit({ ...formEdit, categoryId: e.target.value })}
              />

              <input
                type="text"
                className="border p-2 w-full mb-2"
                placeholder="URL de la imagen (opcional)"
                value={formEdit.imageUrl || ""}
                onChange={(e) => setFormEdit({ ...formEdit, imageUrl: e.target.value })}
              />

              <input
                type="file"
                className="border p-2 w-full mb-2"
                onChange={(e) => setFormEdit({ ...formEdit, file: e.target.files[0] })}
              />

              <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded mt-2">
                Guardar Cambios
              </button>
            </form>
          </div>
        )}

        {vistaActual === "ventas" && (
          <div className="absolute right-0 top-0 w-1/2 h-full bg-white p-4 shadow-lg mt-10">
            <h2 className="text-2xl font-bold mb-4">Total de Ventas</h2>
            <p className="text-3xl font-bold text-green-600">${totalVentas}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
