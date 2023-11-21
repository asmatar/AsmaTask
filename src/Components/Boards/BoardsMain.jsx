import React, { useEffect /* , { useEffect } */ } from 'react'
import styled from 'styled-components'
import useSWR from 'swr'
import { fetchBoards } from '../../Services/API-firebase'
import Spinner from '@/components/UI/spinner'
import { useDispatch } from 'react-redux'

const BoardsMain = () => {
  const dispatch = useDispatch()
  const { data, error } = useSWR('board', fetchBoards)

  if (error) {
    return <div>{error.message}</div>
  }

  if (!data) {
    return <Spinner />
  }
  useEffect(() => {
    if (data) {
      // Assuming data is an array of board objects
      // You can modify this logic based on your actual data structure
      data.forEach((board) => {
        dispatch(addBoard(board))
      })
    }
  }, [data, dispatch])
  return (
    <>
      <BoardsContainer>
        <BoardHeader>
          <Title>No Board Created</Title>
          <Para>Create your first board</Para>
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
