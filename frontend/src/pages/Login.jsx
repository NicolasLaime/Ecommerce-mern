import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import login from "/login.jpeg"

const API_URL = import.meta.env.VITE_BACKEND_URL;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${API_URL}/api/auth/login`, { email, password });

      // Almacenar token y roles en localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("roles", JSON.stringify(data.roles));

      toast.success("Inicio de sesión exitoso");

      // Redirigir según el rol del usuario
      const isAdmin = data.roles.includes("ROLE_ADMIN");
      navigate(isAdmin ? "/admin/dashboard" : "/");
    } catch (error) {
      toast.error("Error al iniciar sesión");
      console.error("Error:", error.response?.data || error.message);
    }
  };

  return (
    <div className="bg-gray-100 flex justify-center items-center h-screen">
      {/* Imagen (Solo visible en pantallas grandes) */}
      <div className="w-1/2 h-screen hidden lg:block">
        <img
          src={login}
          alt="Placeholder Image"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Formulario */}
      <div className="lg:p-36 md:p-52 sm:p-20 p-8 w-full lg:w-1/2">
        <h1 className="text-2xl font-semibold mb-4">Login</h1>
        <form onSubmit={handleLogin}>
          {/* Input de Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              placeholder="Email"
            />
          </div>

          {/* Input de Contraseña */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-600">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              placeholder="Password"
            />
          </div>





          {/* Botón de Iniciar Sesión */}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
          >
            Iniciar Sesión
          </button>
        </form>

        {/* Enlace de Registro */}
        <div className="mt-6 text-blue-500 text-center">
          <p>No tienes cuenta?</p>
          <a href="/register" className="hover:underline ">Registrate!</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
