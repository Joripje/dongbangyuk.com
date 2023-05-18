import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { Box, Button } from "@mui/material";

function Loading() {
  return (
    <WrapBox>
      <h1>4초후 다음 라운드가 시작됩니다.</h1>
    </WrapBox>
  );
}

const WrapBox = styled(Box)({
  textAlign: "center",
  marginTop: "20vh",
});

export default Loading;
