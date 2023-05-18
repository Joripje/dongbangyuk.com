import styled from "styled-components";

type ObjectMapProps = {
  randNum: number;
};

const sizeOfBox = 3;

function ObjectMap(props: ObjectMapProps) {
  const { randNum } = props;
  const availableMap = [
    [0, 1, 6, 9, 12, 14, 15],
    [0, 1, 3, 7, 8, 12, 14, 15],
    [0, 1, 3, 5, 6, 8, 11, 13, 15],
    [0, 1, 5, 6, 9, 11, 12, 13, 14],
    [0, 4, 5, 7, 8, 10, 11, 15],
    [1, 5, 6, 7, 9, 11, 12, 15],
    [2, 3, 4, 6, 9, 10, 11, 12, 15],
    [0, 1, 4, 6, 7, 9, 12, 13, 14, 15],
  ];
  const emptyArr = new Array(16).fill(0);
  const target = availableMap[randNum];

  return (
    <ObjectWrapper>
      {emptyArr.map((item, index) => {
        return (
          <ObjectSingleBox
            key={index + item}
            style={{ background: target.includes(index) ? "gray" : "white" }}
          />
        );
      })}
    </ObjectWrapper>
  );
}

const ObjectWrapper = styled.div({
  position: "relative",
  width: `${sizeOfBox * 4}rem `,
  height: `${sizeOfBox * 4}rem `,
  display: "flex",
  flexWrap: "wrap",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  background: "black",
});

const ObjectSingleBox = styled.div({
  width: `calc(25%)`,
  height: `calc(25% )`,
});
// background: ${}

export default ObjectMap;
