import { useContext } from "react";
import SliderModule from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { PodcastContext } from "../../../context/PodcastContext";
import CarouselCard from "./CarouselCard";
import styles from "./RecommendedCarousel.module.css";

const Slider = SliderModule.default;

/**
 *
 * @returns
 */
export default function RecommendedCarousel() {
  const { allPodcasts } = useContext(PodcastContext);

  const settings = {
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2500,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: true,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  // Random podcasts from the podcast array. slice method used to limit the displayed podcasts to 12
  return (
    <section className={styles.carousel}>
      <h2>Recommended Shows</h2>

      <Slider {...settings}>
        {allPodcasts.slice(0, 12).map((podcast) => (
          <CarouselCard key={podcast.id} podcast={podcast} />
        ))}
      </Slider>
    </section>
  );
}
