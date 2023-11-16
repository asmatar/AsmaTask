import React, { useState } from 'react'
import Modal from './Modal'

const MainComponent = () => {
  const [showModal, setShowModal] = useState(false)
  const [showOverlay, setShowOverlay] = useState(false)
  const handleToggleModal = () => {
    setShowModal(!showModal)
    setShowOverlay(!showModal) // Toggle the overlay state as well
  }

  return (
    <div>
      <button onClick={handleToggleModal}>Open Modal</button>
      {showModal && (
        <Modal>
          <div>This is the modal content.</div>
        </Modal>
      )}
      {/* Other content */}
    </div>
  )
}

export default MainComponent
