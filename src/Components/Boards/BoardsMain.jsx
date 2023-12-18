import React, { useEffect } from 'react'
import styled from 'styled-components'
import useSWR from 'swr'
import { fetchBoards } from '@/Services/API-firebase'
import Spinner from '@/components/UI/spinner'
import { useDispatch, useSelector } from 'react-redux'
import { selectBoards } from '@/RTK/reducers/boardsReducer'
import { useTranslation } from 'react-i18next'
import BoardCard from './BoardCard'
import { NavLink } from 'react-router-dom'
import { onSnapshot, collection } from 'firebase/firestore'
import { db } from '@/firebase-config'

const BoardsMain = () => {
  const boards = useSelector(selectBoards)
  const { t } = useTranslation('global')
  const dispatch = useDispatch()
  const { data, error } = useSWR('board', () => dispatch(fetchBoards()), {
    revalidateOnMount: true,
    revalidateOnFocus: true,
  })

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'boards'), () => {
      dispatch(fetchBoards()) // Re-fetch the data when the collection changes
    })

    return () => {
      unsubscribe() // Unsubscribe from the onSnapshot listener when the component unmounts
    }
  }, [dispatch])

  if (error) {
    return <div>{error.message}</div>
  }
  if (!data) {
    return <Spinner />
  }
  return (
    <>
      {boards.length > 0 ? (
        <BoardContainer>
          {boards.map((board) => {
            return (
              <li key={board.id}>
                <StyledNavLink to={`/board/${board.id}`}>
                  <BoardCard
                    author={board.author}
                    title={board.name}
                    quantity={board.quantity}
                    date={board.date}
                    id={board.id}
                  />
                </StyledNavLink>
              </li>
            )
          })}
        </BoardContainer>
      ) : (
        <BoardsContainer>
          <BoardHeader>
            <Title>{t('newBoard')}</Title>
            <Para>{t('createFirstBoard')}</Para>
          </BoardHeader>
        </BoardsContainer>
      )}
    </>
  )
}

export default BoardsMain

const StyledNavLink = styled(NavLink)`
  color: inherit;
`
const BoardContainer = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 25px;
  max-width: 1480px;
  padding: 30px 10px;
  margin: 0 auto;
  @media screen and (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (max-width: 600px) {
    grid-template-columns: repeat(1, 1fr);
  }
`
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
