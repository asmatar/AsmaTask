import React from 'react'
import styled from 'styled-components'
import ButtonSecondary from '../UI/ButtonSecondary'
/* import { useTranslation } from 'react-i18next' */
const AddBoard = ({ onClose }) => {
  /* const { t } = useTranslation('global') */
  return (
    <>
      <BoardBox>
        <BoardBoxHeader>
          <LabelHead>Create board</LabelHead>
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
          <Label htmlFor="name">Board name</Label>
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
const LabelHead = styled.span`
  color: ${({ theme }) => theme.colorModal};
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
  color: ${({ theme }) => theme.colorModal};
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
  color: ${({ theme }) => theme.colorModal};
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
    color: ${({ theme }) => theme.colorModal};
  }
  border-width: 3px;
  border-image: ${({ theme }) => theme.background};
  border-image-slice: 1;
`
