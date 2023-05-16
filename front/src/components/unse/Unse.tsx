import React, { useState, useEffect } from "react";

import styled from "styled-components";

import { postToday, postLuckyday } from "api/unse";

function Unse() {
  const [luckyday, setLuckyday] = useState<any>([]);
  const [todayluck, setTodayluck] = useState<any>([]);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [gender, setGender] = useState("");
  const [today] = useState(new Date().toISOString().slice(0, 10));
  // 생년월일, 오늘날짜, 성별

  const handleDateChange = (e: any) => {
    setSelectedDate(e.target.value);
  };

  const handleGender = (e: any) => {
    setGender(e.target.value);
  };

  const handleLuck = (e: any) => {
    e.preventDefault();
    // console.log(e.target.elements);
    const MF = gender;
    const birth = selectedDate.replace(/-/g, "");
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
    <WrapBox>
      <h1>오늘의 운세!! 생일과 성별을 제출해주세용!</h1>
      <form onSubmit={handleLuck}>
        <label>birth day:</label>
        <input
          type="date"
          id="birth"
          name="birth"
          min="1960-01-01"
          max="2023-12-31"
          value={selectedDate}
          onChange={handleDateChange}
        />
        <fieldset id="gender">
          <legend>성별</legend>
          <div>
            <input
              onClick={handleGender}
              name="gender"
              type="radio"
              value="M"
            />
            <label>남자</label>
            <input
              onClick={handleGender}
              name="gender"
              type="radio"
              value="F"
            />
            <label>여자</label>
          </div>
        </fieldset>
        <button type="submit">제출</button>
      </form>
      <h1>오늘의 운세</h1>
      <div>{todayluck.data}</div>
      <h1>좋은날</h1>

      {luckyday.map((info: any) => (
        <div>{`${info.description} : ${info.dates}일`}</div>
      ))}
    </WrapBox>
  );
}

const WrapBox = styled.div({
  // backgroundColor: "grey",
  width: "35vw",
  height: "61vh",
  borderRadius: "1rem",
  marginLeft: "2rem",
});
export default Unse;
