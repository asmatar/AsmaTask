/* eslint-disable react/display-name */
import styled from 'styled-components'
import React from 'react'

const Overlay = React.forwardRef(({ onClick }, ref) => {
  return <ModalOverlay onClick={onClick} ref={ref} />
})

export default Overlay

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  backdrop-filter: blur(5px);
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  animation: fadeIn 0.5s;
`
