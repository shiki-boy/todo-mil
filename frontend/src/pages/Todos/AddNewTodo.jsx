import { useState, useEffect, useContext } from 'react'

import './AddNewTodo.scss'

import FormLabel from '@/components/Forms/Helpers/FormLabel'
import Checkbox from '@/components/Checkbox'
import Button from '@/components/Button'
import useApi from '@/hooks/useApi'
import { createTodoURL } from '@/router/apiEndpoint'
import UiContext from '@/context/UiContext'

const AddNewTodo = ( { allCompleted, refreshTodos } ) => {
  const { mutate, isLoading, isSuccess } = useApi( 'post', createTodoURL )

  const { setToast } = useContext( UiContext )

  const [ title, setTitle ] = useState( '' )

  useEffect( () => {
    if ( isSuccess ) {
      refreshTodos()
      setToast( {
        message: 'New todo added',
        type: 'success',
      } )
    }
  }, [ isSuccess ] )

  const saveTodo = () => {
    mutate( { title } )
  }

  return(
    <div className='add-todo'>
      <Checkbox value={ allCompleted } />

      <FormLabel name='todo' field='Add New Todo'>
        <input
          type='text'
          placeholder='Add New Todo'
          value={ title }
          onChange = { ( e ) => setTitle( e.target.value ) }
        />
      </FormLabel>

      <Button
        title='Add'
        color='primary'
        type='button'
        isLoading={ isLoading }
        onClick={ () => saveTodo() }
      />
    </div>
  )
}

export default AddNewTodo