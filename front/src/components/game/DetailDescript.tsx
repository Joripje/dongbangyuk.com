import styled from "styled-components";
import { useEffect } from "react";

type DetailDescriptProps = {
  weight: number;
  title: string;
  descriptions: string[];
  selectedTypo: number;
  setSelectedTypo: (props: number) => void;
};

type NormalTypoProps = {
  id: number;
  key: number;
  selectedTypo: number;
  children: (string | number)[];
  onClick: (event: MouseEvent) => void;
};

function DetailDescript(props: DetailDescriptProps) {
  const { weight, title, descriptions, selectedTypo, setSelectedTypo } = props;

  const onTypoClickHandler = (event: MouseEvent) => {
    const tempValue: number = parseInt((event.target as HTMLElement)?.id);
    if (tempValue !== undefined) setSelectedTypo(tempValue);
  };

  useEffect(() => {}, [selectedTypo]);

  return (
    <MethodDescription>
      <HighlightTypo>{title}</HighlightTypo>
      {descriptions.map((item, index) => {
        return (
          <NormalTypo
            id={index + weight}
            key={index}
            selectedTypo={selectedTypo}
            onClick={onTypoClickHandler}
          >
            {title === "과제 목표" ? "" : `${index + 1}.`} {item}
          </NormalTypo>
        );
      })}
    </MethodDescription>
  );
}

export default DetailDescript;

const MethodDescription = styled.div({
  background: "white",
  margin: "1rem 0",
  borderRadius: 20,
  padding: "1rem",
});

const StyleForTypo = {
  display: "flex",
  alignItems: "center",

  width: "100%",

  fontSize: "1.2rem",
  fontWeight: "800",
};

const HighlightTypo = styled.div({
  ...StyleForTypo,
  height: "3rem",
});

const NormalTypo: React.ComponentType<NormalTypoProps> =
  styled.div<NormalTypoProps>((props: NormalTypoProps) => ({
    ...StyleForTypo,
    color: props.id === props.selectedTypo ? "#97E3E1" : "#aaaaaa",
    margin: "2rem 0",
    padding: "1rem 5px",
    borderRadius: 20,

    cursor: "pointer",

    "&:hover": {
      color: props.id === props.selectedTypo ? "#97E3E1" : "#000000",
      background: "#eeeeee",
    },
  }));
