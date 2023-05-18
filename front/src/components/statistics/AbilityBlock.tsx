import styled from "styled-components";

type AbilityBlockProps = {
  abilityName: string;
  level: number;
  color: string;
};

const AbilityBlock = ({ abilityName, level, color }: AbilityBlockProps) => {
  const rectangles = Array.from({ length: 5 }, (_, index) => (
    <Rectangle color={index < level ? color : "#D9D9D9"} key={index} />
  ));

  return (
    <AbilityContainer>
      <AbilityName>{abilityName}</AbilityName>
      {rectangles}
    </AbilityContainer>
  );
};

const AbilityName = styled.div`
  width: 6rem;
  text-align: center;
  font-weight: bold;
`;

const AbilityContainer = styled.div`
  position: relative;
  margin: 1rem auto;
  display: flex;
  flex-direction: row;
  // text-align: center;
  align-items: center;
`;

type RectangleProps = {
  color?: string;
};

const Rectangle = styled.div<RectangleProps>`
  width: 3.5rem;
  height: 2rem;
  margin: 0 0.15rem;
  border-radius: 20px;
  background-color: ${(props) => (props.color ? props.color : "#D9D9D9")};
`;
export default AbilityBlock;
