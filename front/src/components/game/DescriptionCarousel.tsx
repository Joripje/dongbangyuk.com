import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface DescriptionCarouselProps {
  images: string[];
}

interface NextArrowProps {
  className?: any;
  style?: any;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const DescriptionCarousel: React.FC<DescriptionCarouselProps> = (images) => {
  console.log(images);

  const NextArrow =
    () =>
    ({ className, style, onClick }: NextArrowProps) => {
      return (
        <div
          className={className}
          style={{ ...style, display: "block", background: "red" }}
          onClick={onClick}
        />
      );
    };

  const settings = {
    arrow: true,
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    // nextArrow: <NextArrow />,
  };

  return (
    <div style={{ height: "90%" }}>
      <Slider {...settings}>
        <div>
          <h3>1</h3>
        </div>
        <div>
          <h3>2</h3>
        </div>
        <div>
          <h3>3</h3>
        </div>
        <div>
          <h3>4</h3>
        </div>
        <div>
          <h3>5</h3>
        </div>
        <div>
          <h3>6</h3>
        </div>
      </Slider>
    </div>
  );
};

export default DescriptionCarousel;
