import GoogleMapIframe from '../components/GoogleMapIframe';
import tarjetaAtras from '../assets/images/tarjetaHorizontalAtras.png';
import tarjetaAdelante from '../assets/images/tarjetaHorizontalAdelante.png';
import tarjetaVertical from '../assets/images/tarjetaVertical.jpg';
import RotatingCard from '../components/RotatingCard';
import AnthonyImage from '../assets/images/Anthony.jpg';
import KatterynImage from '../assets/images/Katteryn.jpg';
import RichardImage from '../assets/images/Richard.jpg';
import RenzoImage from '../assets/images/Renzo.jpg';

const cards = [
    {
        image: RenzoImage,
        title: 'Renzo Vilchez',
        role: 'Administrador del Proyecto',
        birthPlace: 'El Porvenir, Trujillo',
        birthDate: '29/06/2005',
        studyCenter: 'Instituto Educativo Superior Tecnologico Publico "Trujillo"',
        technologies: {
            graphicDesign: ['Adobe Illustrator'],
            videoEditing: ['Capcut'],
            webDevelopment: ['HTML', 'CSS', 'JavaScript', 'React', 'Tailwind', 'Bootstrap', 'Node.js'],
        },
    },
    {
        image: AnthonyImage,
        title: 'Anthony Herrera',
        role: 'Programador del Proyecto',
        birthPlace: 'Trujillo, Trujillo',
        birthDate: '01/11/1999',
        studyCenter: 'Instituto Educativo Superior Tecnologico Publico "Trujillo"',
        technologies: {
            graphicDesign: ['Corel Draw', 'Adobe Illustrator', 'PhotoShop'],
            videoEditing: ['Capcut'],
            webDevelopment: ['HTML', 'CSS', 'JavaScript', 'PHP', 'Bootstrap'],
        },
    },
    {
        image: KatterynImage,
        title: 'Katteryn Pomaina',
        role: 'Diseñadora del Proyecto',
        birthPlace: 'La Esperanza, Trujillo',
        birthDate: '14/05/2006',
        studyCenter: 'Instituto Educativo Superior Tecnologico Publico "Trujillo"',
        technologies: {
            graphicDesign: ['Corel DRAW', 'Adobe Illustrator', 'Adobe Photoshop'],
            videoEditing: ['Capcut'],
            webDevelopment: ['HTML', 'CSS', 'React', 'PHP', 'Bootstrap'],
        },
    },
    {
        image: RichardImage,
        title: 'Richard Terrones',
        role: 'Tester del Proyecto',
        birthPlace: 'Trujillo, Trujillo',
        birthDate: '13/10/2002',
        studyCenter: 'Instituto Educativo Superior Tecnologico Publico "Trujillo"',
        technologies: {
            graphicDesign: ['Adobe Illustrator'],
            videoEditing: ['Capcut'],
            webDevelopment: ['HTML', 'CSS', 'JavaScript'],
        },
    },
];

function Contacto() {
    return (
        <>
            {/* Tarjetas del equipo */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-16">
                {cards.map((card, index) => (
                    <RotatingCard
                        key={index}
                        image={card.image}
                        title={card.title}
                        role={card.role}
                        birthPlace={card.birthPlace}
                        birthDate={card.birthDate}
                        studyCenter={card.studyCenter}
                        technologies={card.technologies}
                    />
                ))}
            </div>
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