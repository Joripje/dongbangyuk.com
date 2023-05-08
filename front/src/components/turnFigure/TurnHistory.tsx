import { useSelector } from "react-redux";
import { RootState } from "store";

import styled from "styled-components";

const TurnHistory = () => {
  const choices = useSelector(
    (state: RootState) => state.turnFigure.tempAnswer.choices
  );
  const images = useSelector((state: RootState) => state.turnFigure.images);
  return (
    <HistoryBox>
      {choices.map((choice, index) => {
        return (
          <SingleChoice key={index}>
            {choice === -1 ? (
              <ChoiceType>{index + 1}</ChoiceType>
            ) : (
              <ChoiceImg
                key={index}
                src={images[choice]}
                alt={"역사다 이말이야"}
              />
            )}
          </SingleChoice>
        );
      })}
    </HistoryBox>
  );
};

const HistoryBox = styled.div({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-around",

  height: "calc(60% - 1.5rem)",
  background: "rgba(0, 0, 0, 0.05)",
  border: "0.5rem solid rgba(0, 0, 0, 0.2)",
  borderRadius: "2rem",
});

const SingleChoice = styled.div({
  width: "25%",

  textAlign: "center",
  alignSelf: "center",

  color: "rgba(0, 0, 0, 0.2)",
});

const ChoiceType = styled.div({
  fontSize: "10rem",
  fontWeight: "600",
});

const ChoiceImg = styled.img({
  width: "60%",
});

export default TurnHistory;
