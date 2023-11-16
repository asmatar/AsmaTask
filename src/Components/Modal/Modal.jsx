import styled from 'styled-components'
import Overlay from './Overlay'
import { createPortal } from 'react-dom'
import { useEffect, useRef } from 'react'
const Modal = ({ children, setIsOpenModal }) => {
  const ref = useRef(null)

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && ref.current.contains(e.target)) {
        setIsOpenModal(false)
      }
    }
    document.addEventListener('click', handleClick, true)
    return () => document.removeEventListener('click', handleClick, true)
  }, [setIsOpenModal])

  return createPortal(
    <>
      <ModalWrapper>{children}</ModalWrapper>
      <Overlay ref={ref}> </Overlay>
    </>,
    document.body
  )
}

export default Modal

const ModalWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  transition: all 0.5s;
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
