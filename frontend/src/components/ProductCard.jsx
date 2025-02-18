import { useCart } from "../context/CartContext";

const ProductCard = ({ id, name, price, imageUrl, stock }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    const product = {
      id,
      name,
      price,
      image: imageUrl,
      stock,
    };
    addToCart(product);
  };

  return (
    <div className="max-w-xs cursor-pointer rounded-lg bg-white p-2 shadow duration-150 hover:scale-105 hover:shadow-md">
      <img
        className="w-full h-48 rounded-lg object-cover object-center"
        src={imageUrl}
        alt={name}
      />
      <p className="my-4 pl-4 font-bold text-gray-500">{name}</p>
      <p className="mb-4 ml-4 text-xl font-semibold text-gray-800">${price}</p>
      <button
        onClick={handleAddToCart}
        className="mb-4 ml-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        Agregar al carrito
      </button>
    </div>
  );
};

export default ProductCard;
