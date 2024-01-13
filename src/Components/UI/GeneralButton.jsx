import React from 'react'
import styled from 'styled-components'

const GeneralButton = ({ children, onClick, type }) => {
  return (
    <LogButton onClick={onClick} type={type}>
      {children}
    </LogButton>
  )
}

export default GeneralButton

const LogButton = styled.button`
  text-decoration: none;
  color: ${({ theme }) => theme.colorBlue};
  font-weight: 600;
  border: 1px solid white;
  padding: 10px 20px;
  transition: all 0.3s;
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  cursor: pointer;
  box-shadow:
    rgba(0, 0, 0, 0.1) 0px 20px 25px -5px,
    rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;
  &:hover {
    background-color: ${({ theme }) => theme.colorBlue};
    color: ${({ theme }) => theme.colorTextSecondary};
  }

  &:before {
    content: '';
    background-color: ${({ theme }) => theme.colorTextSecondary};
    top: 0;
    left: 0;
    width: 120%;
    height: 50px;
    position: absolute;
    transform: translateX(-100%) rotate(45deg);
    transition: all 0.3s;
  }

  &:hover:before {
    transform: translateX(120%) rotate(45deg);
  }
`
