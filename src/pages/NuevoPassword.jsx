import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Alerta from '../components/Alerta';
import clienteAxios from "../config/axios";

const NuevoPassword = () => {

    const [password, setPassword] = useState('');
    const [repetirPassword, setRepetirPassword] = useState('');
    const [alerta, setAlerta] = useState({});
    const [tokenValido, setTokenValido] = useState(false);
    const [passModificado, setPassModificado] = useState(false)
    const [deshabilitar, setDeshabilitar] = useState(false);

    const params = useParams();
    const { token } = params;

    useEffect(() => {
        const comprobarToken = async () => {
            try {
                await clienteAxios(`/veterinarios/olvide-password/${token}`);
                setTokenValido(true);
            } catch (error) {
                setAlerta({
                    msg: 'Hubo un error en el enlace',
                    error: true
                })
            }
        }
        comprobarToken();
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(password.length < 6) {
            setAlerta({
                msg: "El password debe contener mínimo 6 caracteres",
                error: true
            })
            return
        }

        if(password !== repetirPassword) {
            setAlerta({msg: 'Los passwords no son iguales', error: true});
            return;
        }

        try {
            const url = `/veterinarios/olvide-password/${token}`;
            const { data } = await clienteAxios.post(url, { password })
            console.log(data);
            setPassModificado(true)
            setDeshabilitar(true);

            setAlerta({
                msg: data.msg
            })
            
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }
    }

    const { msg } = alerta

    return (
        <>
            <div>
                <h1 className="text-indigo-600 font-bold text-6xl">Reestablece tu Password y Administra tus <span className="text-black">Pacientes</span></h1>
            </div>

            <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
                {msg && <Alerta
                    alerta={alerta}
                />}

                {tokenValido && (
                    <form onSubmit={handleSubmit}>
                        <div className="my-5">
                            <label htmlFor="" className="uppercase text-gray-600 block text-xl font-semibold">
                                Nuevo Password
                            </label>
                            <input
                                type="password"
                                placeholder="Escribe tu nuevo Password"
                                className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                autoComplete="new-password"
                            />
                        </div>
                        <div className="my-5">
                            <label className="uppercase text-gray-600 block text-xl font-semibold">
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
                        <div className="my-5">
                            El password debe contener al menos 6 caracteres
                        </div>



                        <input
                            type="submit"
                            value="Guardar Cambios"
                            className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-semibold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
                            disabled={deshabilitar}
                        />
                    </form>
                )}

                {passModificado && <Link 
                to="/"
                className="block text-center my-3 text-gray-500"
                >
                Iniciar Sesión
                </Link>}
            </div>
        </>
    )
}

export default NuevoPassword;