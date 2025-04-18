import GoogleMapIframe from '../components/GoogleMapIframe';
import tarjetaAtras from '../assets/images/tarjetaHorizontalAtras.png';
import tarjetaAdelante from '../assets/images/tarjetaHorizontalAdelante.png';
import tarjetaVertical from '../assets/images/tarjetaVertical.jpg';

function Contacto() {
    return (
        <>
            <div>
                <h2 className="text-2xl font-bold mb-4 text-center">Tarjetas de Presentación</h2>
                <div className="flex justify-center mb-4">
                    <img src={tarjetaAtras} alt="tarjeta horizontal parte de adelante" />
                </div>
                <div className="flex justify-center mb-4">
                    <img src={tarjetaAdelante} alt="tarjeta horizontal parte de atras" />
                </div>
                <div className="flex justify-center mb-4">
                    <img src={tarjetaVertical} alt="tarjeta vertical" />
                </div>
            </div>
            <div>
                <h2 className="text-2xl font-bold mb-4 text-center">Estamos aquí:</h2>
                <div className="mt-4 max-w-[1000px] mx-auto">
                    <GoogleMapIframe />
                </div>
            </div>
        </>
    );
}

export default Contacto;