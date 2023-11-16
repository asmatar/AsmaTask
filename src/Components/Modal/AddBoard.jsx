import React from 'react'
import styled from 'styled-components'
import ButtonSecondary from '../UI/ButtonSecondary'
import { useTranslation } from 'react-i18next'
const AddBoard = () => {
  const { t } = useTranslation('global')
  return (
    <>
      <BoardBox>
        <BoardBoxHeader>
          <LabelHead>Create board</LabelHead>
          <Outer>
            <Inner>
              <LabelBoard>Back</LabelBoard>
            </Inner>
          </Outer>
        </BoardBoxHeader>
        <FormGroup>
          <Input
            type="input"
            className="form__field"
            placeholder="Name place"
            name="name"
            id="name"
            required
            autoComplete="off"
          />
          <Label htmlFor="name">{t('password')}</Label>
        </FormGroup>
        <ButtonSecondary>Create</ButtonSecondary>
      </BoardBox>
    </>
  )
}

export default AddBoard

const BoardBoxHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const LabelHead = styled.span``

const Inner = styled.div`
  width: inherit;
  text-align: center;
  &::before,
  &::after {
    position: absolute;
    content: '';
    height: 1px;
    width: inherit;
    background: #ffc107;
    left: 0;
    transition: all 0.3s ease-in;
  }
  ,
  &::before {
    top: 50%;
    transform: rotate(45deg);
  }
  &::after {
    bottom: 50%;
    transform: rotate(135deg);
  }
`
const LabelBoard = styled.div`
  font-size: 0.8em;
  line-height: 4em;
  text-transform: uppercase;
  color: red;
  transition: all 0.3s ease-in;
  opacity: 0;
  cursor: pointer;
`
const Outer = styled.div`
  position: relative;
  width: 30px;
  cursor: pointer;
  &:hover > ${Inner}::before, &:hover > ${Inner}::after {
    transform: rotate(0);
  }
  &:hover > ${Inner}::before {
    top: 7px;
  }
  &:hover > ${Inner}::after {
    bottom: 7px;
  }
  &:hover > ${Inner} > ${LabelBoard} {
    color: red;
    opacity: 1;
  }
`
const BoardBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 35px;
  padding: 1rem 3rem;
  background: white;
  max-width: 400px;
  padding-top: 1rem;
  border-radius: 20px;
  border: 0;
  box-shadow: 0 5px 30px 0 rgb(0 0 0 / 10%);
  animation: fadeIn 1s ease both;
  &::backdrop {
    backdrop-filter: blur(20px);
  }
`
const Label = styled.label`
  position: absolute;
  top: 0;
  display: block;
  transition: 0.2s;
  font-size: 1rem;
  color: green;
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
  color: red;
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
    color: blue;
  }
  border-width: 3px;
  border-image: ${({ theme }) => theme.background};
  border-image-slice: 1;
`
