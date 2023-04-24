import React, {useState, useEffect} from 'react'
import Rps from 'components/rps/Rps';
import { Timer } from 'components/common';

import styled from 'styled-components';
import { Button, Box } from '@mui/material';

function RpsGamePage() {

  const [startTime, setStartTime] = useState(0);
  const [settingTime, setSettingTime] = useState(40);

  const handleStart = () => {
    setStartTime(new Date().getTime());
  }

  return (
    <>
    <TimerBox>
      <Timer startTime={startTime} settingTime={settingTime}/>
    </TimerBox>
      <Rps onGameStart={handleStart}/>
    </>
  )
}

// css

const TimerBox = styled(Box) ({
  fontSize: '2rem',
  display: 'flex',
  justifyContent: 'end',
  margin: '2rem'
})

export default RpsGamePage;