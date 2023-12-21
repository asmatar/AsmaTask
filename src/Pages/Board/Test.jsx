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
  selectAllTasks,
} from '@/RTK/reducers/tasksReducer'
import { fetchTaskByBoards } from '@/Services/API-firebase'

import ColumnList from '@/Components/Board/ColumnList'
import TaskCard from '@/Components/Board/TaskCard'
import Spinner from '@/Components/UI/Spinner'
import Modal from '@/components//Modal/Modal'
import AddNewTask from '@/Components/Board/AddNewTask'
import TaskDetail from '../../Components/TaskDetail/TaskDetail'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { useTranslation } from 'react-i18next'

const Test = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { t } = useTranslation('global')
  const todoTask = useSelector(selectTodotask)
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
  /* const todos = todoTask?.map((task, index) => {
    console.log(task)
    return (
      <Draggable key={task.id} draggableId={task.id} index={index}>
        {(provided) => (
          <Modal key={task.id}>
            <Modal.Open opens="task-detail">
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
  }) */
  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="board" direction="horizontal" type="column">
          {(provided) => (
            <Main ref={provided.innerRef} {...provided.droppableProps}>
              <Draggable draggableId="todo" index={0}>
                {(provided) => (
                  <>
                    {/_ {col} _/}
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
                  </>
                )}
              </Draggable>
              <Draggable draggableId="progress" index={1}>
                {(provided) => (
                  <Column
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <ColumnHeader>
                      <Title2>{t('progress')}</Title2>
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
                        <AddNewTask columnName="progress"></AddNewTask>
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

export default Test
