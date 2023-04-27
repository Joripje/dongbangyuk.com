import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Slider, { Settings } from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Button } from "@mui/material";
import styled from "@emotion/styled";

interface DescriptionCarouselProps {
  images: string[];
  selectedTypo: number;
}

const DescriptionCarousel = (props: DescriptionCarouselProps) => {
  const { images, selectedTypo } = props;
  const navigate = useNavigate();
  const sliderRef = useRef<Slider>(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const settings: Settings = {
    dots: true,
    arrows: false,
    infinite: false,
    speed: 500,
    draggable: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: setCurrentSlideIndex,
  };

  const prev = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  const next = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  useEffect(() => {
    const goTo = (target: number) => {
      if (sliderRef.current !== null) {
        sliderRef.current.slickGoTo(target, false);
      }
    };
    goTo(selectedTypo);
  }, [selectedTypo]);

  return (
    <CarouselWrapper>
      <Slider ref={sliderRef} {...settings}>
        {images.map((image, index) => {
          return <CarouselImg src={image} key={index} alt={"토끼스"} />;
        })}
      </Slider>
      <WordDesButton variant='contained' onClick={prev}>
        {currentSlideIndex === 0 ? "용어 설명" : "이전"}
      </WordDesButton>
      {currentSlideIndex === images.length - 1 ? (
        <ControlButton
          variant='contained'
          onClick={() => navigate("/test/find-road")}
        >
          검사 시작
        </ControlButton>
      ) : (
        <ControlButton variant='contained' onClick={next}>
          {currentSlideIndex === 0 ? "설명 시작" : "다음"}
        </ControlButton>
      )}
    </CarouselWrapper>
  );
};

const CarouselWrapper = styled.div({
  position: "relative",
  width: "90%",
  margin: "0 5% ",
});

const ControlButton = styled(Button)({ position: "absolute", right: 0 });
const WordDesButton = styled(Button)({
  position: "absolute",
  left: 0,
  background: "gray",
});

const CarouselImg = styled.img({ width: "auto", height: "100%" });

export default DescriptionCarousel;
