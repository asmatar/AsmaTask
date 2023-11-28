import React, { useEffect } from 'react'
import styled from 'styled-components'
import useSWR from 'swr'
import { fetchBoards } from '@/Services/API-firebase'
import Spinner from '@/components/UI/spinner'
import { useDispatch } from 'react-redux'
import { addBoard } from '@/RTK/reducers/boardsReducer'
import { useTranslation } from 'react-i18next'
const BoardsMain = () => {
  const { t } = useTranslation('global')
  const dispatch = useDispatch()
  const { data, error } = useSWR('board', fetchBoards)

  useEffect(() => {
    if (data) {
      // Assuming data is an array of board objects
      // You can modify this logic based on your actual data structure
      data.forEach((board) => {
        dispatch(addBoard(board))
      })
    }
  }, [data, dispatch])
  if (error) {
    return <div>{error.message}</div>
  }

  if (!data) {
    return <Spinner />
  }
  return (
    <>
      <BoardsContainer>
        <BoardHeader>
          <Title>{t('newBoard')}</Title>
          <Para>{t('createFirstBoard')}</Para>
        </BoardHeader>
      </BoardsContainer>
    </>
  )
}

export default BoardsMain

const BoardsContainer = styled.div`
  min-height: calc(100vh - 83px);
  display: flex;
  justify-content: center;
  align-items: center;
`
const BoardHeader = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`
const Title = styled.h1`
  font-size: 2rem;
  font-weight: 300;
`
const Para = styled.p``
