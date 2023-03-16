import { useContext } from 'react'
import jwtDecode from 'jwt-decode'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'

import AuthContext from '@/context/AuthContext'
import httpClient from '@/hooks/useApi/httpClient'
import Form from '@/components/Forms/Form'
import { loginURL } from '@/router/apiEndpoint'

import LoginForm from './LoginForm'

const Login = ( { goToSignUp } ) => {
  const navigate = useNavigate()
  const { setUserData } = useContext( AuthContext )

  const onSuccess = async ( responseData ) => {
    /* eslint-disable-next-line max-len */
    // set jwt cookies
    const tokenExpires = new Date(
      jwtDecode( responseData.token ).exp * 1000,
    )

    Cookies.set( 'Authorization', `Bearer ${ responseData.token }`, { expires: tokenExpires } )

    httpClient.defaults.headers[
      'Authorization'
    ] = `Bearer ${ responseData.token }`

    setUserData( { info: responseData.user } )

    navigate( '/todos' )
  }

  return (
    <>
      <div>
        <h1>Todos</h1>

        <Form
          method='post'
          endpoint={ loginURL }
          onSuccess={ onSuccess }
          showOnlyToastErrors={ true }
          FormBody={ ( props ) =>
            LoginForm( {
              ...props,
              goToSignUp,
            } )
          }
        />
      </div>
    </>
  )
}

export default Login
