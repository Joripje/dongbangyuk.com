import { useSelector } from "react-redux";
import { RootState } from "store";

import TurnStatus from "./TurnStatus";

import styled from "styled-components";
import { Grid } from "@mui/material";

const TurnHistory = () => {
  const choices = useSelector(
    (state: RootState) => state.turnFigure.tempAnswer.choices
  );
  const images = useSelector((state: RootState) => state.turnFigure.images);
  return (
    <HistoryBox container>
      <RowFlexBox item xs={8}>
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
      </RowFlexBox>
      <TurnStatus />
    </HistoryBox>
  );
};

const HistoryBox = styled(Grid)({
  height: "calc(60% - 1rem)",
  background: "rgba(0, 0, 0, 0.05)",
  border: "0.5rem solid rgba(0, 0, 0, 0.2)",
  borderRadius: "2rem",
});

const RowFlexBox = styled(Grid)({
  width: "80%",
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-around",
});

const SingleChoice = styled.div({
  position: "relative",
  width: "25%",
  height: "50%",
  textAlign: "center",

  color: "rgba(0, 0, 0, 0.2)",
});

const ChoiceType = styled.div({
  fontSize: "5rem",
  fontWeight: "600",

  position: "absolute",
  left: "50%",
  top: "50%",
  transform: "translate(-50%, -55%)",
});

const ChoiceImg = styled.img({
  width: "80%",

  position: "absolute",
  left: "50%",
  top: "50%",
  transform: "translate(-50%, -50%)",
});

export default TurnHistory;
