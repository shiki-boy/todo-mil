import { useFormContext } from 'react-hook-form'
import classNames from 'classnames'

import './SignupForm.scss'

import Button from '@/components/Button'
import FormLabel from '@/components/Forms/Helpers/FormLabel'
import Password from '@/components/Password'

const SignupForm = ( { isLoading, goToLogin } ) => {
  const { register, formState, getValues } = useFormContext()

  return (
    <div className='signup-form'>
      <FormLabel name='firstName' field='First Name' required>
        <div className='input-field-container'>
          <input
            type='text'
            { ...register( 'firstName', { required: 'This field is required' } ) }
            placeholder='First Name'
            className={ classNames( 'full-width', formState.errors?.firstName && 'error' ) }
          />
        </div>
      </FormLabel>

      <FormLabel name='lastName' field='Last Name' required>
        <div className='input-field-container'>
          <input
            type='text'
            { ...register( 'lastName', { required: 'This field is required' } ) }
            placeholder='Last Name'
            className={ formState.errors?.lastName && 'error' }
          />
        </div>
      </FormLabel>

      <FormLabel name='email' field='Email Address' required>
        <div className='input-field-container'>
          <input
            type='email'
            { ...register( 'email', { required: 'This field is required' } ) }
            placeholder='Email Address'
            className={ formState.errors?.email && 'error' }
          />
        </div>
      </FormLabel>

      <Password
        placeholder='Password'
        field='Password'
        { ...register( 'password', {
          minLength: {
            message: 'Password should be minimum 8 characters',
            value: 8,
          },
          required: 'This field is required',
        } ) }
      />

      <Password
        placeholder='Confirm Password'
        field='Confirm Password'
        { ...register( 'password2', {
          required: 'This field is required',
          validate: {
            same: ( val ) =>
              val === getValues( 'password' ) || "Passwords doesn't match",
          },
        } ) }
      />

      <Button
        title='Sign Up'
        color='primary'
        type='submit'
        isLoading={ isLoading }
      />

      <Button
        title='Go to login'
        color='tertiary login-btn'
        type='button'
        onClick={ goToLogin }
        style={ { margin: 0 } }
      />
    </div>
  )
}

export default SignupForm
