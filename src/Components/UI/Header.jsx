import React from 'react'
import styled from 'styled-components'

import logo from '@/assets/images/logo.png'

const Header = ({ toggleTheme, isDarkTheme }) => {
  return (
    <HeaderContainer>
      <Logo>
        <CoverImg src={logo} alt="logo" />
      </Logo>
      <HeaderRight>
        <Label
          onClick={toggleTheme}
          htmlFor="darkmode-toggle"
          $isDarkTheme={isDarkTheme}
        ></Label>
        <LogButton>Login</LogButton>
        <CreateBoard>New board</CreateBoard>
      </HeaderRight>
    </HeaderContainer>
  )
}

export default Header

const HeaderContainer = styled.header`
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.colorText};
  box-shadow: ${({ theme }) => theme.shadowColor} 0px 3px 5px;
`
const Logo = styled.div``
const CoverImg = styled.img`
  width: 60px;
`

const Label = styled.label`
  width: 50px;
  height: 21px;
  position: relative;
  display: block;
  background: ${(props) =>
    props.$isDarkTheme === true ? '#242424' : '#ebebeb'};
  border-radius: 200px;
  cursor: pointer;
  box-shadow:
    inset 0px 5px 15px rgba(0, 0, 0, 0.4),
    inset 0px -5px 15px rgba(255, 255, 255, 0.4);
  transition: all.3s;
  &:after {
    content: '';
    width: 17px;
    height: 17px;
    position: absolute;
    top: 2px;
    left: ${(props) => (props.$isDarkTheme === true ? '15px' : '2px')};
    border-radius: 180px;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
    background: ${(props) =>
      props.$isDarkTheme === true
        ? 'linear-gradient(180deg, #777, #3a3a3a);'
        : 'linear-gradient(180deg, #eed0aa, #d8860b)'};
    transition: all.3s;
    transform: ${(props) =>
      props.$isDarkTheme === true ? 'translateX(100%)' : 'translateX(0%)'};
  }
`
const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`
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
const CreateBoard = styled(LogButton)``
