import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { auth } from "service";

import { Box, Grid, Button, TextField } from "@mui/material";

type SignUpProps = {
  isLogin: boolean;
};

type textFieldOption = {
  id: string;
  target: string;
  setTarget: (prop: string) => void;
  label: string;
  focus: boolean;
  type: string;
};

function SignUp(props: SignUpProps) {
  const navigate = useNavigate();
  const { isLogin } = props;
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [inputDisplayName, setInputDisplayName] = useState("");
  const [inputPhoneNumber, setInputPhoneNumber] = useState("");

  const textFieldOptions: Array<textFieldOption> = [
    {
      id: "userId",
      target: inputEmail,
      setTarget: (id) => setInputEmail(id),
      label: "E-Mail",
      focus: true,
      type: "id",
    },
    {
      id: "password",
      target: inputPassword,
      setTarget: (password) => setInputPassword(password),
      label: "Password",
      focus: false,
      type: "password",
    },
    {
      id: "displayName",
      target: inputDisplayName,
      setTarget: (displayName) => setInputDisplayName(displayName),
      label: "닉네임",
      focus: false,
      type: "displayName",
    },
    {
      id: "phoneNumber",
      target: inputPhoneNumber,
      setTarget: (phoneNumber) => setInputPhoneNumber(phoneNumber),
      label: "전화번호",
      focus: false,
      type: "phoneNumber",
    },
  ];
  const onTypingHandler = (event: ChangeEvent<HTMLInputElement>) => {
    for (const key in textFieldOptions) {
      const option = textFieldOptions[key];
      if (event.target.id === option.id) {
        option.setTarget(event.target.value);
        break;
      }
    }
  };

  const onClickHandler = () => {
    const authFunction = isLogin
      ? signInWithEmailAndPassword
      : createUserWithEmailAndPassword;

    authFunction(auth, inputEmail, inputPassword)
      .then((userInfo) => {
        navigate("/");
        if (userInfo.user.email)
          localStorage.setItem("userEmail", userInfo.user.email);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Box component='form'>
      <Grid
        container
        spacing={2}
        style={{ padding: "2rem", justifyContent: "center" }}
      >
        {textFieldOptions.map((item, index) => {
          if (isLogin && index > 1) return false;
          return (
            <Grid item xs={12} key={item.id}>
              <TextField
                onChange={onTypingHandler}
                id={item.id}
                autoFocus={item.focus}
                label={item?.label}
                type={item.type}
                fullWidth
              />
            </Grid>
          );
        })}
        <Grid item xs={9}>
          <Button
            onClick={onClickHandler}
            variant='contained'
            className='submit'
            style={{ height: "3rem", background: "#B8DDFF" }}
            fullWidth
          >
            {isLogin ? "로그인" : "회원 가입"}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default SignUp;
