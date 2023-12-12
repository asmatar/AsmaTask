import React, { useRef } from 'react'
import styled from 'styled-components'
import ButtonSecondary from '@/components/UI/ButtonSecondary'
import { useTranslation } from 'react-i18next'
import { useUserAuth } from '@/Context/authContext'
import { addNewBoard } from '@/Services/API-firebase'
import { useSelector } from 'react-redux'
import { loadingBoards } from '@/RTK/reducers/boardsReducer'
import Spinner from '@/Components/UI/Spinner'

const AddBoard = ({ onSubmit }) => {
  const { t } = useTranslation('global')
  const {
    user: { displayName },
  } = useUserAuth()
  const boardName = useRef(null)
  const isLoading = useSelector(loadingBoards)

  const handleAddNewBoard = (event) => {
    event.preventDefault()
    console.log(displayName)
    addNewBoard({
      boardName: boardName.current?.value,
      displayName,
    })
    onSubmit()
  }

  return (
    <>
      <BoardBox onSubmit={(event) => handleAddNewBoard(event)}>
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
            ref={boardName}
          />
          <Label htmlFor="name">{t('boardName')}</Label>
        </FormGroup>
        {isLoading ? (
          <Spinner />
        ) : (
          <ButtonSecondary type="submit">{t('create')}</ButtonSecondary>
        )}
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

const BoardBox = styled.form`
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
