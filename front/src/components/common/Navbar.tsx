import React from "react";
import styled from "styled-components";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Container,
  Button,
} from "@mui/material";
import { LOGO } from "assets/images";

import { useNavigate } from "react-router-dom";
import { auth } from "service";

function Navbar() {
  const pages = ["역검센터", "결과보기", "힐링센터", "마이프로필"];
  const navigate = useNavigate();
  // console.log(auth.currentUser);
  const handleClick = (page: string, e: any) => {
    if (page === "역검센터") {
      navigate("/test/prepare");
    } else if (page === "마이프로필") {
      navigate("/profile");
    } else if (page === "결과보기") {
      navigate("/statistics");
    } else return;
  };
  const goMainPage = () => {
    navigate("/main");
  };
  return (
    <Nav>
      <Container sx={{ marginLeft: "1rem", marginRight: "1rem" }}>
        <Toolbar disableGutters>
          <Typo1 onClick={goMainPage} variant="h5" noWrap>
            동방역검
          </Typo1>
          <Box1>
            {pages.map((page) => (
              <Button1
                onClick={(e) => {
                  handleClick(page, e);
                }}
                key={page}
              >
                {page}
              </Button1>
            ))}
          </Box1>
        </Toolbar>
      </Container>
    </Nav>
  );
}

const Nav = styled(AppBar)({
  position: "fixed",
  top: 0,
  backgroundColor: "white",
  color: "black",
  height: "5rem",
  border: "solid",
  borderRadius: "1rem",
});

const Typo1 = styled(Typography)({
  mr: 2,
  display: "flex",
  fontFamily: "monospace",
  fontWeight: 700,
  letterSpacing: ".3rem",
  color: "inherit",
  textDecoration: "none",
  cursor: "pointer",
  background: "-webkit-linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
  borderRadius: "1rem",
});

const Box1 = styled(Box)({
  display: "flex",
  flexGrow: 1,
  marginLeft: "10rem",
});

const Button1 = styled(Button)({
  marginTop: ".5rem",
  color: "black",
  display: "block",
  marginRight: "5rem",
  fontSize: "1.5rem",
});

export default Navbar;
