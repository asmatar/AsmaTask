import React from 'react'
import styled from 'styled-components'

const LangButton = ({ children, onClick }) => {
  return <Button onClick={onClick}>{children}</Button>
}

export default LangButton

const Button = styled.button`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  cursor: pointer;
  border: 1px solid ${({ theme }) => theme.colorBlue};
  box-shadow:
    ${({ theme }) => theme.shadowColor} 0px 20px 25px -5px,
    ${({ theme }) => theme.shadowColor} 0px 10px 10px -5px;
  color: ${({ theme }) => theme.colorBlue};
  background-color: ${({ theme }) => theme.colorTextSecondary};
  &:hover {
    background-color: ${({ theme }) => theme.colorBlue};
    color: ${({ theme }) => theme.colorLang};
  }
  transition: all 0.3s ease-in;
`
