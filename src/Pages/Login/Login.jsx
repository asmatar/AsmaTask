import React from 'react'
import PageTitle from '@/Components/Login/PageTitle'
import TextIntro from '@/Components/Login/TextIntro'
import LogForm from '../../Components/Login/LogForm'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
const Login = () => {
  const { t } = useTranslation('global')
  return (
    <HeaderContainer>
      <PageTitle />
      <TextIntro>{t('logText')}</TextIntro>
      <LogFormContainer>
        <LogForm />
      </LogFormContainer>
    </HeaderContainer>
  )
}

export default Login

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
