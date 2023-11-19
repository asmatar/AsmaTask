import React, { useState } from 'react'
import PageTitle from '@/Components/Login/PageTitle'
import TextIntro from '@/Components/Login/TextIntro'
import { NavLink, useNavigate } from 'react-router-dom'
import LogText from '@/Components/Login/LogText'
import GeneralButton from '@/Components/UI/GeneralButton'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { useUserAuth } from '@/Context/authContext'
const Register = () => {
  const { t } = useTranslation('global')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { signUp } = useUserAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await signUp(email, password)
      navigate('/login')
    } catch (error) {
      console.log(error.message)
    }
  }
  return (
    <HeaderContainer>
      <PageTitle />
      <TextIntro>{t('regText')}</TextIntro>
      <LogFormContainer onSubmit={handleSubmit}>
        <FormGroup>
          <Input
            type="input"
            className="form__field"
            placeholder="Name place"
            name="name"
            id="name"
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Label htmlFor="name">{t('email')}</Label>
        </FormGroup>
        <FormGroup>
          <Input
            type="input"
            className="form__field"
            placeholder="password"
            name="password"
            id="password"
            autoComplete="off"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Label htmlFor="password">{t('password')}</Label>
        </FormGroup>
        <GeneralButton type="submit">{t('signup')}</GeneralButton>
        <NavLinkLog to="/login">
          <LogText>{t('haveAccount')}</LogText>
        </NavLinkLog>
      </LogFormContainer>
    </HeaderContainer>
  )
}

export default Register
const NavLinkLog = styled(NavLink)`
  text-align: center;
  display: flex;
  justify-content: center;
`
const HeaderContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 35px;
  padding: 0 10px;
  text-transform: capitalize;
`
const LogFormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`
const Label = styled.label`
  position: absolute;
  top: 0;
  display: block;
  transition: 0.2s;
  font-size: 1rem;
  color: ${({ theme }) => theme.colorInputText};
`
const FormGroup = styled.div`
  position: relative;
  padding: 5px 0 0;
  margin-top: 10px;
  width: 330px;
`
const Input = styled.input`
  width: 100%;
  border: 0;
  border-bottom: 2px solid blue;
  outline: 0;
  font-size: 1rem;
  color: #fff;
  padding: 0px 0;
  background: transparent;
  transition: border-color 0.2s;

  &::placeholder {
    color: transparent;
  }

  &:not(:placeholder-shown) + ${Label} {
    font-size: 1rem;
    cursor: text;
    opacity: 0;
    top: 20px;
  }
  &:focus + ${Label} {
    position: absolute;
    top: -15px;
    display: block;
    opacity: 1;
    transition: 0.2s;
    font-size: 0.7rem;
    color: ${({ theme }) => theme.colorLang};
  }
  border-width: 3px;
  border-image: ${({ theme }) => theme.background};
  border-image-slice: 1;
`
