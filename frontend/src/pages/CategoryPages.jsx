import { useNavigate } from "react-router-dom"; // Importamos el hook para redirigir
import roopa from "/ropaa.jpg";
import skate from "/skate.jpg";
import accesorios from "/accesorios.jpg";
import calzado from "/zapatillas.jpg";

const categories = [
  { id: 1, name: "Ropa", image: roopa },
  { id: 2, name: "Tablas y Accesorios", image: skate },
  { id: 3, name: "Calzado", image: calzado },
  { id: 4, name: "Protección y Equipamiento", image: accesorios },
];

const CategoryPages = () => {
  const navigate = useNavigate(); // Hook para redirigir

  const handleCategoryClick = (categoryId) => {
    console.log("Navegando a categoría:", categoryId); // 🔍 Verifica el ID antes de navegar
    navigate(`/categories/${categoryId}/products`); // Enviar ID en vez de nombre

  };


  return (
    <div className="flex justify-center items-center mt-10">
      <div className="2xl:mx-auto 2xl:container py-12 px-4 sm:px-6 xl:px-20 2xl:px-0 w-full">
        <div className="flex flex-col justify-center items-center space-y-10">
          <h1 className="text-3xl xl:text-4xl font-semibold leading-7 xl:leading-9 text-gray-800 dark:text-white">
            Categorías
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {categories.map((category, index) => (
              <div
                key={index}
                className="relative group flex justify-center items-center h-full w-full rounded-lg overflow-hidden shadow-md transition-transform transform hover:scale-105 hover:shadow-xl cursor-pointer"
                onClick={() => handleCategoryClick(category.name)}
              >
                <img
                  className="object-center object-cover h-full w-full"
                  src={category.image}
                  alt={category.name}
                />
                <button className="absolute bottom-4 z-10 text-base font-medium leading-none text-white py-2 px-5 bg-gray-900 bg-opacity-80 rounded-lg transition-all duration-300 group-hover:bg-opacity-100">
                  {category.name}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPages;
