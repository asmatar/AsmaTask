import { useCallback } from 'react'
import * as yup from 'yup'

const useYupValidationResolver = (schema) =>
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
                message: currentError.message,
              },
            }),
            {}
          ),
        }
      }
    },
    [schema]
  )

const schema = yup.object().shape({
  email: yup
    .string()
    .email('email must be valid')
    .required('email is required'),
  password: yup
    .string()
    .required('password is required')
    .matches(
      /^(?=.*\d)(?=.*[A-Z]).{7,14}$/,
      'Password should have at least one uppercase letter, one number, between 7 and 14 characters'
    ),
})
export { schema }
export default useYupValidationResolver
