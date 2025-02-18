import { useCart } from "../context/CartContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  if (!cart || cart.length === 0) {
    return (
      <div className="h-screen bg-gray-100 flex items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-700">El carrito está vacío</h1>
      </div>
    );
  }

  const subtotal = cart.reduce(
    (acc, item) => acc + (item.price || 0) * item.quantity,
    0
  );
  const total = subtotal;

  const handleCheckout = async () => {
    if (isProcessing) return;

    const confirmed = window.confirm("¿Estás seguro de querer comprar estos productos?");
    if (!confirmed) return;

    setIsProcessing(true);
    const toastId = toast.loading("Procesando compra...");

    // Simulamos un retardo de 3 segundos en el proceso de compra
    setTimeout(() => {
      toast.update(toastId, {
        render: "Compra exitosa 🎉",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

      // Simula limpiar el carrito eliminando el item de localStorage
      localStorage.removeItem("cart");

      // Redirige al home después de 1 segundo
      setTimeout(() => {
        navigate("/");
      }, 1000);

      setIsProcessing(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-20 px-4">
      <h1 className="mb-6 text-center text-2xl font-bold">Carrito de Compras</h1>
      <div className="mx-auto max-w-5xl px-4 md:flex md:space-x-6 xl:px-0">
        {/* Lista de productos en el carrito */}
        <div className="rounded-lg md:w-2/3">
          {cart.map((item) => (
            <div
              key={item.id}
              className="mb-6 flex flex-col sm:flex-row items-center sm:items-start justify-between rounded-lg bg-white p-4 shadow-md space-y-4 sm:space-y-0 sm:space-x-4"
            >
              <img
                src={item.image || "/placeholder.png"}
                alt={item.name || "Producto"}
                className="w-full sm:w-32 rounded-lg object-cover"
              />
              <div className="sm:flex sm:w-full sm:justify-between">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">{item.name}</h2>
                  <p className="text-xs text-gray-700 mt-1">{item.size}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Stock disponible: {item.stock}
                  </p>
                </div>
                <div className="flex flex-col items-center sm:items-end space-y-2">
                  {/* Controles de cantidad */}
                  <div className="flex items-center border border-gray-200 rounded">
                    <button
                      onClick={() =>
                        item.quantity > 1 &&
                        updateQuantity(item.id, item.quantity - 1)
                      }
                      disabled={item.quantity <= 1}
                      className="px-3 py-1 bg-gray-100 hover:bg-blue-500 hover:text-white rounded-l"
                    >
                      -
                    </button>
                    <input
                      className="w-10 h-8 text-center bg-white border border-gray-200"
                      type="number"
                      value={item.quantity}
                      min="1"
                      readOnly
                    />
                    <button
                      onClick={() =>
                        item.quantity < item.stock &&
                        updateQuantity(item.id, item.quantity + 1)
                      }
                      disabled={item.quantity >= item.stock}
                      className="px-3 py-1 bg-gray-100 hover:bg-blue-500 hover:text-white rounded-r"
                    >
                      +
                    </button>
                  </div>
                  {/* Precio y botón de eliminar */}
                  <div className="flex items-center space-x-4">
                    <p className="text-sm font-semibold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                    <button onClick={() => removeFromCart(item.id)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-5 w-5 text-gray-500 hover:text-red-500"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Resumen del pedido */}
        <div className="mt-6 md:mt-0 md:w-1/3 rounded-lg border bg-white p-6 shadow-md">
          <div className="flex justify-between mb-2">
            <p className="text-gray-700">Subtotal</p>
            <p className="text-gray-700">${subtotal.toFixed(2)}</p>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between">
            <p className="text-lg font-bold">Total</p>
            <p className="text-lg font-bold">${total.toFixed(2)}</p>
          </div>
          <button
            className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
            onClick={handleCheckout}
            disabled={isProcessing}
          >
            {isProcessing ? "Procesando..." : "Comprar productos"}
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Cart;
