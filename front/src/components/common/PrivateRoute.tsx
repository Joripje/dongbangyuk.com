import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { auth } from "service";

import styeld from "styled-components";
import { Button } from "@mui/material";

function PrivateRoute() {
  const navigate = useNavigate();
  console.log(auth.currentUser?.refreshToken);
  useEffect(() => {
    const varifyUser = () => {
      if (!auth.currentUser?.refreshToken) {
        alert("로그인 후 접근해주세요.");
        localStorage.clear();
        navigate("member");
      }
    };
    varifyUser();
  }, []);

  return (
    <>
      <HelloStarnger>Hello Stranger</HelloStarnger>;
      <Button onClick={() => auth.signOut()}>Just For YOU </Button>
    </>
  );
}

const HelloStarnger = styeld.div({
  display: "none",
});
export default PrivateRoute;
