import { useCallback } from 'react'
import * as yup from 'yup'

const useYupValidationResolver = (schema, t) =>
  /*   const { lng } = UseI18n() */
  useCallback(
    async (data) => {
      try {
        const values = await schema.validate(data, {
          abortEarly: false,
        })
        return {
          values,
          errors: {},
        }
      } catch (errors) {
        return {
          values: {},
          errors: errors.inner.reduce(
            (allErrors, currentError) => ({
              ...allErrors,
              [currentError.path]: {
                type: currentError.type ?? 'validation',
                message: t(currentError.message),
              },
            }),
            {}
          ),
        }
      }
    },
    [schema, t]
  )

const schema = yup.object().shape({
  email: yup.string().email('errorEmailEmail').required('errorEmailRequired'),
  password: yup
    .string()
    .required('errorPasswordRequired')
    .matches(/^(?=.*\d)(?=.*[A-Z]).{7,14}$/, 'errorPasswordMatch'),
})
export { schema }
export default useYupValidationResolver
