import { Link } from 'react-router-dom';
import RotatingCard from '../../components/RotatingCard';
import AnthonyImage from '../../assets/images/Anthony.jpg';
import KatterynImage from '../../assets/images/Katteryn.jpg';
import RichardImage from '../../assets/images/Richard.jpg';
import RenzoImage from '../../assets/images/Renzo.jpg';

const cards = [
    {
        image: RenzoImage,
        title: 'Renzo Vilchez',
        role: 'Administrador del Proyecto',
        birthPlace: 'El Porvenir, Trujillo',
        birthDate: '29/06/2005',
        studyCenter: 'Instituto Educativo Superior Tecnologico Publico "Trujillo" ',
        technologies: {
            graphicDesign: ['Adobe Illustrator'],
            videoEditing: ['Capcut'],
            webDevelopment: [
                'HTML',
                'CSS',
                'JavaScript',
                'React',
                'Tailwind',
                'Bootstrap',
                'Node.js',
            ]
        }
    },
    {
        image: AnthonyImage,
        title: 'Anthony Herrera',
        role: 'Programador del Proyecto',
        birthPlace: 'Trujillo, Trujillo',
        birthDate: '01/11/1999',
        studyCenter: 'Instituto Educativo Superior Tecnologico Publico "Trujillo" ',
        technologies: {
            graphicDesign: ['Corel Draw', 'Adobe Illustrator', 'PhotoShop',],
            videoEditing: ['Capcut'],
            webDevelopment: [
                'HTML',
                'CSS',
                'JavaScript',
                'PHP',
                'Bootstrap'
            ]
        }
    },
    {
        image: KatterynImage,
        title: 'Katteryn Pomaina',
        role: 'Diseñadora del Proyecto',
        birthPlace: 'La Esperanza, Trujillo',
        birthDate: '14/05/2006',
        studyCenter: 'Instituto Educativo Superior Tecnologico Publico "Trujillo" ',
        technologies: {
            graphicDesign: ['Corel DRAW', 'Adobe Illustrator', 'Adobe Photoshop'],
            videoEditing: ['Capcut'],
            webDevelopment: [
                'HTML',
                'CSS',
                'React',
                'PHP',
                'Bootstrap',
            ]
        }
    },
    {
        image: RichardImage,
        title: 'Richard Terrones',
        role: 'Tester del Proyecto',
        birthPlace: 'Trujillo, Trujillo',
        birthDate: '13/10/2002',
        studyCenter: 'Instituto Educativo Superior Tecnologico Publico "Trujillo" ',
        technologies: {
            graphicDesign: ['Adobe Illustrator'],
            videoEditing: ['Capcut'],
            webDevelopment: [
                'HTML',
                'CSS',
                'JavaScript',
            ]
        }
    },
];

function Nosotros() {
    return (
        <div className="container mx-auto">
            <header className="flex justify-center flex-col items-center mb-2">
                <h2 className="text-3xl font-bold text-black ">Nosotros</h2>
                <p className="mt-4 text-lg">Conoce más sobre quiénes somos, nuestra misión, visión, objetivos y valores.</p>
            </header>

            <div className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
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
            </div>

            <div className="flex justify-center gap-20">
                <div className="text-center">
                    <Link to="/nosotros/mision" className="text-xl text-blue-900 border border-red-500 px-6 py-3 rounded-xl shadow-lg shadow-red-500 hover:bg-red-100">Misión</Link>
                </div>
                <div className="text-center">
                    <Link to="/nosotros/vision" className="text-xl text-blue-900 border border-red-500 px-6 py-3 rounded-xl shadow-lg shadow-red-500 hover:bg-red-100">Visión</Link>
                </div>
                <div className="text-center">
                    <Link to="/nosotros/objetivos" className="text-xl text-blue-900 border border-red-500 px-6 py-3 rounded-xl shadow-lg shadow-red-500 hover:bg-red-100">Objetivos</Link>
                </div>
                <div className="text-center">
                    <Link to="/nosotros/valores" className="text-xl text-blue-900 border border-red-500 px-6 py-3 rounded-xl shadow-lg shadow-red-500 hover:bg-red-100">Valores</Link>
                </div>
            </div>

            <div className="mt-12">
                <p className="text-lg">En <strong>Rápido y Sabroso</strong>, trabajamos con pasión y compromiso para ofrecerte lo mejor de la comida rápida. Conoce más sobre lo que nos motiva a brindar un excelente servicio.</p>
            </div>
        </div>
    );
}

export default Nosotros;