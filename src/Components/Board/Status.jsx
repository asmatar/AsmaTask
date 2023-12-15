import React from 'react'
import styled from 'styled-components'
const Status = ({ title, description, isActive, handleActive }) => {
  return (
    <Div $isActive={isActive} onClick={handleActive}>
      <H3>{title}</H3>
      <P>{description}</P>
    </Div>
  )
}

export default Status
const Div = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 15px 10px;
  box-shadow: 0 5px 30px 0 rgb(0 0 0 / 10%);
  transition: all 0.3s ease;
  cursor: pointer;
  border-radius: 5px;
  background-color: ${(props) =>
    props.$isActive === true ? '#a881ff' : '#fff'};
  &:hover {
    background-color: #a881ff;
  }
`
const H3 = styled.h3``
const P = styled.p`
  font-size: 0.9rem;
`
