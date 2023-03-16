import { useContext } from 'react'

import Form from '@/components/Forms/Form'
import { signupURL } from '@/router/apiEndpoint'
import UiContext from '@/context/UiContext'

import SignupForm from './SignupForm'

const Signup = ( { goToLogin } ) => {
  const { setToast } = useContext( UiContext )

  const onSuccess = () => {
    setToast( {
      message: 'Account created successfully!',
      type: 'success',
    } )
    goToLogin()
  }

  return (
    <div className='content signup'>
      <h3 className='card-header'>Register</h3>

      <Form
        method='post'
        endpoint={ signupURL }
        onSuccess={ onSuccess }
        FormBody={ ( props ) => <SignupForm { ...props } goToLogin={ goToLogin } /> }
      />
    </div>
  )
}

export default Signup
