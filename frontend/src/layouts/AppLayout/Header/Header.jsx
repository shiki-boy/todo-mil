import { useContext, useState } from 'react'

import './Header.scss'

import { LogoutIcon } from '@/assets/icons'

import Icon from '@/components/Icon'
import AuthContext from '@/context/AuthContext'
import useLogout from '@/hooks/useLogout'
import useOnClickOutside from '@/hooks/useOnClickOutside'

const Header = () => {
  const { userData } = useContext( AuthContext )

  const { logout } = useLogout()

  const dropdownContainer = useOnClickOutside( () => setShowMenu( false ) )

  const [ showMenu, setShowMenu ] = useState( false )

  return (
    <nav className='header-container'>
      <h4>Todos</h4>

      <img
        className='profile-pic'
        src={ userData.info.profilePic }
        alt='profile-pic'
        onClick={ () => setShowMenu( ( old ) => !old ) }
      />

      {showMenu && (
        <div className='menu' ref={ dropdownContainer }>
          <div onClick={ logout }>
            <Icon IconComponent={ LogoutIcon } />
            Logout
          </div>
        </div>
      )}
    </nav>
  )
}

export default Header
