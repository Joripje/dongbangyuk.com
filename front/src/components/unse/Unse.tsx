import React, { useState, useEffect } from "react";

import styled, { keyframes } from "styled-components";

import { postToday, postLuckyday } from "api/unse";

import Modal from "@mui/material/Modal";

function Unse() {
  const [luckyday, setLuckyday] = useState<any>([]);
  const [todayluck, setTodayluck] = useState<any>([]);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [gender, setGender] = useState("");
  const [today] = useState(new Date().toISOString().slice(0, 10));
  const [arridx, setArridx] = useState<number | null>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);
  // 생년월일, 오늘날짜, 성별

  const handleDateChange = (e: any) => {
    setSelectedDate(e.target.value);
  };

  const handleGender = (e: any) => {
    setGender(e.target.value);
  };

  const handleLuck = (e: any) => {
    e.preventDefault();
    // console.log(e.target.elements);
    const MF = gender;
    const birth = selectedDate.replace(/-/g, "");
    const target = today.replace(/-/g, "");
    const fetchData = async () => {
      try {
        const response = await postLuckyday({
          birth: birth,
          target: target,
          gender: MF,
        });
        const response2 = await postToday({
          birth: birth,
          target: target,
          gender: MF,
        });
        setLuckyday(response.lucky_dates);
        setTodayluck(response2);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  };

  const handleIdx = (idx: number) => {
    setArridx(idx);
    setOpenModal(true);
  };

  // 버튼 컴포넌트
  const Luckyday = ({ index }: { index: number }) => (
    <Box5>
      <h1>{`${luckyday[index].description}`}</h1>
      {/* <h2>{`${luckyday[index].dates}일`}</h2> */}
      <LottoWrap>
        {luckyday[index].dates.map((day: number, idx: any) => (
          <LottoBall key={idx}>{day}</LottoBall>
        ))}
      </LottoWrap>
    </Box5>
  );
  return (
    <div style={{display: 'flex'}}>
    <WrapBox>
      <Box1>
        <TitleTypo>오늘의 운세</TitleTypo>
      </Box1>
      <Box3>
        <form onSubmit={handleLuck}>
          <div style={{display: "flex", justifyContent: "space-around"}}>
          <FieldBox id="submit">
            <Box2>
              <label htmlFor="birth">생일</label>
              <DatePick
                type="date"
                id="birth"
                name="birth"
                min="1960-01-01"
                max="2023-12-31"
                value={selectedDate}
                onChange={handleDateChange}
              />
            </Box2>
            <Box2>
              <label>성별</label>
              <Radio
                onClick={handleGender}
                name="gender"
                type="radio"
                value="M"
              />
              <label>남자</label>
              <Radio
                onClick={handleGender}
                name="gender"
                type="radio"
                value="F"
              />
              <label>여자</label>
            </Box2>
          </FieldBox>
          <Button1 type="submit">제출</Button1>
          </div>
        </form>
      </Box3>
      <Box4>
        <ContentTypo>{todayluck.data}</ContentTypo>
      </Box4>
      <div>
        <Box1>
          <TitleTypo>2023 계묘년 5월의 길일</TitleTypo>
        </Box1>
        <Wrap1>
          {luckyday.map((info: any, idx: number) => (
            <Button3 onClick={() => handleIdx(idx)} key={idx}>
              {info.description}
            </Button3>
          ))}
        </Wrap1>
      </div>
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <ModalBox>{arridx !== null && <Luckyday index={arridx} />}</ModalBox>
      </Modal>
    </WrapBox>
    </div>
  );
}

const Box5 = styled.div({
  textAlign: "center",
});

const Button3 = styled.button({
  width: "10vw",
  fontSize: "1.5rem",
  marginTop: "1rem",
  borderRadius: "1rem",
  backgroundColor: "white",
  // height: "30%",
  cursor: "pointer",
  transition: "all 0.8s, color 0.3",
  "&:hover": {
    color: "#fff",
    boxShadow:
      "inset 50vw 0 0 0 rgba(0,0,0,0.25), inset -50vw 0 0 0 rgba(0,0,0,0.25)",
  },
  fontWeight: 700,
});

const LottoBall = styled.div({
  backgroundColor: "white",
  border: "solid",
  borderRadius: "50%",
  width: "2.5vw",
  display: "flex",
  justifyContent: "center",
  color: "#B799FF",
  // animation: `${fadeIn} 0.5s ease-in-out forwards`,
});

const LottoWrap = styled.div({
  display: "flex",
  // justifyContent: "space-between",
  gap: "2rem",
  marginLeft: "3rem",
  fontSize: "2rem",
  marginTop: "3rem",
  flexWrap: "wrap",
});

const ModalBox = styled.div({
  position: "absolute",
  top: "40vh",
  left: "40vw",
  width: "30vw",
  height: "25vh",
  backgroundColor: "white",
  borderRadius: "1rem",
  padding: "1rem",
  border: "solid",
  overflow: "scroll",
});

const Wrap1 = styled.div({
  display: "flex",
  justifyContent: "center",
  flexWrap: "wrap",
  gap: "1rem",
});

const Box1 = styled.div({
  // textAlign: "center",
  // background: "linear-gradient(#292931, #FF0000)",
  // backgroundClip: "text",
  // WebkitBackgroundClip: "text",
  // color: "transparent",
});

const Box2 = styled.div({
  fontSize: "2rem",
});

const Box3 = styled.div({
  // border: "dashed",
  padding: "1rem",
  borderRadius: "1rem",
  // borderColor: "#A0D8B3",
  backgroundColor: "white",
  margin: "1rem",
});

const Box4 = styled.div({
  // textAlign: "center",
  // background: "linear-gradient(#D21312, #FEA1A1)",
  // backgroundClip: "text",
  // WebkitBackgroundClip: "text",
  // color: "transparent",
  // fontFamily: " system-ui",
  padding: "1rem",
  fontSize: "1.5rem",
});

const Button1 = styled.button({
  width: "5vw",
  fontSize: "1.5rem",
  marginTop: "1rem",
  borderRadius: "1rem",
  backgroundColor: "white",
  cursor: "pointer",
});

const FieldBox = styled.div({
  // backgroundColor: "#FEA1A1",
  // border: "solid",
  // borderColor: "#B799FF",
  borderRadius: "1rem",
  padding: ".5rem",
});

const DatePick = styled.input.attrs({ type: "date" })({
  width: "10vw",
  height: "4vh",
  fontSize: "1.5rem",
  marginLeft: "1rem",
  borderRadius: "1rem",
  cursor: "pointer",
});

const Radio = styled.input.attrs({ type: "radio" })({
  height: "1.5rem",
  width: "1.5rem",
  marginLeft: "1.5rem",
  cursor: "pointer",
});

// const WrapBox = styled.div({
//   width: "35vw",
//   // backgroundColor: "grey",
//   height: "62vh",
//   borderRadius: "1rem",
//   marginLeft: "2rem",
//   overflowY: "scroll",
// });

const WrapBox = styled.div`
  background-color: rgb(222, 245, 229);
  width: 34vw;
  height: 62vh;
  border-radius: 1rem;
  margin-left: 2rem;
  padding: 1rem;
  overflow-y: scroll;

  /* Customize the scrollbar */
  ::-webkit-scrollbar {
    width: 8px; /* Width of the vertical scrollbar */
  }

  ::-webkit-scrollbar-track {
    background-color: #f1f1f1; /* Color of the scrollbar track */
  }

  ::-webkit-scrollbar-thumb {
    background-color: #888; /* Color of the scrollbar thumb */
    border-radius: 1rem;
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: #555; /* Color of the scrollbar thumb on hover */
  }
`;



const TitleTypo = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
`

const ContentTypo = styled.p`
  font-size: 1.2rem;
  text-align: justify;
`

export default Unse;
