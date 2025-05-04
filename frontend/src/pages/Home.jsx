import BannerCarousel from '../components/BannerCarousel';
import HomeInfo from '../components/HomeInfo';
import TipoCategoriasCarousel from "../components/TipoCategoriasCarousel";
import musicaCriolla from "../assets/audio/nada soy.mp3";

function Home() {
  return (
    <>
      <h1 className="text-4xl font-bold text-yellow-500 md:text-5xl text-shadow-lg/30 text-center my-4">
        Bienvenido a Rápido y Sabroso
      </h1>
      
      <audio src={musicaCriolla} autoPlay loop hidden />

      <BannerCarousel />
      <HomeInfo />
      <TipoCategoriasCarousel />
    </>
  );
}

export default Home;