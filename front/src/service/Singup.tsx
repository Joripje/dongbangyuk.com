import { ChangeEvent, useState } from "react";
import { auth } from "./firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Box, Container, Grid, Button, TextField } from "@mui/material";

type textFieldOption = {
  id: string;
  target: string;
  setTarget: (prop: string) => void;
  label: string;
  focus: boolean;
  type: string;
};

function SignUp() {
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
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
    createUserWithEmailAndPassword(auth, inputEmail, inputPassword)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        // ...
      })
      .catch((error) => {
        //   const errorCode = error.code;
        //   const errorMessage = error.message;
        console.log(error);
      });
  };

  return (
    <Container fixed>
      <Box component='form'>
        <Grid
          container
          spacing={2}
          style={{ padding: "2rem", justifyContent: "center" }}
        >
          {textFieldOptions.map((item) => {
            return (
              <Grid item xs={12} key={item.id}>
                <TextField
                  onChange={onTypingHandler}
                  //   helperText={params?.helperText}
                  //   error={params?.error}
                  //   disabled={params?.disabled}
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
              {/* <b>{params.buttonName}</b> */}
              회원 가입
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default SignUp;
