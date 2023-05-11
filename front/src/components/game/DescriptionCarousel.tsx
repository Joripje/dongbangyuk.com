import { useRef, useState, useEffect } from "react";
import Slider, { Settings } from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Button } from "@mui/material";
import styled from "@emotion/styled";

interface DescriptionCarouselProps {
  images: string[];
  selectedTypo: number;
  setSelectedTypo: (selectedTypo: number) => void;
  setIsPreparing: (isPreparing: boolean) => void;
}

const DescriptionCarousel = (props: DescriptionCarouselProps) => {
  const { images, selectedTypo, setIsPreparing, setSelectedTypo } = props;
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

  useEffect(() => {
    const goTo = (target: number) => {
      if (sliderRef.current) {
        sliderRef.current.slickGoTo(target, false);
      }
    };
    goTo(selectedTypo);
  }, [selectedTypo]);

  // const pageMoveHandler = () => {
  //   if (location.pathname === '/prepare/rpsPage') {
  //     navigate('/rpsPage')
  //   } else if (location.pathname === '/test/prepare/find-road') {
  //     navigate('/test/find-road')
  //   }
  // }

  return (
    <CarouselWrapper>
      <Slider ref={sliderRef} {...settings}>
        {images.map((image, index) => {
          return <CarouselImg src={image} key={index} alt={"토끼스"} />;
        })}
      </Slider>
      <WordDesButton
        variant='contained'
        onClick={() => setSelectedTypo(selectedTypo - 1)}
      >
        {currentSlideIndex === 0 ? "용어 설명" : "이전"}
      </WordDesButton>
      {currentSlideIndex === images.length - 1 ? (
        <ControlButton
          variant='contained'
          onClick={() => setIsPreparing(false)}
        >
          검사 시작
        </ControlButton>
      ) : (
        <ControlButton
          variant='contained'
          onClick={() => setSelectedTypo(selectedTypo + 1)}
        >
          {currentSlideIndex === 0 ? "설명 시작" : "다음"}
        </ControlButton>
      )}
    </CarouselWrapper>
  );
};

const CarouselWrapper = styled.div({
  position: "relative",
  width: "90%",
  maxWidth: "1100px",
  height: "90%",
  margin: "0 5% ",
});

const ControlButton = styled(Button)({
  position: "absolute",
  right: 0,

  width: "8rem",
  height: "3rem",
});

const WordDesButton = styled(Button)({
  position: "absolute",
  left: 0,
  background: "gray",

  width: "8rem",
  height: "3rem",
});

const CarouselImg = styled.img({ width: "3rem", height: "100%" });

export default DescriptionCarousel;
