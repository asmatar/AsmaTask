import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import Status from './Status'
import { addNewTask } from '@/Services/API-firebase'
import { useUserAuth } from '@/Context/authContext'
import useLocalStorage from '@/Hooks/useLocalStorage'
import ButtonSecondary from '@/Components/UI/ButtonSecondary'

const AddNewTask = ({ onSubmit, columnName }) => {
  const [value] = useLocalStorage('theme', `light`)
  const [activeIndex, setActiveIndex] = useState(columnName)
  const { t } = useTranslation('global')
  const { id } = useParams()
  const {
    user: { displayName },
  } = useUserAuth()
  const taskName = useRef(null)

  const handdleNewTask = (event) => {
    event.preventDefault()
    addNewTask({
      taskTitle: taskName.current?.value,
      displayName,
      status: activeIndex.toLowerCase(),
      boardId: id,
      description: [],
      activities: [
        {
          activityAuthor: displayName,
          activity: 'created this task',
          date: new window.Date().toISOString(),
        },
      ],
      value,
    })
    onSubmit()
  }

  const handleActive = (task) => {
    setActiveIndex(task)
  }

  return (
    <BoardBox onSubmit={(event) => handdleNewTask(event)}>
      <BoardBoxHeader>
        <LabelHead>{t('createTask')}</LabelHead>
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
        handleActive={() => handleActive('todo')}
        title={t('todo')}
        description={t('addNewTaskTodoDescription')}
        isActive={activeIndex === 'todo'}
      ></Status>
      <Status
        handleActive={() => handleActive('in progress')}
        title={t('inProgress')}
        description={t('addNewTaskInProgressDescription')}
        isActive={activeIndex === 'in progress'}
      ></Status>
      <Status
        handleActive={() => handleActive('done')}
        title={t('done')}
        description={t('addNewTaskDoneDescription')}
        isActive={activeIndex === 'done'}
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
