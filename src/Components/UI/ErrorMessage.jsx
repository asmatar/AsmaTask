import React from 'react'
import styled from 'styled-components'
const ErrorMessage = ({ message }) => {
  return <ErrorMessages>{message}</ErrorMessages>
}

export default ErrorMessage
const ErrorMessages = styled.p`
  margin-top: 5px;
  color: red;
  font-size: 13px;
  text-transform: lowercase;
  &::first-letter {
    text-transform: uppercase;
  }
`
