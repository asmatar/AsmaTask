import React from 'react'
import OpenSVG from '@/assets/images/icons/open.svg'
import styled from 'styled-components'
import { format } from 'date-fns'
import { deleteBoardFromFirebase } from '@/Services/API-firebase'
import useLocalStorage from '@/Hooks/useLocalStorage'
const BoardCard = ({ author, title, date, id }) => {
  const datee = new window.Date(date)
  const formattedDate = format(datee, 'MM/dd/yyyy')
  const [value] = useLocalStorage('theme', `light`)
  return (
    <Board>
      <BoardHead>
        <BoardTitle>{title}</BoardTitle>
        <Open
          src={OpenSVG}
          alt="open"
          onClick={(event) => {
            event.preventDefault()
            deleteBoardFromFirebase(id, value)
          }}
        />
      </BoardHead>
      <BoardBody>
        <BoardDate>
          Created at <Date>{formattedDate}</Date>
        </BoardDate>
        <BoardAuthor>
          by <Date>{author}</Date>
        </BoardAuthor>
      </BoardBody>
    </Board>
  )
}

export default BoardCard
const Board = styled.article`
  padding: 0.5rem;
  background-color: #fffdfd40;
  border-radius: 0.5rem;
  transition: all 0.4s ease-in-out;
  cursor: pointer;
  box-shadow:
    rgba(0, 0, 0, 0.04) 0px 20px 25px -5px,
    rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;
  &:hover {
    background-color: ${({ theme }) => theme.backgroundCardHover};
  }
  @media screen and (max-width: 330px) {
  }
`
const BoardHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`
const BoardTitle = styled.h2`
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  gap: 5px;
  &::first-letter {
    text-transform: uppercase;
  }
`
const Open = styled.img`
  cursor: pointer;
`
const BoardBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`
const BoardDate = styled.p`
  font-size: 0.9rem;
`
const Date = styled.span`
  font-size: 1rem;
  text-decoration: underline;
`

const BoardAuthor = styled(BoardDate)``
