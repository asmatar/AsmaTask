import React from 'react'
import styled from 'styled-components'

const PageTitle = () => {
  return <BigTitle>AsmaTask</BigTitle>
}

export default PageTitle
const BigTitle = styled.h1`
  color: ${({ theme }) => theme.colorBlue};
  font-size: 34px;
  font-weight: 600;
  text-align: center;
  margin-top: 50px;
`
