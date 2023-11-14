import React from 'react'
import styled from 'styled-components'

const TextIntro = ({ children }) => {
  return <ParaIntro>{children}</ParaIntro>
}

export default TextIntro

const ParaIntro = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.colorTextSecondary};
  text-align: center;
  max-width: 400px;
  line-height: 1.4;
`
