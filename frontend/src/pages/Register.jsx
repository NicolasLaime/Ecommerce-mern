import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import register from "/register.jpg"

const API_URL = import.meta.env.VITE_BACKEND_URL;

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${API_URL}/api/auth/register`, { username, email, password });

      toast.success("Usuario registrado con éxito 🎉");

      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      toast.error(error.response?.data || "Error al registrar");
    }
  };

  return (
    <div className="bg-gray-100 flex justify-center items-center h-screen">
      <ToastContainer />

      {/* Imagen a la izquierda en pantallas grandes */}
      <div className="w-1/2 h-screen hidden lg:block">
        <img
          src={register}
          alt="Placeholder Image"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Formulario de registro */}
      <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
        <h1 className="text-2xl font-semibold mb-4">Registro</h1>
        <form onSubmit={handleRegister} className="space-y-4">
          {/* Username */}
          <div>
            <label className="block text-gray-600">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-600">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-600">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Botón de Registro */}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
          >
            Registrarse
          </button>
        </form>

        {/* Link para iniciar sesión */}
        <div className="mt-6 text-blue-500 text-center">
          <a href="/login" className="hover:underline">¿Ya tienes cuenta? Inicia sesión aquí</a>
        </div>
      </div>
    </div>
  );
};

export default Register;
