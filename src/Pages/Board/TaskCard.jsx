import React from 'react'
import styled from 'styled-components'
import { deleteTaskFromFirebase } from '@/Services/API-firebase'
const TaskCard = ({ title, id, boardId }) => {
  return (
    <Tasks>
      <TaskTitle>{title}</TaskTitle>
      <TaskDelete onClick={() => deleteTaskFromFirebase(id, boardId)}>
        x
      </TaskDelete>
    </Tasks>
  )
}

export default TaskCard
const TaskTitle = styled.h2``
const Tasks = styled.div`
  background-color: white;
  padding: 20px 15px;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: start;
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
  background-color: red;
  align-self: start;
  cursor: pointer;
`
