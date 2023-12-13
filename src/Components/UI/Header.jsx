import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { NavLink, useNavigate } from 'react-router-dom'
import logo from '@/assets/images/logo.png'
import GeneralButton from './GeneralButton'
import AddBoard from '@/components/Boards/AddBoard'
import Modal from '@/components/Modal/Modal'
import { useUserAuth } from '@/Context/authContext'

const Header = ({ toggleTheme, isDarkTheme }) => {
  const { logOut, user } = useUserAuth()
  const navigate = useNavigate()
  const { t } = useTranslation('global')
  const handleLogout = async () => {
    try {
      await logOut()
      navigate('/')
    } catch (error) {
      console.log('error')
    }
  }
  return (
    <>
      <HeaderContainer>
        <NavLink to={'/'}>
          <Logo>
            <CoverImg src={logo} alt="logo" />
          </Logo>
        </NavLink>
        <HeaderRight>
          <Label
            onClick={toggleTheme}
            htmlFor="darkmode-toggle"
            $isDarkTheme={isDarkTheme}
          ></Label>
          {!user && (
            <NavLink to="/login">
              <GeneralButton>{t('login')}</GeneralButton>
            </NavLink>
          )}
          {user && (
            <>
              <GeneralButton onClick={handleLogout}>logout</GeneralButton>
              <Modal>
                <Modal.Open opens="new-board">
                  <GeneralButton>{t('newBoard')}</GeneralButton>
                </Modal.Open>
                <Modal.Window name="new-board">
                  <AddBoard />
                </Modal.Window>
              </Modal>
            </>
          )}
        </HeaderRight>
      </HeaderContainer>
    </>
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
