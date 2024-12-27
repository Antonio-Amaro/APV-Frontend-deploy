import { useState } from "react";
import { Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";

const OlvidePassword = () => {

  const [email, setEmail] = useState('');
  const [alerta, setAlerta] = useState({})

  const handleSubmit = async e => {
    e.preventDefault();

    if(email === '') {
      setAlerta({msg: 'Coloca tu email de Registro', error: true})
      return;
    }

    try {
      const {data} = await clienteAxios.post('/veterinarios/olvide-password', { email });

      setAlerta({ msg: data.msg });
      
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }

  }
  const {msg} = alerta;


  return (
    <>
      <div>
            <h1 className="text-indigo-600 font-bold text-6xl">Recupera el acceso a tu <span className="text-black">Cuenta</span></h1>
        </div>
        <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
            <form onSubmit={handleSubmit} >

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
                />
                </div>

                { msg && <Alerta 
                    alerta={alerta}
                />}

                <input 
                type="submit"
                value="Enviar Instrucciones"
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
                to="/registrar"
                className="block text-center my-3 text-gray-500"
                >
                ¿Aún no tienes una cuenta? Registrate
                </Link>
            </nav>

          </div>
    </>
  )
}

export default OlvidePassword