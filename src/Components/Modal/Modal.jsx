import styled from 'styled-components'
import Overlay from './Overlay'
import { createPortal } from 'react-dom'
import { cloneElement, /* createContext, */ useContext, useState } from 'react'
import { useOutsideClick } from '@/Hooks/useOutsideClick'
import { useTranslation } from 'react-i18next'

/* export const ModalContext = createContext() */
import { ModalContext } from '@/Context/ModalContext'

function Modal({ children }) {
  const [openName, setOpenName] = useState('')
  const close = () => setOpenName('')
  const open = setOpenName

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  )
}
export default Modal

function Open({ children, opens }) {
  const { open } = useContext(ModalContext)

  return cloneElement(children, { onClick: () => open(opens) })
}

function Window({ children, name }) {
  const { t } = useTranslation('global')
  const { openName, close } = useContext(ModalContext)

  const ref = useOutsideClick(close)

  if (name !== openName) return null
  return createPortal(
    <>
      <ModalWrapper>
        <Outer>
          <Inner>
            <LabelBoard onClick={close}> {t('back')}</LabelBoard>
          </Inner>
        </Outer>

        {cloneElement(children, { onSubmit: () => close() })}
      </ModalWrapper>
      <Overlay ref={ref}> </Overlay>
    </>,
    document.body
  )
}

Modal.Open = Open
Modal.Window = Window

const ModalWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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

const Inner = styled.div`
  width: inherit;
  text-align: center;
  &::before,
  &::after {
    position: absolute;
    content: '';
    height: 1px;
    width: inherit;
    background: ${({ theme }) => theme.colorModal};
    left: 0;
    transition: all 0.3s ease-in;
  }

  &::before {
    top: 50%;
    transform: rotate(45deg);
  }
  &::after {
    bottom: 50%;
    transform: rotate(135deg);
  }
`
const LabelBoard = styled.div`
  font-size: 0.8em;
  line-height: 4em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colorModal};
  transition: all 0.3s ease-in;
  opacity: 0;
  cursor: pointer;
`
const Outer = styled.div`
  position: absolute;
  top: 0;
  right: 2.7rem;
  z-index: 2;
  width: 30px;
  cursor: pointer;
  &:hover > ${Inner}::before, &:hover > ${Inner}::after {
    transform: rotate(0);
  }
  &:hover > ${Inner}::before {
    top: 7px;
  }
  &:hover > ${Inner}::after {
    bottom: 7px;
  }
  &:hover > ${Inner} > ${LabelBoard} {
    color: ${({ theme }) => theme.colorModal};
    opacity: 1;
  }
`
