import React, { useEffect } from 'react'
import { useParams, NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Back from '@/assets/images/icons/back.svg'
import add from '@/assets/images/icons/add.svg'
import styled from 'styled-components'
import useSWR from 'swr'
import { onSnapshot, collection } from 'firebase/firestore'
import { db } from '@/firebase-config'
import {
  selectDonetask,
  selectProgresstask,
  selectTodotask,
} from '@/RTK/reducers/tasksReducer'
import { fetchTaskByBoards } from '@/Services/API-firebase'

import TaskCard from '@/Components/Board/TaskCard'
import Spinner from '@/Components/UI/Spinner'
import Modal from '@/components//Modal/Modal'
import AddNewTask from '@/Components/Board/AddNewTask'
import TaskDetail from '../../Components/TaskDetail/TaskDetail'
/* import useLocalStorage from '@/Hooks/useLocalStorage' */
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { useTranslation } from 'react-i18next'

const Board = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { t } = useTranslation('global')
  /*   const [theme] = useLocalStorage('theme', `light`) */
  const todoTask = useSelector(selectTodotask)
  const inprogressTask = useSelector(selectProgresstask)
  const doneTask = useSelector(selectDonetask)

  const todos = todoTask?.map((task, index) => {
    console.log(task)
    return (
      <Draggable key={task.id} draggableId={task.id} index={index}>
        {(provided) => (
          <Modal key={task.id}>
            <Modal.Open opens="task-detail">
              {/* <AddTaskButton> */}
              <TaskCard
                title={task.title}
                id={task.id}
                boardId={task.boardsId}
                date={task.date}
                key={task.id}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                innerRef={provided.innerRef}
              />
              {/* </AddTaskButton> */}
            </Modal.Open>
            <Modal.Window name="task-detail">
              <TaskDetail
                columnName="done"
                title={task.title}
                id={task.id}
                boardId={task.boardsId}
                status={task.status}
                author={task.author}
                date={task.date}
                activities={task.activities}
              ></TaskDetail>
            </Modal.Window>
          </Modal>
        )}
      </Draggable>
    )
  })
  const progress = inprogressTask?.map((task, index) => {
    return (
      <Draggable key={task.id} draggableId={task.id} index={index}>
        {(provided) => (
          <Modal key={task.id}>
            <Modal.Open opens="task-detail">
              <TaskCard
                title={task.title}
                id={task.id}
                /*                 date={task.date} */
                boardId={task.boardsId}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                innerRef={provided.innerRef}
              />
            </Modal.Open>
            <Modal.Window name="task-detail">
              <TaskDetail
                columnName="done"
                title={task.title}
                id={task.id}
                boardId={task.boardsId}
                status={task.status}
                author={task.author}
                /*                 date={task.date} */
                activities={task.activities}
              ></TaskDetail>
            </Modal.Window>
          </Modal>
        )}
      </Draggable>
    )
  })
  const done = doneTask?.map((task, index) => {
    return (
      <Draggable key={task.id} draggableId={task.id} index={index}>
        {(provided) => (
          <Modal key={task.id}>
            <Modal.Open opens="task-detail">
              <TaskCard
                title={task.title}
                id={task.id}
                boardId={task.boardsId}
                /*                 date={task.date} */
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                innerRef={provided.innerRef}
              />
            </Modal.Open>
            <Modal.Window name="task-detail">
              <TaskDetail
                columnName="done"
                title={task.title}
                id={task.id}
                boardId={task.boardsId}
                status={task.status}
                author={task.author}
                /*                 date={task.date} */
                activities={task.activities}
              ></TaskDetail>
            </Modal.Window>
          </Modal>
        )}
      </Draggable>
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
  const onDragEnd = (results) => {
    console.log(results)
    const { source, destination, type } = results
    if (!destination) return
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return

    if (type === 'column') {
      /*  dispatch(moveColumn({ source, destination })) */
    }
    if (type === 'task') {
      /* dispatch(moveTask({ source, destination })) */
    }
  }
  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="board" direction="horizontal" type="column">
          {(provided) => (
            <Main ref={provided.innerRef} {...provided.droppableProps}>
              <Draggable draggableId="todo" index={0}>
                {(provided) => (
                  <Column
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <ColumnHeader>
                      <Title2>{t('todo')}</Title2>
                      <TaskAmount>{todoTask?.length || 0}</TaskAmount>
                    </ColumnHeader>
                    <Droppable droppableId="todos" type="task">
                      {(provided) => (
                        <TaskContainer
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                        >
                          {todos}
                          {provided.placeholder}
                        </TaskContainer>
                      )}
                    </Droppable>
                    <Modal>
                      <Modal.Open opens="new-task">
                        <AddTaskButton>
                          <Add src={add} alt="add task" />
                        </AddTaskButton>
                      </Modal.Open>
                      <Modal.Window name="new-task">
                        <AddNewTask columnName="todo"></AddNewTask>
                      </Modal.Window>
                    </Modal>
                  </Column>
                )}
              </Draggable>
              <Draggable draggableId="inprogress" index={1}>
                {(provided) => (
                  <Column
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <ColumnHeader>
                      <Title2>{t('inProgress')}</Title2>
                      <TaskAmount>{inprogressTask?.length || 0}</TaskAmount>
                    </ColumnHeader>
                    <Droppable droppableId="progress" type="task">
                      {(provided) => (
                        <TaskContainer
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                        >
                          {progress}
                          {provided.placeholder}
                        </TaskContainer>
                      )}
                    </Droppable>
                    <Modal>
                      <Modal.Open opens="new-task">
                        <AddTaskButton>
                          <Add src={add} alt="add task" />
                        </AddTaskButton>
                      </Modal.Open>
                      <Modal.Window name="new-task">
                        <AddNewTask columnName="in progress"></AddNewTask>
                      </Modal.Window>
                    </Modal>
                  </Column>
                )}
              </Draggable>
              <Draggable draggableId="done" index={2}>
                {(provided) => (
                  <Column
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <ColumnHeader>
                      <Title2>{t('done')}</Title2>
                      <TaskAmount>{doneTask?.length || 0}</TaskAmount>
                    </ColumnHeader>
                    <Droppable droppableId="done" type="task">
                      {(provided) => (
                        <TaskContainer
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                        >
                          {done}
                          {provided.placeholder}
                        </TaskContainer>
                      )}
                    </Droppable>
                    <Modal>
                      <Modal.Open opens="new-task">
                        <AddTaskButton>
                          <Add src={add} alt="add task" />
                        </AddTaskButton>
                      </Modal.Open>
                      <Modal.Window name="new-task">
                        <AddNewTask columnName="done"></AddNewTask>
                      </Modal.Window>
                    </Modal>
                  </Column>
                )}
              </Draggable>
              {provided.placeholder}
            </Main>
          )}
        </Droppable>
      </DragDropContext>
      <NavLink to="/boards">
        <BackButton>
          <BackImg src={Back} alt="back to boards" />
          <Span>{t('backToBoards')}</Span>
        </BackButton>
      </NavLink>
    </>
  )
}

export default Board
/* const NewModal = styled.div`` */
/* const Navlink = styled(NavLink)`` */
const TaskContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`
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
const Add = styled.img`
  width: 25px;
  transition: all 0.4s ease-in;
  &:hover {
    rotate: 180deg;
  }
`
const BackImg = styled.img``
const Span = styled.span`
  color: ${({ theme }) => theme.colorBlackWhite};
`
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
  box-shadow:
    rgba(0, 0, 0, 0.04) 0px 20px 25px -5px,
    rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;
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
