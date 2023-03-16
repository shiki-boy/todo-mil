import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { camelCase, kebabCase, upperFirst } from 'lodash'

import Login from './Login'
import Signup from './Signup'

const Auth = ( { defaultPage } ) => {
  const navigate = useNavigate()
  const location = useLocation()

  const [ currentPage, setCurrentPage ] = useState( defaultPage )

  useEffect( () => {
    // on url change map the correct component
    const _currentRoute = location.pathname.slice( 1 ).split( '/' ).shift()

    if ( kebabCase( currentPage ) !== _currentRoute ) {
      setCurrentPage( upperFirst( camelCase( _currentRoute ) ) )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ location ] )

  const getComponent = {
    Login() {
      return <Login goToSignUp={ () => navigate( '/signup' ) } />
    },

    Signup() {
      return <Signup goToLogin={ () => navigate( '/login' ) } />
    },
  }

  return getComponent[currentPage]()
}

export default Auth
