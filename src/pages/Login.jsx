import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";

const Login = () => {

    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ alerta, setAlerta ] = useState({});

    const { setAuth } = useAuth();

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
    e.preventDefault();

    if([email, password].includes('')) {
        setAlerta({ msg: "Hay campos vacíos", error: true })
        return;
    }

    try {
        const { data } = await clienteAxios.post('/veterinarios/login', { email, password });
        localStorage.setItem('token', data.token);
        setAuth(data);
        navigate('/admin');

    } catch (error) {
        setAlerta({ msg: error.response.data.msg, error: true })
    }

    }

    const {msg} = alerta;

    return (
        <>
            <div>
            <h1 className="text-indigo-600 font-bold text-6xl">Inicia Sesión y Administra tus <span className="text-black">Pacientes</span></h1>
            </div>
            <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
            <form onSubmit={handleSubmit}>
                <div className="my-5">
                <label htmlFor="" className="uppercase text-gray-600 block text-xl font-semibold">
                    Email
                </label>
                <input
                    type="email"
                    placeholder="Email de registro"
                    className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                    autoComplete="username"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                </div>
                <div className="my-5">
                <label htmlFor="" className="uppercase text-gray-600 block text-xl font-semibold">
                    Password
                </label>
                <input
                    type="password"
                    placeholder="Tu Password"
                    className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                    autoComplete="current-password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                </div>

                { msg && <Alerta 
                alerta={alerta}
                />}

                <input
                type="submit"
                value="Iniciar Sesión"
                className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-semibold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
                />
            </form>

            <nav className="mt-10 lg:flex lg:justify-between">
                <Link
                to="/registrar"
                className="block text-center my-5 text-gray-500"
                >
                ¿Aún no tienes una cuenta? Regístrate Aquí
                </Link>
                <Link
                to="/olvide-password"
                className="block text-center my-5 text-gray-500"
                >
                Olvidé mi contraseña
                </Link>
            </nav>
            </div>
        </>
    )
}

export default Login