import React from 'react'
import styled from 'styled-components'

const BoardsMain = () => {
  const lng = navigator.language
  return (
    <BoardsContainer>
      Boards
      <span>browser-kanguage: {lng}</span>
    </BoardsContainer>
  )
}

export default BoardsMain

const BoardsContainer = styled.div`
  min-height: calc(100vh - 83px);
`
