import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.jpg';

function Nosotros() {
    return (
        <div className="container max-w-6xl mx-auto my-12 px-4">
            <header className="flex justify-center flex-col items-center mb-12">
                <h1 className="text-4xl font-bold">Nosotros</h1>
                <div className='w-[400px]'>
                    <img src={logo} alt="logo" />
                </div>
                <p className="mt-4 text-lg">Conoce más sobre quiénes somos, nuestra misión, visión, objetivos y valores.</p>
            </header>

            <div className="flex justify-center gap-8">
                <div className="text-center">
                    <Link to="/nosotros/mision" className="text-xl text-blue-600 hover:underline">Misión</Link>
                </div>
                <div className="text-center">
                    <Link to="/nosotros/vision" className="text-xl text-blue-600 hover:underline">Visión</Link>
                </div>
                <div className="text-center">
                    <Link to="/nosotros/objetivos" className="text-xl text-blue-600 hover:underline">Objetivos</Link>
                </div>
                <div className="text-center">
                    <Link to="/nosotros/valores" className="text-xl text-blue-600 hover:underline">Valores</Link>
                </div>
            </div>

            <div className="mt-12">
                <p className="text-lg">En <strong>Rápido y Sabroso</strong>, trabajamos con pasión y compromiso para ofrecerte lo mejor de la comida rápida. Conoce más sobre lo que nos motiva a brindar un excelente servicio.</p>
            </div>
        </div>
    );
}

export default Nosotros;