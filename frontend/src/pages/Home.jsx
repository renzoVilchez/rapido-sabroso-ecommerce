import BannerCarousel from '../components/BannerCarousel';
import MenuInfo from '../components/MenuInfo';
import TipoCarousel from '../components/TipoCarousel';
import ToppingsCarousel from '../components/ToppingsCarousel';

function Home() {
  return (
    <>
      <BannerCarousel />
      <MenuInfo />
      <TipoCarousel />
      <ToppingsCarousel />
    </>
  );
}

export default Home;