import { useState } from "react";

import styled from "styled-components";
import Modal from "@mui/material/Modal";
import UnseControl from "./UnseControl";

type Luckyday = {
  description: string;
  dates: Array<string>;
};

function Unse() {
  const [luckyday, setLuckyday] = useState<Luckyday[]>([]);
  const [todayluck, setTodayluck] = useState({ data: "" });
  const [arridx, setArridx] = useState<number | null>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const modalHandler = (idx: number) => {
    setArridx(idx);
    setOpenModal(true);
  };

  // 버튼 컴포넌트
  const Luckyday = ({ index }: { index: number }) => (
    <LuckyDayBox>
      <h1>{`${luckyday[index].description}`}</h1>
      {/* <h2>{`${luckyday[index].dates}일`}</h2> */}
      <LottoWrap>
        {luckyday[index].dates.map((day, index) => (
          <LottoBall key={index}>{day}</LottoBall>
        ))}
      </LottoWrap>
    </LuckyDayBox>
  );

  return (
    <WrapBox>
      <TitleTypo>오늘의 운세</TitleTypo>
      <UnseControl setLuckyday={setLuckyday} setTodayluck={setTodayluck} />
      <ContentTypo>{todayluck.data}</ContentTypo>
      <TitleTypo>2023 계묘년 5월의 길일</TitleTypo>
      <LuckWrapper>
        {luckyday.map((info: any, idx: number) => (
          <ModalHandleButton onClick={() => modalHandler(idx)} key={idx}>
            {info.description}
          </ModalHandleButton>
        ))}
      </LuckWrapper>
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <ModalBox>{arridx !== null && <Luckyday index={arridx} />}</ModalBox>
      </Modal>
    </WrapBox>
  );
}

const WrapBox = styled.div`
  display: flex;
  flex-direction: column;
  background-color: rgb(222, 245, 229);
  width: 34vw;
  height: 62vh;
  border-radius: 1rem;
  margin-left: 2rem;
  padding: 1rem;
  overflow-y: auto;

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
`;

const ContentTypo = styled.p`
  font-size: 1.2rem;
  text-align: justify;
  padding: 1rem;
`;

const LuckWrapper = styled.div({
  display: "flex",
  justifyContent: "center",
  flexWrap: "wrap",
  gap: "1rem",
});

const ModalHandleButton = styled.button({
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

const LuckyDayBox = styled.div({
  textAlign: "center",
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

export default Unse;
