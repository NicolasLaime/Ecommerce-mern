import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const fetchStock = async (productId) => {
    if (!productId) {
      console.error("Error: productId inválido en fetchStock", productId);
      return null;
    }

    try {
      console.log(`Obteniendo stock para el producto: ${productId}`);
      const response = await axios.get(`${backendUrl}/api/products/${productId}`);
      console.log("Stock obtenido:", response.data.stock);
      return response.data.stock;
    } catch (error) {
      console.error("Error obteniendo el stock:", error);
      return null;
    }
  };

  const addToCart = (product) => {
    if (!product || !product.id) {
      console.error("Error: Producto inválido en addToCart", product);
      return;
    }

    // Primero obtenemos el stock del producto antes de modificar el carrito
    fetchStock(product.id).then((updatedStock) => {
      if (updatedStock === null) {
        alert("No se pudo obtener el stock. Intenta nuevamente.");
        return;
      }

      setCart((prevCart) => {
        const existingProduct = prevCart.find((item) => item.id === product.id);

        if (existingProduct) {
          if (existingProduct.quantity < updatedStock) {
            return prevCart.map((item) =>
              item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            );
          } else {
            alert("No hay suficiente stock disponible.");
            return prevCart;
          }
        } else {
          return updatedStock > 0 ? [...prevCart, { ...product, quantity: 1 }] : prevCart;
        }
      });
    });
  };

  const removeFromCart = (id) => {
    console.log("Eliminando producto del carrito con id:", id);
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const updateQuantity = async (id, quantity) => {
    if (!id) {
      console.error("Error: id inválido en updateQuantity", id);
      return;
    }

    console.log(`Actualizando cantidad del producto ${id} a ${quantity}`);

    const updatedStock = await fetchStock(id);
    if (updatedStock !== null) {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(1, Math.min(quantity, updatedStock)) }
            : item
        )
      );
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
