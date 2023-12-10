import React from 'react'
import OpenSVG from '@/assets/images/icons/open.svg'
import styled from 'styled-components'
import { format } from 'date-fns'

const BoardCard = ({ author, title, date, quantity }) => {
  const datee = new window.Date(date)
  const formattedDate = format(datee, 'MM/dd/yyyy')

  return (
    <Board>
      <BoardHead>
        <BoardTitle>
          {title}
          <BoardQuantity>{`(${quantity} task)`}</BoardQuantity>
        </BoardTitle>
        <Open src={OpenSVG} alt="open" />
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
const BoardQuantity = styled.span`
  font-size: 0.8rem;
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
