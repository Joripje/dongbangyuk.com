import styled from "@emotion/styled";

function ComponentTest() {
  return <TempBox></TempBox>;
}

const TempBox = styled.div({
  width: "27rem",
  height: "80vh",
  background: "gray",

  padding: "1rem",
  border: "solid 1px black",
});

export default ComponentTest;
