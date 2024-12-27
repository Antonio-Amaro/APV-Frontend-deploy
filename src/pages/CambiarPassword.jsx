import { useState } from "react";
import AdminNav from "../components/AdminNav";
import Alerta from "../components/Alerta";
import useAuth from "../hooks/useAuth";

const CambiarPassword = () => {

    const { guardarPassword } = useAuth()

    const [alerta, setAlerta] = useState({});
    const [password, setPassword] = useState({
        password_actual: '',
        password_nuevo: ''
    });
    
    const handleSubmit = async e => {
        e.preventDefault();

        if(Object.values(password).some(campo => campo === '')) {
            setAlerta({
                msg: "Todos los campos son obligatorios",
                error: true
            })
            setTimeout(() => {
                setAlerta({})
            }, 3000);
            return;
        }

        if(password.password_actual.length < 6) {
            setAlerta({
                msg: "El password debe contener al menos 6 caracteres",
                error: true
            })
            setTimeout(() => {
                setAlerta({})
            }, 3000);
            return;
        }

        const respuesta = await guardarPassword(password);

        setAlerta(respuesta);

        setPassword({
            password_actual: '',
            password_nuevo: ''
        });

        setTimeout(() => {
            setAlerta({});
        }, 3000);
    }

    const { msg } = alerta;

    return (
        <>
            <AdminNav />
            <h2 className="font-black text-3xl text-center mt-10">Cambiar Password</h2>
            <p className="text-xl mt-5 mb-10 text-center">Modifica tu <span className="text-indigo-600 font-bold">Password aquí</span></p>

            <div className="flex justify-center">
            <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">
                <form onSubmit={handleSubmit}>
                    <div className="my-3">
                        <label htmlFor="" className="font-bold text-gray-600">Password Actual</label>
                        <input 
                            type="password"
                            placeholder="Escribe password actual"
                            className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                            name="password_actual"
                            value={password.password_actual}
                            onChange={ e => setPassword({
                                ...password,
                                [e.target.name] : e.target.value
                            })}
                            autoComplete="current-password"
                        />
                    </div>
                    <div className="my-3">
                        <label htmlFor="" className="font-bold text-gray-600">Nuevo Password</label>
                        <input 
                            type="password"
                            placeholder="Escribe tu nuevo password"
                            className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                            name="password_nuevo"
                            value={password.password_nuevo}
                            onChange={ e => setPassword({
                                ...password,
                                [e.target.name] : e.target.value
                            })}
                            autoComplete="new-password"
                        />
                    </div>
                    

                    <input 
                        type="submit"
                        value="Actualizar password"
                        className="bg-indigo-700 px-10 py-3 font-bold text-white rounded-lg w-full mt-5 cursor-pointer" 
                    />
                </form>
                { msg && <Alerta alerta={alerta} />}
            </div>
        </div>
            
        </>
    )
}

export default CambiarPassword