import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Autoplay } from 'swiper/modules';

const banners = [
  { id: 1, src: 'https://picsum.photos/1200/400?random=1', alt: 'Banner 1' },
  { id: 2, src: 'https://picsum.photos/1200/400?random=2', alt: 'Banner 2' },
  { id: 3, src: 'https://picsum.photos/1200/400?random=3', alt: 'Banner 3' },
];

function BannerCarousel() {
  return (
    <Swiper
      modules={[Autoplay]}
      autoplay={{ delay: 3000 }}
      loop={true}
    >
      {banners.map(banner => (
        <SwiperSlide key={banner.id}>
          <img
            src={banner.src}
            alt={banner.alt}
            className="w-full h-[400px] object-cover"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default BannerCarousel;