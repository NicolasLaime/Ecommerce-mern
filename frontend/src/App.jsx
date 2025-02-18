import { Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import ProtectedRoute from "./layouts/ProtectedRoute"
import Dashboard from "./pages/Dashboard"
import Navbar from "./layouts/Navbar"
import Home from "./pages/Home"
import Cart from "./pages/Cart"
import CategoryPages from "./pages/CategoryPages"
import CategoryProduct from "./components/CategoryProduct"
import Footer from "./layouts/Footer"
import SobreNosotros from "./pages/SobreNosotros"

const App = () => {
  return (

    <>


      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/categories" element={<CategoryPages />} />
        <Route path="/categories/:categoryId/products" element={< CategoryProduct />} />
        <Route path="/sobrenosotros" element={<SobreNosotros />} />
        {/* Rutas protegidas */}
        <Route element={<ProtectedRoute />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>

      <Footer />


    </>




  )
}

export default App
