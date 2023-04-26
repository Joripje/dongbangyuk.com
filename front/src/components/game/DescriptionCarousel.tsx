import React, { useRef, useState } from "react";
import Slider, { Settings } from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Button } from "@mui/material";
import styled from "@emotion/styled";

interface DescriptionCarouselProps {
  images: string[];
}

const DescriptionCarousel = (props: DescriptionCarouselProps) => {
  const { images } = props;
  const sliderRef = useRef<Slider>(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);

  const next = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  const handleBeforChange = (index: number, imagesLength: number) => {
    if (index === imagesLength) console.log("WOW");
  };

  const settings: Settings = {
    dots: true,
    arrows: false,
    infinite: false,
    speed: 500,
    draggable: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: handleBeforChange,
    afterChange: setCurrentSlideIndex,
  };

  return (
    <CarouselWrapper>
      <Slider ref={sliderRef} {...settings}>
        {images.map((image, index) => {
          return <CarouselImg src={image} key={index} alt={"토끼스"} />;
        })}
      </Slider>
      <WordDesButton variant='contained'>용어 설명</WordDesButton>
      <NextButton variant='contained' onClick={next}>
        Next
      </NextButton>
      <p>Current slide index: {currentSlideIndex}</p>
    </CarouselWrapper>
  );
};

const CarouselWrapper = styled.div({
  position: "relative",
  width: "90%",
  margin: "0 5% ",
});

const NextButton = styled(Button)({ position: "absolute", right: 0 });
const WordDesButton = styled(Button)({
  position: "absolute",
  left: 0,
  background: "gray",
});

const CarouselImg = styled.img({ width: "auto", height: "100%" });

export default DescriptionCarousel;
