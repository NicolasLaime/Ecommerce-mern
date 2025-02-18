const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 px-4 text-center">
      <div className="container mx-auto flex flex-col md:flex-row md:justify-between gap-6">
        <div>
          <h2 className="text-lg font-bold">VintageNL</h2>
          <p className="text-gray-400 mt-2">Los mejores productos al mejor precio.</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Enlaces rápidos</h3>
          <ul className="mt-2 space-y-1">
            <li><a href="#" className="text-gray-400 hover:text-white">Inicio</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">Productos</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">Carrito</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">Contacto</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Contáctanos</h3>
          <p className="text-gray-400 mt-2">Email: nicolaime100@gmail.com</p>
          <div className="flex justify-center space-x-4 mt-4">
            <a href="#" className="text-gray-400 hover:text-white">FB</a>
            <a href="#" className="text-gray-400 hover:text-white">IG</a>
            <a href="#" className="text-gray-400 hover:text-white">TW</a>
          </div>
        </div>
      </div>
      <div className="mt-8 text-gray-500 text-sm">© {new Date().getFullYear()} Creado por Nicolás Laime. Todos los derechos reservados.</div>
    </footer>
  );
};

export default Footer;