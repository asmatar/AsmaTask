import React from 'react'
import styled from 'styled-components'
import { deleteTaskFromFirebase } from '@/Services/API-firebase'
import useLocalStorage from '@/Hooks/useLocalStorage'
import Delete from '@/assets/images/icons/delete.svg'
const TaskCard = ({ title, id, boardId, onClick, innerRef, ...props }) => {
  const [value] = useLocalStorage('theme', `light`)

  return (
    <Tasks onClick={onClick} ref={innerRef} {...props}>
      <div {...props.dragHandleProps}></div>
      <TaskTitle>{title}</TaskTitle>
      <TaskDelete onClick={() => deleteTaskFromFirebase(id, boardId, value)}>
        <Del src={Delete} alt="delete a task"></Del>
      </TaskDelete>
    </Tasks>
  )
}

export default TaskCard
const Del = styled.img``
const TaskTitle = styled.h2`
  color: ${({ theme }) => theme.colorBlackWhite};
`
const Tasks = styled.div`
  background-color: ${({ theme }) => theme.colorWhiteBlack};
  padding: 20px 15px;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: start;
  cursor: pointer;
`
const TaskDelete = styled.button`
  border-radius: 100%;
  width: 20px;
  height: 20px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  outline: none;
  padding: 3px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  align-self: start;
  cursor: pointer;
`
