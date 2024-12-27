import { useState, useEffect } from "react";
import Alerta from "./Alerta";
import usePacientes from "../hooks/usePacientes";

const Formulario = () => {

    const [ nombre, setNombre ] = useState('');
    const [ propietario, setPropietario ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ fecha, setFecha ] = useState('');
    const [ sintomas, setSintomas ] = useState('');
    const [id, setId] = useState(null);

    const [ alerta, setAlerta ] = useState({});

    const { guardarPaciente, paciente } = usePacientes();
    
    useEffect(() => {
        if(paciente?.nombre) {
            setNombre(paciente.nombre);
            setPropietario(paciente.propietario);
            setEmail(paciente.email);
            setFecha(new Date(paciente.fecha).toISOString().substring(0, 10));
            setSintomas(paciente.sintomas);
            setId(paciente._id);
            console.log(paciente);
        }
    }, [paciente])

    const handleSubmit = e => {
        e.preventDefault();

        if([nombre, propietario, email, fecha, sintomas].includes('')) {
            setAlerta({msg: 'Todos los campos son obligatorios', error: true})
            
            setTimeout(() => {
                setAlerta({});
            }, 3000);
        }

        const fechaUTC = new Date(fecha);
        fechaUTC.setMinutes(fechaUTC.getMinutes() + fechaUTC.getTimezoneOffset());

        guardarPaciente({nombre, propietario, email, fecha: fechaUTC.toISOString(), sintomas, id});
        setAlerta({ msg: "Guardado correctamente"});

        setNombre('');
        setPropietario('');
        setEmail('');
        setFecha('');
        setSintomas('');
        setId('');

        setTimeout(() => {
            setAlerta({});
        }, 3000);
    }

    const { msg } = alerta;

    return (
        <>
            <h2 className="font-black text-3xl text-center">Administrador de Pacientes</h2>
            <p className="text-lg text-center mt-5 mb-10">
                Agrega tus pacientes y <span className="text-indigo-600 font-bold">Adminístralos</span>
            </p>
            <form 
                className="bg-white py-10 px-5 mb-10 md:mb-0 shadow-md rounded-md"
                onSubmit={handleSubmit}    
            >
                <div className="mb-5">
                    <label 
                        htmlFor="nombre"
                        className="text-gray-700 font-bold"
                    >
                        Nombre Mascota
                    </label>
                    <input 
                        id="nombre"
                        type="text" 
                        placeholder="Nombre de la mascota"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <label 
                        htmlFor="propietario"
                        className="text-gray-700 font-bold"
                    >
                        Nombre Propietario
                    </label>
                    <input 
                        id="propietario"
                        type="text" 
                        placeholder="Nombre del propietario"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={propietario}
                        onChange={e => setPropietario(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <label 
                        htmlFor="email"
                        className="text-gray-700 font-bold"
                    >
                        Email
                    </label>
                    <input 
                        id="email"
                        type="text" 
                        placeholder="Nombre de la email"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <label 
                        htmlFor="fecha"
                        className="text-gray-700 font-bold"
                    >
                        Fecha de Registro
                    </label>
                    <input 
                        id="fecha"
                        type="date"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={fecha}
                        onChange={e => setFecha(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <label 
                        htmlFor="sintomas"
                        className="text-gray-700 font-bold"
                    >
                        Síntomas de la mascota
                    </label>
                    <textarea 
                        id="sintomas"
                        placeholder="Describe los síntomas"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={sintomas}
                        onChange={e => setSintomas(e.target.value)}
                    />
                </div>


                <input 
                    type="submit"
                    value={id ? "Guardar Cambios" : "Agregar Paciente"}
                    className="bg-indigo-600 w-full p-3 text-white font-bold hover:bg-indigo-700 rounded-md cursor-pointer transition-colors" 
                />

                { msg && <Alerta alerta={alerta}/>}
            </form>
        </>
    )
}

export default Formulario