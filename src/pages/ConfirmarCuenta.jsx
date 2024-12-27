import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import clienteAxios from "../config/axios";
import Alerta from '../components/Alerta';

const ConfirmarCuenta = () => {
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [alerta, setAlerta] = useState({})

  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const confirmarCuenta = async () => {
      try {
        const url = `/veterinarios/confirmar/${id}`
        
        const { data } = await clienteAxios(url);
        
        setCuentaConfirmada(true)
        setAlerta({
          msg: data.msg
        })

      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true
        })
      }

      setCargando(false)
    }
    confirmarCuenta();
  }, [])

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-bold text-6xl">Confirma tu cuenta y comienza a Administrar tus <span className="text-black">Pacientes</span></h1>
      </div>

      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        { !cargando && <Alerta alerta={alerta} />}

        {cuentaConfirmada && (
          <nav className="mt-10 d-flex">
          <Link 
          to="/"
          className="block text-center my-3 text-gray-100 bg-indigo-700 py-3 rounded-xl"
          >
          Iniciar Sesión
          </Link>
          </nav>
        )}
      </div>
    </>
  )
}

export default ConfirmarCuenta