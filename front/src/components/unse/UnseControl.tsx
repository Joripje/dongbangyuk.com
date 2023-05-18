import { ChangeEvent, useState } from "react";
import { postToday, postLuckyday } from "api/unse";

import styled from "styled-components";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

type Luckyday = {
  description: string;
  dates: Array<string>;
};

type UnseControlProps = {
  setLuckyday: (luckyDates: Luckyday[]) => void;
  setTodayluck: (luck: { data: string }) => void;
};

function UnseControl(props: UnseControlProps) {
  const { setLuckyday, setTodayluck } = props;
  const [gender, setGender] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string | null>("male");
  const [today] = useState(new Date().toISOString().slice(0, 10));

  const handleGender = (event: ChangeEvent) => {
    event.preventDefault();
    setGender(event.currentTarget.id);
    console.log(selectedDate);
  };

  const handleLuck = (e: any) => {
    e.preventDefault();
    // console.log(e.target.elements);
    const MF = gender;
    const birth = selectedDate;
    const target = today.replace(/-/g, "");
    const fetchData = async () => {
      try {
        const response = await postLuckyday({
          birth: birth,
          target: target,
          gender: MF,
        });
        const response2 = await postToday({
          birth: birth,
          target: target,
          gender: MF,
        });
        setLuckyday(response.lucky_dates);
        setTodayluck(response2);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  };

  return (
    <ControlBox>
      <ColFlex>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker
              label={"생년월일"}
              format='YYYY/MM/DD'
              onChange={(value: string | null) => setSelectedDate(value)}
            />
          </DemoContainer>
        </LocalizationProvider>
        <FormControl>
          <RadioGroup
            row
            onChange={(event: ChangeEvent) => handleGender(event)}
          >
            <FormControlLabel
              id='male'
              control={<Radio id='male' />}
              label='남자'
              value={"male"}
            />
            <FormControlLabel
              control={<Radio id='female' />}
              label='여자'
              value={"female"}
            />
          </RadioGroup>
        </FormControl>
      </ColFlex>

      <SubmitButton type='submit' onClick={handleLuck}>
        제출
      </SubmitButton>
    </ControlBox>
  );
}

const ControlBox = styled.div({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-around",
  alignItems: "center",
  padding: "1rem",
  borderRadius: "1rem",
  backgroundColor: "white",
  margin: "1rem",
});

const ColFlex = styled.div({
  display: "flex",
  flexDirection: "column",
});

const Box4 = styled.div({
  // textAlign: "center",
  // background: "linear-gradient(#D21312, #FEA1A1)",
  // backgroundClip: "text",
  // WebkitBackgroundClip: "text",
  // color: "transparent",
  // fontFamily: " system-ui",
  padding: "1rem",
  fontSize: "1.5rem",
});

const SubmitButton = styled.button({
  width: "5vw",
  height: "100%",
  fontSize: "1.5rem",
  borderRadius: "1rem",
  backgroundColor: "white",
  cursor: "pointer",
});

export default UnseControl;
