import React from 'react'
import styled from 'styled-components'
const Board = () => {
  return (
    <Main>
      <Column>
        <ColumnHeader>
          <Title2>ToDo</Title2>
          <TaskAmount>3</TaskAmount>
        </ColumnHeader>
        <Tasks>
          <TaskTitle>welcome to the stream / task component</TaskTitle>
          <TaskDelete>x</TaskDelete>
        </Tasks>
        <AddTaskButton>+</AddTaskButton>
      </Column>
      <Column>
        <ColumnHeader>
          <Title2>In progress</Title2>
          <TaskAmount>3</TaskAmount>
        </ColumnHeader>
        <Tasks>
          <TaskTitle>welcome to the stream / task component</TaskTitle>
          <TaskDelete>x</TaskDelete>
        </Tasks>
        <AddTaskButton>+</AddTaskButton>
      </Column>
      <Column>
        <ColumnHeader>
          <Title2>Done</Title2>
          <TaskAmount>3</TaskAmount>
        </ColumnHeader>
        <Tasks>
          <TaskTitle>welcome to the stream / task component</TaskTitle>
          <TaskDelete>x</TaskDelete>
        </Tasks>
        <AddTaskButton>+</AddTaskButton>
      </Column>
    </Main>
  )
}

export default Board

const TaskTitle = styled.h2``
const Main = styled.main`
  display: grid;
  grid-template-columns: repeat(3, minmax(100px, 450px));
  justify-content: center;
  margin: 80px auto 0;
  gap: 30px;
  height: auto;
  min-height: auto;
  width: 80%;
  max-width: 1200px;
`
const Column = styled.div`
  background-color: #ffffff55;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  padding: 15px 10px;
  gap: 15px;
`
const Title2 = styled.h2`
  font-weight: bold;
`
const ColumnHeader = styled.div`
  display: flex;
  justify-content: space-between;
`
const TaskAmount = styled.div`
  width: 15px;
  height: 15px;
  background-color: #ffffffa4;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  padding: 3px;
`
const Tasks = styled.div`
  background-color: white;
  padding: 20px 15px;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: start;
`
const AddTaskButton = styled.button`
  background-color: green;
  border-radius: 100%;
  width: 20px;
  height: 20px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: end;
  border: none;
  outline: none;
  padding: 3px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
`

const TaskDelete = styled(AddTaskButton)`
  background-color: red;
  align-self: start;
`
