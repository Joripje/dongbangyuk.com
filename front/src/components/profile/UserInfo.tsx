import React from "react";
import styled from "styled-components";
import { Box } from "@mui/system";

import { auth } from "service";

function UserInfo() {
  return <Box1>{auth.currentUser?.email}</Box1>;
}

const Box1 = styled(Box)({
  marginTop: "10rem",
  marginLeft: "12rem",
  backgroundColor: "#DEF5E5",
  width: "80vw",
  height: "30vh",
  borderRadius: "1rem",
});

export default UserInfo;
