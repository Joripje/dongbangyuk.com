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
import { DBYK } from "assets/images";
import { NotificationButton } from "components/notification";

import { useNavigate } from "react-router-dom";
import { auth } from "service";
function Navbar() {
  const navigate = useNavigate();
  const navOptions = ["역검센터", "결과보기", "프로필"];

  const handleClick = (page: string) => {
    switch (page) {
      case "동방역검":
        navigate("/main/");
        break;
      case "역검센터":
        navigate("/test/");
        break;
      case "결과보기":
        navigate("/statistics/list");
        break;
      case "프로필":
        navigate("/profile");
        break;
    }
  };
  return (
    <Nav>
      <HeaderStyle>
        <LogoStyle onClick={() => handleClick("동방역검")}>
          <LogoImg src={DBYK} />
          <LogoTypo >동방역검</LogoTypo>
        </LogoStyle>
        <MenuStyle>
          {navOptions.map((option, index) => (
            <NavButton
              onClick={() => {
                handleClick(option);
              }}
              key={index}
            >
              {option}
            </NavButton>
          ))}
        </MenuStyle>

        <NotificationButton />
      </HeaderStyle>
    </Nav>
  );
}

const Nav = styled(AppBar)({
  display: "flex",
  justifyContent: "center",
  position: "fixed",
  top: 0,
  backgroundColor: "white",
  color: "black",
  height: "5.5rem",
});

const LogoTypo = styled(Typography)({
  mr: 2,
  display: "flex",
  fontFamily: "Song Myung",
  fontWeight: 700,
  fontSize: "2.3rem",
  letterSpacing: ".3rem",
  color: "inherit",
  textDecoration: "none",
  cursor: "pointer",
  // background: "-webkit-linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
  borderRadius: "1rem",
});

const Box1 = styled(Box)({
  display: "flex",
  flexGrow: 1,
  marginLeft: "10rem",
});

const NavButton = styled(Button)({
  marginTop: ".5rem",
  color: "black",
  display: "block",
  marginLeft: "2.5rem",
  marginRight: "2.5rem",
  fontSize: "1.6rem",
  fontFamily: "Pretendard-Regular",
});

const LogoStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const LogoImg = styled.img`
  height: 50px;
  // transform: scaleX(-1);
  margin-right: 10px;
`;

const HeaderStyle = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  align-items: center;
`;

const MenuStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  // @media (max-width: 600px) {
  //   display: none;
  // }
`;

export default Navbar;
