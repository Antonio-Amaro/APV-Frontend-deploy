import { useState } from "react";
import { Link } from "react-router-dom";
import clienteAxios from "../config/axios";
import Alerta from "../components/Alerta";

const Registrar = () => {

    const [ nombre, setNombre ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ repetirPassword, setRepetirPassword ] = useState('')
    const [ alerta, setAlerta ] = useState({})


    const handleSubmit = async (e) => {
        e.preventDefault();

        if([ nombre, email, password, repetirPassword ].includes('')) {
            setAlerta({msg: 'Hay campos vacíos', error: true});
            return;
        }

        if(password !== repetirPassword) {
            setAlerta({msg: 'Los passwords no son iguales', error: true});
            return;
        }

        if(password.length < 6) {
            setAlerta({msg: 'El password es muy corto, debe contener al menos 6 caracteres', error: true});
            return;
        }

        setAlerta({});

        // Crear el usuario en la api
        try {

            await clienteAxios.post('/veterinarios', { nombre, email, password });
            setAlerta({
                msg: 'Cuenta creada correctamente. Revisa tu email para activarla.',
                error: false
            })

            // Limpiar los campos del formulario
            setNombre('');
            setEmail('');
            setPassword('');
            setRepetirPassword('');

        } catch (error) {
            console.log(error.response)
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }
        
    }

    const { msg } = alerta;

    return (
      <>
        <div>
            <h1 className="text-indigo-600 font-bold text-6xl">Crea tu cuenta y Administra tus <span className="text-black">Pacientes</span></h1>
        </div>
        <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
            
            <form
                onSubmit={handleSubmit}
            >
            <div className="my-5">
                <label htmlFor="" className="uppercase text-gray-600 block text-xl font-semibold">
                    Nombre
                </label>
                <input 
                    type="text"
                    placeholder="Tu nombre"
                    className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                />
                </div>
                <div className="my-5">
                <label htmlFor="" className="uppercase text-gray-600 block text-xl font-semibold">
                    Email
                </label>
                <input 
                    type="email"
                    placeholder="Email de registro"
                    className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    autoComplete="username"
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
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    autoComplete="new-password"
                />
                </div>
                <div className="my-5">
                <label htmlFor="" className="uppercase text-gray-600 block text-xl font-semibold">
                    Repetir Password
                </label>
                <input 
                    type="password"
                    placeholder="Repite tu Password"
                    className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                    value={repetirPassword}
                    onChange={e => setRepetirPassword(e.target.value)}
                    autoComplete="new-password"
                />
                </div>
                
                { msg && <Alerta 
                    alerta={alerta}
                />}

                <input 
                type="submit"
                value="Crear Cuenta"
                className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-semibold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
                />

            </form>
            
            <nav className="mt-10 lg:flex lg:justify-between">
                <Link 
                to="/"
                className="block text-center my-3 text-gray-500"
                >
                ¿Ya tienes una cuenta? Inicia Sesión
                </Link>
                <Link 
                to="/olvide-password"
                className="block text-center my-3 text-gray-500"
                >
                Olvidé mi contraseña
                </Link>
            </nav>

          </div>
      </>
    )
  }
  
  export default Registrar