import { HttpError } from '@web/core/http'
import { Api, Model } from '@web/domain'
import { useState } from 'react'
import { AuthenticationHook } from '../authentication.hook'
import { useSnackbar } from 'notistack'

interface Return {
  register: (values: Partial<Model.User>) => Promise<void>
  isLoading: boolean
  isSuccess: boolean
  errors: string[]
}

export const useAuthenticationRegister = (): Return => {
  const [isLoading, setLoading] = useState(false)
  const [isSuccess, setSuccess] = useState(false)
  const [errors, setErrors] = useState<string[]>([])
  const { enqueueSnackbar } = useSnackbar()

  const authenticationToken = AuthenticationHook.useToken()

  const register = async (values: Partial<Model.User>) => {
    setLoading(true)

    setErrors([])

    try {
      const result = await Api.Authentication.register(values)

      enqueueSnackbar(result.message, {
        variant: 'success',
      })
      setSuccess(true)
      setLoading(false)
    } catch (error) {
      const code = HttpError.getCode(error)

      const isIncorrect = code === 3

      if (isIncorrect) {
        setErrors(['This email is not available'])
      } else {
        const messages = HttpError.getValidationMessages(error)
        if (messages.length > 0) {
          setErrors(messages)
        } else {
          setErrors(['Something went wrong'])
        }
      }
    } finally {
      setLoading(false)
    }

    setLoading(false)
  }

  return {
    register,
    isLoading,
    isSuccess,
    errors,
  }
}
