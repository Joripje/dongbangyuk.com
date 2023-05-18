import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import styled from "styled-components";

// import { Box } from "@mui/material";

function Error404Page() {
  const navigate = useNavigate();

  // 이제 강제로 가셔야합니다 오홍홍
  useEffect(() => {
    const on404kHandler = () => {
      navigate("/main");
    };
    // alert("로그인 완료");
    on404kHandler();
  }, [navigate]);

  return (
    <React.Fragment>
      <div>hello, here is your 404</div>
    </React.Fragment>
  );
}

// const WrapBox = styled(Box)({
//   textAlign: "center",
//   marginTop: "20vh",
// });

export default Error404Page;
