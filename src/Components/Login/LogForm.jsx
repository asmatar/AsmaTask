import React from 'react'
import LogText from './LogText'
import GeneralButton from '../UI/GeneralButton'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
const LogForm = () => {
  const { t } = useTranslation('global')
  return (
    <>
      <FormGroup>
        <Input
          type="input"
          class="form__field"
          placeholder="Name place"
          name="name"
          id="name"
          required
          autoComplete="off"
        />
        <Label for="name">{t('email')}</Label>
      </FormGroup>
      <FormGroup>
        <Input
          type="input"
          class="form__field"
          placeholder="Name place"
          name="name"
          id="name"
          required
          autoComplete="off"
        />
        <Label for="name">{t('password')}</Label>
      </FormGroup>
      <GeneralButton>{t('signin')}</GeneralButton>
      <LogText>{t('noAccount')}</LogText>
    </>
  )
}

export default LogForm
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
  padding: 15px 0 0;
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

  &:placeholder-shown ~ .form__label {
    font-size: 1rem;
    cursor: text;
    top: 20px;
  }
  &:focus + ${Label} {
    position: absolute;
    top: 0;
    display: block;
    transition: 0.2s;
    font-size: 0.7rem;
    color: ${({ theme }) => theme.colorInputText};
  }
  border-width: 3px;
  border-image: ${({ theme }) => theme.background};
  border-image-slice: 1;
`
