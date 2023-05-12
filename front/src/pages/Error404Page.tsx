import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import styled from "styled-components";

// import { Box } from "@mui/material";

function Error404Page() {
  const navigate = useNavigate();

  // 이제 강제로 가셔야합니다 오홍홍
  useEffect(() => {
    const onClickHandler = () => {
      navigate("/test");
    };
    alert("시험이나 치러갑시다.");
    onClickHandler();
  }, [navigate]);

  return (
    <React.Fragment>
      <div>hello, here is your 404</div>
      {/* <button onClick={onClickHandler}>차린건 없지만 여긴 어떠신가요?</button> */}
    </React.Fragment>
  );
}

// const WrapBox = styled(Box)({
//   textAlign: "center",
//   marginTop: "20vh",
// });

export default Error404Page;
