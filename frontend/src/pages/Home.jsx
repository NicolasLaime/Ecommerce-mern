import video from "/video.mp4"; // Video local (o usa un enlace externo)
import ProductList from "../components/ProductList";

const Home = () => {
  return (
    <div>
      {/* Video de presentación */}
      <div className="relative w-full h-[400px] overflow-hidden">
        <video
          autoPlay
          loop
          muted
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source src={video} type="video/mp4" />
        </video>
        <div className="absolute inset-0 flex items-center justify-center bg-black/40">
          <h1 className="text-white text-4xl font-bold">
            Descubre lo mejor en nuestro eCommerce
          </h1>
        </div>
      </div>


      {/* Lista completa de productos */}
      <h1 className="text-center text-2xl font-bold my-10">Nuestros Productos</h1>
      <ProductList />
    </div>
  );
};

export default Home;
