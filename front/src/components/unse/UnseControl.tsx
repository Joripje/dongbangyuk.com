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
import dayjs from "dayjs";

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
  const [gender, setGender] = useState<string>("M");
  const [selectedDate, setSelectedDate] = useState<any>(null);

  const handleGender = (event: ChangeEvent) => {
    event.preventDefault();
    setGender(event.currentTarget.id);
  };

  const handleLuck = (e: any) => {
    e.preventDefault();
    const tempData = {
      birth: selectedDate,
      target: new Date().toISOString().slice(0, 10).replace(/-/g, ""),
      gender: gender,
    };
    const fetchData = async () => {
      try {
        const response = await postLuckyday(tempData);
        const response2 = await postToday(tempData);
        setLuckyday(response.lucky_dates);
        setTodayluck(response2);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  };

  const handleChange = (value: Date | null) => {
    console.log(value !== null ? dayjs(value).format("YYYYMMDD") : "");
    setSelectedDate(value !== null ? dayjs(value).format("YYYYMMDD") : "");
  };

  return (
    <ControlBox>
      <ColFlex>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker
              value={selectedDate}
              label={"생년월일"}
              format='YYYY/MM/DD'
              onChange={handleChange}
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
              control={<Radio id='M' />}
              label='남자'
              value={"/m"}
            />
            <FormControlLabel
              control={<Radio id='F' />}
              label='여자'
              value={"F"}
            />
          </RadioGroup>
        </FormControl>
      </ColFlex>

      <SubmitButton type='submit' onClick={handleLuck}>
        운세 보기
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
