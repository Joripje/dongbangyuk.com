import React, { Component, RefObject } from "react";
import Slider, { Settings } from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Button } from "@mui/material";
import styled from "@emotion/styled";

interface DescriptionCarouselProps {
  images: string[];
}

export default class PreviousNextMethods extends Component<DescriptionCarouselProps> {
  sliderRef: RefObject<Slider>;

  constructor(props: DescriptionCarouselProps) {
    super(props);
    this.sliderRef = React.createRef<Slider>();
    this.next = this.next.bind(this);
  }

  next() {
    if (this.sliderRef.current) {
      console.log(this.sliderRef.current.innerSlider);
      this.sliderRef.current.slickNext();
    }
  }

  handleBeforChange(index: number, imgaesLength: number) {
    console.log(index);
    console.log(imgaesLength);
    if (index === imgaesLength) console.log("WOW");
  }

  render() {
    const images = this.props.images;
    const settings: Settings = {
      dots: true,
      arrows: false,
      infinite: false,
      speed: 500,
      draggable: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      beforeChange: this.handleBeforChange,
    };

    return (
      <CaruoselWrapper>
        <Slider ref={this.sliderRef} {...settings}>
          {images.map((image, index) => {
            return <CaroueseImg src={image} key={index} alt={"토끼스"} />;
          })}
        </Slider>
        <WordDesButton variant='contained'>용어 설명</WordDesButton>
        <NextButton variant='contained' onClick={this.next}>
          Next
        </NextButton>
      </CaruoselWrapper>
    );
  }
}

const CaruoselWrapper = styled.div({
  position: "relative",
  width: "90%",
  height: "80%",
});

const NextButton = styled(Button)({ position: "absolute", right: 0 });
const WordDesButton = styled(Button)({
  position: "absolute",
  left: 0,
  background: "gray",
});

const CaroueseImg = styled.img({ width: "auto", height: "100%" });
