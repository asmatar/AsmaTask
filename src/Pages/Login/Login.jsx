import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import useYupValidationResolver, {
  schema,
} from '@/hooks/useYupValidationResolver'

import PageTitle from '@/Components/Login/PageTitle'
import TextIntro from '@/Components/Login/TextIntro'
import LogText from '@/Components/Login/LogText'
import GeneralButton from '@/Components/UI/GeneralButton'
import ErrorMessage from '@/Components/UI/ErrorMessage'
import styled from 'styled-components'
import { useUserAuth } from '@/Context/authContext'

const Login = () => {
  const { t } = useTranslation('global')
  const { login } = useUserAuth()
  const navigate = useNavigate()
  const formType = 'login'
  const resolver = useYupValidationResolver(schema, t, formType)

  const [firebaseError, setFirebaseError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver })

  const handleSubmitForm = async (data) => {
    try {
      await login(data.email, data.password)
      navigate('/')
    } catch (error) {
      setFirebaseError(error.message)
    }
  }

  return (
    <>
      <HeaderContainer>
        <PageTitle />
        <TextIntro>{t('logText')}</TextIntro>
        <LogFormContainer onSubmit={handleSubmit(handleSubmitForm)}>
          <FormGroup>
            <Input
              type="input"
              className="form__field"
              placeholder="Name place"
              {...register('email')}
              id="name"
              autoComplete="off"
            />
            <Label htmlFor="name">{t('email')}</Label>
            <ErrorMessage message={errors.email?.message} />
          </FormGroup>
          <FormGroup>
            <Input
              type="input"
              className="form__field"
              placeholder="Name place"
              {...register('password')}
              id="name"
              autoComplete="off"
            />
            <Label htmlFor="name">{t('password')}</Label>
            <ErrorMessage message={errors.password?.message} />
          </FormGroup>
          <GeneralButton type="submit">{t('signin')}</GeneralButton>
          <ErrorMessage message={firebaseError} />
          <NavLinkLog to="/register">
            <LogText>{t('noAccount')}</LogText>
          </NavLinkLog>
        </LogFormContainer>
      </HeaderContainer>
    </>
  )
}

export default Login
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
