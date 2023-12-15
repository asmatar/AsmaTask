import React, { useEffect } from 'react'
import { useParams, NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import useSWR from 'swr'
import { onSnapshot, collection } from 'firebase/firestore'
import { db } from '@/firebase-config'
import {
  selectDonetask,
  selectProgresstask,
  selectTodotask,
} from '@/RTK/reducers/tasksReducer'
import TaskCard from '../../Components/Board/TaskCard'
import Spinner from '@/Components/UI/Spinner'
import Modal from '@/components//Modal/Modal'
import AddNewTask from '../../Components/Board/AddNewTask'
import Back from '@/assets/images/icons/back.svg'
import { fetchTaskByBoards } from '@/Services/API-firebase'

/* import { useTranslation } from 'react-i18next' */

const Board = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  /*   const { t } = useTranslation('global') */

  const todoTask = useSelector(selectTodotask)
  const inprogressTask = useSelector(selectProgresstask)
  const doneTask = useSelector(selectDonetask)

  const todos = todoTask?.map((task) => {
    return (
      <TaskCard
        key={task.id}
        title={task.title}
        id={task.id}
        boardId={task.boardsId}
      />
    )
  })
  const progress = inprogressTask?.map((task) => {
    return (
      <TaskCard
        key={task.id}
        title={task.title}
        id={task.id}
        boardId={task.boardsId}
      />
    )
  })
  const done = doneTask?.map((task) => {
    return (
      <TaskCard
        key={task.id}
        title={task.title}
        id={task.id}
        boardId={task.boardsId}
      />
    )
  })
  const { data, error } = useSWR(
    'tasks',
    () => dispatch(fetchTaskByBoards(id)),
    {
      revalidateOnMount: true,
      revalidateOnFocus: true,
    }
  )

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'boards', id, 'tasks'),
      () => {
        // Dispatch your action to update state
        dispatch(fetchTaskByBoards(id))
      },
      (error) => {
        // Handle errors here
        console.error('Error fetching tasks:', error)
      }
    )

    return () => {
      unsubscribe() // Unsubscribe from the onSnapshot listener when the component unmounts
    }
  }, [dispatch, id])

  if (error) {
    return <div>{error.message}</div>
  }
  if (!data) {
    return <Spinner />
  }
  /*   const handleCreateTask = () => {
    console.log('create task')
  } */
  console.log(todos)
  return (
    <>
      <Main>
        <Column>
          <ColumnHeader>
            <Title2>ToDo</Title2>
            <TaskAmount>{todoTask?.length || 0}</TaskAmount>
          </ColumnHeader>
          {todos}
          <Modal>
            <Modal.Open opens="new-board">
              <AddTaskButton /* onClick={handleCreateTask} */>+</AddTaskButton>
            </Modal.Open>
            <Modal.Window name="new-board">
              <AddNewTask></AddNewTask>
            </Modal.Window>
          </Modal>
        </Column>
        <Column>
          <ColumnHeader>
            <Title2>In progress</Title2>
            <TaskAmount>{inprogressTask?.length || 0}</TaskAmount>
          </ColumnHeader>
          {progress}
          <Modal>
            <Modal.Open opens="new-board">
              <AddTaskButton /* onClick={handleCreateTask} */>+</AddTaskButton>
            </Modal.Open>
            <Modal.Window name="new-board">
              <AddNewTask></AddNewTask>
            </Modal.Window>
          </Modal>
        </Column>
        <Column>
          <ColumnHeader>
            <Title2>Done</Title2>
            <TaskAmount>{doneTask?.length || 0}</TaskAmount>
          </ColumnHeader>
          {done}
          <Modal>
            <Modal.Open opens="new-board">
              {/* <AddTaskButton onClick={handleCreateTask}>+</AddTaskButton> */}
              <AddTaskButton /* onClick={handleCreateTask} */>+</AddTaskButton>
            </Modal.Open>
            <Modal.Window name="new-board">
              <AddNewTask></AddNewTask>
            </Modal.Window>
          </Modal>
        </Column>
      </Main>
      <NavLink to="/boards">
        <BackButton>
          <BackImg src={Back} alt="back to boards" />
          <Span>Back to boards</Span>
        </BackButton>
      </NavLink>
    </>
  )
}

export default Board
/* const NewModal = styled.div`` */
/* const Navlink = styled(NavLink)`` */
const BackButton = styled.button`
  position: fixed;
  bottom: 30px;
  right: 30px;
  border: none;
  background-color: transparent;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
`
const BackImg = styled.img``
const Span = styled.span``
const Main = styled.main`
  display: grid;
  grid-template-columns: repeat(3, minmax(100px, 450px));
  justify-content: center;
  margin: 80px auto 0;
  padding: 0 10px;
  gap: 30px;
  height: auto;
  min-height: auto;
  max-width: 1500px;
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
  cursor: pointer;
`
const TaskTitle = styled.h2``
const Tasks = styled.div`
  background-color: white;
  padding: 20px 15px;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: start;
`

const TaskDelete = styled(AddTaskButton)`
  background-color: red;
  align-self: start;
`
