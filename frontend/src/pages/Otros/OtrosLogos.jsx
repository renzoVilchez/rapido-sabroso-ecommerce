import logo1 from '../../assets/images/logos/logo-original.png';
import logo2 from '../../assets/images/logos/fondo-color.png';
import logo3 from '../../assets/images/logos/fondo-negro.png';
import logo4 from '../../assets/images/logos/fondo-invertido.png';
import logo5 from '../../assets/images/logos/mockup-1.png';
import logo6 from '../../assets/images/logos/mockup-2.png';
import logo7 from '../../assets/images/logos/mockup-3.png';

function OtrosLogos() {
  const logos = [
    { id: 1, src: logo1, alt: 'Logo Original' },
    { id: 2, src: logo2, alt: 'Logo Fondo Color' },
    { id: 3, src: logo3, alt: 'Logo Fondo Negro' },
    { id: 4, src: logo4, alt: 'Logo Fondo Invertido' },
    { id: 5, src: logo5, alt: 'Mockup 1' },
    { id: 6, src: logo6, alt: 'Mockup 2' },
    { id: 7, src: logo7, alt: 'Mockup 3' },
  ];

  return (
    <section className="min-h-screen bg-[#FFF3E0] py-10 px-4">
      <h2 className="text-3xl font-bold text-center text-[#212121] mb-8">Nuestros Logos</h2>
      <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {logos.map((logo) => (
          <div
            key={logo.id}
            className="bg-white rounded-xl shadow-md flex items-center justify-center p-4 hover:scale-105 transition-transform duration-300"
          >
            <img
              src={logo.src}
              alt={logo.alt}
              className="max-h-40 object-contain"
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default OtrosLogos;