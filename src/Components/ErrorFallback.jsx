import GeneralButton from './UI/GeneralButton'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
const ErrorFallback = ({ error, resetErrorBoundary }) => {
  const { t } = useTranslation('global')

  return (
    <Error>
      <SomethingWentWrong>{t('somethingWrong')}</SomethingWentWrong>
      <ErrorMessage>{error.message}</ErrorMessage>
      <GeneralButton onClick={resetErrorBoundary}>
        {t('tryAgain')}
      </GeneralButton>
    </Error>
  )
}
export default ErrorFallback
const Error = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  margin-top: 100px;
`
const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.colorText};
`
const SomethingWentWrong = styled.span`
  color: ${({ theme }) => theme.colorText};
`
