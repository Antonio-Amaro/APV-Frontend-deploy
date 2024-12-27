import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Header = () => {

    const { cerrarSesion } = useAuth();

    return (
        <header className="py-10 bg-indigo-600">
            <div className="container mx-auto lg:px-10 flex flex-col lg:flex-row justify-between items-center">
                <h1 className="font-bold text-2xl text-indigo-200 text-center">Administrador de Pacientes de <span className="text-white">Veterinaria</span></h1>

                <nav className="flex flex-col lg:flex-row mt-5 lg:mt-0 gap-4 text-center">
                    <Link to="/admin" className="text-white font-semibold text-xl border-b-2 border-transparent hover:border-b-2 hover:border-b-indigo-200 hover:transition-all">Pacientes</Link>
                    <Link to="/admin/perfil" className="text-white font-semibold text-xl border-b-2 border-transparent hover:border-b-2 hover:border-b-indigo-200 hover:transition-all">Perfil</Link>

                    <button
                        type="button"
                        className="text-white text-xl font-semibold border-b-2 border-transparent hover:border-b-2 hover:border-b-indigo-200 hover:transition-all"
                        onClick={cerrarSesion}
                    >
                        Cerrar Sesión
                    </button>
                </nav>
            </div>
        </header>
    )
}

export default Header