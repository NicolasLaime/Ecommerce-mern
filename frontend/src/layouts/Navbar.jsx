import { useState, useRef, useEffect } from "react";
import { useCart } from "../context/CartContext"; // Asegúrate de importar correctamente tu contexto

const Navbar = () => {
  const { cart } = useCart(); // Obtiene el carrito del contexto
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Cierra el dropdown al hacer clic fuera de él
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Calcula la cantidad total de productos en el carrito
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-gray-900 shadow-md">
      <section className="relative mx-auto">
        <nav className="flex justify-between text-white w-full px-5 xl:px-12 py-6">
          <a className="text-3xl font-bold font-heading" href="/">
            VintageNL
          </a>

          {/* Nav Links (Desktop) */}
          <ul className="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12">
            <li>
              <a className="hover:text-gray-200" href="/">
                Home
              </a>
            </li>
            <li>
              <a className="hover:text-gray-200" href="/categories">
                Categorías
              </a>
            </li>
            <li>
              <a className="hover:text-gray-200" href="/sobrenosotros">
                Sobre Nosotros
              </a>
            </li>
          </ul>

          {/* Icons */}
          <div className="hidden xl:flex items-center space-x-5">
            {/* Carrito con nuevo icono y contador */}
            <a className="relative hover:text-gray-200" href="/cart">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l3 7h10l3-7h2M7 10l1 10h8l1-10M10 21h4"
                />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full px-2 py-1">
                  {totalItems}
                </span>
              )}
            </a>

            {/* Usuario (Dropdown) */}
            <div className="relative" ref={dropdownRef}>
              <button
                className="hover:text-gray-200"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5.121 17.804A6.978 6.978 0 0112 15c2.308 0 4.408.936 5.879 2.804M15 7a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-black shadow-lg rounded-lg">
                  <ul className="text-center">
                    <li>
                      <a className="block px-4 py-2 hover:bg-gray-200" href="/login">
                        Login
                      </a>
                    </li>
                    <li>
                      <a className="block px-4 py-2 hover:bg-gray-200" href="/register">
                        Register
                      </a>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </nav>

        {/* Menú Móvil */}
        {/* Se cambia xl:hidden por md:hidden para que el botón solo se muestre en pantallas pequeñas */}
        <button
          className="md:hidden flex items-center absolute right-6 top-6"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 hover:text-gray-200"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <div
          className={`absolute top-16 left-0 w-full bg-gray-900 text-white py-4 transition-all duration-300 ease-in-out ${
            isOpen ? "block" : "hidden"
          } md:hidden`}
        >
          <ul className="text-center font-semibold font-heading space-y-4">
            <li>
              <a className="block py-2 hover:text-gray-200" href="/">
                Home
              </a>
            </li>
            <li>
              <a className="block py-2 hover:text-gray-200" href="/categories">
                Categorías
              </a>
            </li>
            <li>
              <a className="block py-2 hover:text-gray-200" href="/sobrenosotros">
                Sobre Nosotros
              </a>
            </li>
            <li>
              <a className="block py-2 hover:text-gray-200" href="/login">
                Login
              </a>
            </li>
            <li>
              <a className="block py-2 hover:text-gray-200" href="/register">
                Register
              </a>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Navbar;
