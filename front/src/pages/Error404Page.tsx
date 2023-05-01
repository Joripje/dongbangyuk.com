import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { Box } from "@mui/material";

function Error404Page() {
  const navigate = useNavigate();
  const onClickHandler = () => {
    navigate("/test/prepare/find-road");
  };
  const goRps = () => {
    navigate('/prepare/rpsPage')
  }
  return (
    <React.Fragment>
      <WrapBox>
        <h1>hello, here is your 404</h1>
        <button onClick={onClickHandler}>차린건 없지만 여긴 어떠신가요?</button>
        <p></p>
        <button onClick={goRps}>가위가위노 바위바위노 보노보노</button>
      </WrapBox>
    </React.Fragment>
  );
}

const WrapBox = styled(Box) ({
  textAlign: 'center',
  marginTop: '20vh'
})

export default Error404Page;
