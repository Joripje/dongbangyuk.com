import styled from "styled-components";

const TurnHistory = () => {
  return (
    <>
      <HistoryBox />
    </>
  );
};

const HistoryBox = styled.div({
  height: "calc(60% - 1.5rem)",
  background: "rgba(0, 0, 0, 0.05)",
  border: "0.5rem solid rgba(0, 0, 0, 0.2)",
  borderRadius: "2rem",
});

export default TurnHistory;
