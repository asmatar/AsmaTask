import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import ButtonSecondary from '@/Components/UI/ButtonSecondary'
import Status from './Status'
const AddNewTask = () => {
  const taskName = useRef(null)
  const [activeIndex, setActiveIndex] = useState(1)
  const { t } = useTranslation('global')
  const handdleNewTask = (event) => {
    event.preventDefault()
  }
  const handleActive = (index) => {
    setActiveIndex(index)
  }
  return (
    <BoardBox onSubmit={(event) => handdleNewTask(event)}>
      <BoardBoxHeader>
        <LabelHead>{t('createBoard')}</LabelHead>
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
          ref={taskName}
        />
        <Label htmlFor="name">{t('boardName')}</Label>
      </FormGroup>
      <Status
        handleActive={() => handleActive(1)}
        title="todo"
        description="A new task to be completed"
        isActive={activeIndex === 1}
      ></Status>
      <Status
        handleActive={() => handleActive(2)}
        title="in progress"
        description="A task that is currently being worked on"
        isActive={activeIndex === 2}
      ></Status>
      <Status
        handleActive={() => handleActive(3)}
        title="done"
        description="A task that has been completed"
        isActive={activeIndex === 3}
      ></Status>
      <ButtonSecondary type="submit">{t('create')}</ButtonSecondary>
    </BoardBox>
  )
}

export default AddNewTask
const BoardBoxHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const LabelHead = styled.span`
  color: ${({ theme }) => theme.colorModal};
`

const BoardBox = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
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
