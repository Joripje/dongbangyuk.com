import React from 'react'

import { GameTemplate, PrepareTemplate, StatusBar } from 'components/game'

function RpsPreparePage() {
  const gameType = 'rps';

  return (
    <GameTemplate>
      <StatusBar gameType={gameType} status='rps' problemNum={3} />
      <PrepareTemplate />
    </GameTemplate>
  )
}

export default RpsPreparePage
