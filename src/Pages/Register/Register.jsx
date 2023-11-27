import React, { useState } from 'react'
import PageTitle from '@/Components/Login/PageTitle'
import TextIntro from '@/Components/Login/TextIntro'
import { NavLink, useNavigate } from 'react-router-dom'
import LogText from '@/Components/Login/LogText'
import GeneralButton from '@/Components/UI/GeneralButton'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { useUserAuth } from '@/Context/authContext'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import ErrorMessage from '@/Components/UI/ErrorMessage'
const Register = () => {
  const { t } = useTranslation('global')
  const { signUp } = useUserAuth()
  const navigate = useNavigate()
  const [firebaseError, setFirebaseError] = useState('')

  const schema = yup.object().shape({
    email: yup
      .string()
      .email('email must be valid')
      .required('email is required'),
    password: yup
      .string()
      .required('password is required')
      .matches(
        /^(?=.*\d)(?=.*[A-Z]).{7,14}$/,
        'Password should have at least one uppercase letter, one number, between 7 and 14 characters'
      ),
  })
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) })

  const handleSubmitForm = async (data) => {
    console.log(data)
    console.log('in the handle submit function')
    try {
      console.log('first')
      await signUp(data.email, data.password)
      navigate('/login')
    } catch (error) {
      console.log(error)
      setFirebaseError(error.message)
    }
  }
  return (
    <HeaderContainer>
      <PageTitle />
      <TextIntro>{t('regText')}</TextIntro>
      <LogFormContainer onSubmit={handleSubmit(handleSubmitForm)}>
        <FormGroup>
          <Input
            type="input"
            placeholder="Name place"
            id="name"
            autoComplete="off"
            {...register('email')}
          />
          <Label htmlFor="name">{t('email')}</Label>
          <ErrorMessage message={errors.email?.message} />
        </FormGroup>
        <FormGroup>
          <Input
            type="input"
            placeholder="password"
            id="password"
            autoComplete="off"
            {...register('password')}
          />
          <Label htmlFor="password">{t('password')}</Label>
          <ErrorMessage message={errors.password?.message} />
        </FormGroup>
        <GeneralButton type="submit">{t('signup')}</GeneralButton>
        <ErrorMessage massage={firebaseError} />
        <NavLinkLog to="/login">
          <LogText>{t('haveAccount')}</LogText>
        </NavLinkLog>
      </LogFormContainer>
    </HeaderContainer>
  )
}

export default Register
/* const ErrorMessage = styled.p`
  margin-top: 5px;
  color: red;
  font-size: 13px;
  text-transform: lowercase;
  &::first-letter {
    text-transform: uppercase;
  }
` */
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
