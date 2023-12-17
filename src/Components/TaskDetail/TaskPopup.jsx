import React from 'react'
import Modal from '@/components//Modal/Modal'
import TaskDetail from './TaskDetail'

const TaskPopup = () => {
  return (
    <Modal>
      <Modal.Open opens="new-board">
        <AddTaskButton>
          <Add src={add} alt="add task" />
        </AddTaskButton>
      </Modal.Open>
      <Modal.Window name="new-board">
        <TaskDetail columnName="done"></TaskDetail>
      </Modal.Window>
    </Modal>
  )
}

export default TaskPopup
