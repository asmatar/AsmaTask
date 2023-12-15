import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const showSuccessToast = (message, value = 'light') => {
  toast.success(message, {
    position: 'bottom-right',
    autoClose: 1000,
    closeOnClick: true,
    pauseOnHover: false,
    theme: value === 'light' ? 'light' : 'dark',
  })
}

export const showErrorToast = (message, value = 'light') => {
  toast.error(message, {
    position: 'bottom-right',
    autoClose: 1000,
    closeOnClick: true,
    pauseOnHover: false,
    theme: value === 'light' ? 'light' : 'dark',
  })
}
