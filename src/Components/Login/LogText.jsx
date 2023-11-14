import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
const LogText = ({ children }) => {
  return (
    <NavLinkLog to="/register">
      <CheckAcountPara>{children}</CheckAcountPara>
    </NavLinkLog>
  )
}

export default LogText
const CheckAcountPara = styled.p`
  font-size: 12px;
  max-width: 250px;
  text-align: center;
  line-height: 1.2;
  align-self: center;
  transition: all 0.3s ease-in;
  color: ${({ theme }) => theme.colorTextSecondary};
  &:hover {
    color: ${({ theme }) => theme.colorLangBg};
  }
`
const NavLinkLog = styled(NavLink)`
  text-align: center;
  display: flex;
  justify-content: center;
`
