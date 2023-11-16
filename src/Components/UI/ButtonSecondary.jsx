import React from 'react'
import styled from 'styled-components'
const ButtonSecondary = ({ children, onClick }) => {
  return (
    <Button onClick={onClick}>
      <Span>{children}</Span>
    </Button>
  )
}

export default ButtonSecondary

const Span = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.051);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  border-top: 1px solid rgba(250, 52, 52, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  z-index: 10;
  color: #fff;
  border-radius: 10px;
  font-weight: 400;
  letter-spacing: 1px;
  text-decoration: none;
  transition: 0.3s;
  overflow: hidden;
  backdrop-filter: blur(15px);
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 50%;
    height: 100%;
    background: linear-gradient(
      to left,
      rgba(255, 255, 255, 0.149),
      transparent
    );
    transform: skewX(45deg);
    transition: 0.5s;
    transition-delay: 0.3s;
    &:hover::before {
      transform: skewX(45deg) translateX(200%);
      transition-delay: 0s;
    }
  }
`
const Button = styled.button`
  position: relative;
  width: 100%;
  height: 50px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  &:hover > ${Span} {
    letter-spacing: 3px;
  }
  &::before {
    content: '';
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    background: #ff0461;
    bottom: -5px;
    width: 30px;
    height: 10px;
    border-radius: 10px;
    transition: 0.5s;
    transition-delay: 0s;
  }
  &:hover::before {
    bottom: 0px;
    height: 50%;
    width: 80%;
    border-radius: 30px;
    transition-delay: 0.3s;
  }
  &:after {
    content: '';
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    background: #ff0461;
    top: -5px;
    width: 30px;
    height: 10px;
    border-radius: 10px;
    transition: 0.5s;
    transition-delay: 0s;
  }
  &:hover::after {
    top: 0px;
    height: 50%;
    width: 80%;
    border-radius: 30px;
    transition-delay: 0.3s;
  }
  &:nth-child(1):before,
  &:nth-child(1):after {
    background: #ff1f72;
    box-shadow:
      0 0 5px #ff1f72,
      0 0 15px #ff1f72,
      0 0 30px #ff1f72,
      0 0 60px #ff1f72;
  }

  &:nth-child(2):before,
  &:nth-child(2):after {
    background: #ff1f72;
    box-shadow:
      0 0 5px #ff1f72,
      0 0 15px #ff1f72,
      0 0 30px #ff1f72,
      0 0 60px #ff1f72;
  }

  &:nth-child(3):before,
  &:nth-child(3):after {
    background: #ff1f72;
    box-shadow:
      0 0 5px #ff1f72,
      0 0 15px #ff1f72,
      0 0 30px #ff1f72,
      0 0 60px #ff1f72;
  }
`
