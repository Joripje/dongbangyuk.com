import React from "react";
import { useNavigate } from "react-router-dom";

function Error404Page() {
  const navigate = useNavigate();
  const onClickHandler = () => {
    navigate("/componentTest");
  };
  return (
    <React.Fragment>
      <div>hello, here is your 404</div>
      <button onClick={onClickHandler}>차린건 없지만 여긴 어떠신가요?</button>
    </React.Fragment>
  );
}

export default Error404Page;
