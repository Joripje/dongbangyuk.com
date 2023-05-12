import styled from "styled-components";

interface CircleProps {
  gameCounts: { [key: string]: number };
  TypeChangeHandler: (gameType: string) => void;
}

const StatisticsListCircles = (props: CircleProps) => {
  return (
    <>
      <MainContainer>
        <MenuContainer>
          <Circle
            color={"#FFB4B4"}
            onClick={() => props.TypeChangeHandler("all")}
          >
            <ContainerBox>
              <NumberContainer>{props.gameCounts.total}</NumberContainer>
              <CountContainer>회</CountContainer>
            </ContainerBox>
          </Circle>
          <TextContainer>전체 결과 보기</TextContainer>
        </MenuContainer>

        <MenuContainer>
          <Circle
            color={"#5978E850"}
            onClick={() => props.TypeChangeHandler("rps")}
          >
            <ContainerBox>
              <NumberContainer>{props.gameCounts.rps}</NumberContainer>
              <CountContainer>회</CountContainer>
            </ContainerBox>
          </Circle>
          <TextContainer>가위바위보</TextContainer>
        </MenuContainer>

        <MenuContainer>
          <Circle
            color={"#5978E850"}
            onClick={() => props.TypeChangeHandler("cat")}
          >
            <ContainerBox>
              <NumberContainer>{props.gameCounts.cat}</NumberContainer>
              <CountContainer>회</CountContainer>
            </ContainerBox>
          </Circle>
          <TextContainer>고양이 술래잡기</TextContainer>
        </MenuContainer>

        <MenuContainer>
          <Circle
            color={"#5978E850"}
            onClick={() => props.TypeChangeHandler("road")}
          >
            <ContainerBox>
              <NumberContainer>{props.gameCounts.road}</NumberContainer>
              <CountContainer>회</CountContainer>
            </ContainerBox>
          </Circle>
          <TextContainer>길 만들기</TextContainer>
        </MenuContainer>

        <MenuContainer>
          <Circle
            color={"#5978E850"}
            onClick={() => props.TypeChangeHandler("rotate")}
          >
            <ContainerBox>
              <NumberContainer>{props.gameCounts.rotate}</NumberContainer>
              <CountContainer>회</CountContainer>
            </ContainerBox>
          </Circle>
          <TextContainer>도형 회전하기</TextContainer>
        </MenuContainer>
      </MainContainer>
    </>
  );
};

const MainContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const MenuContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin: 2rem;
`;

const TextContainer = styled.div`
  margin: 1rem;
  font-size: 1.2rem;
  font-weight: bold;
`;

const Circle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10vw;
  height: 10vw;
  border-radius: 50%;
  background-color: ${(props) => (props.color ? props.color : "#D9D9D9")};
  font-weight: bold;

  &:hover {
    cursor: pointer;
  }
`;
const ContainerBox = styled.div`
  display: flex;
  align-items: flex-end;
`;

const NumberContainer = styled.div`
  font-size: 4rem;
  font-weight: bold;
`;

const CountContainer = styled.div`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;
export default StatisticsListCircles;
