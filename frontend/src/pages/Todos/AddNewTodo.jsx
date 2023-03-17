import { useState, useEffect, useContext } from 'react'

import './AddNewTodo.scss'

import FormLabel from '@/components/Forms/Helpers/FormLabel'
import Checkbox from '@/components/Checkbox'
import Button from '@/components/Button'
import useApi from '@/hooks/useApi'
import { completeAllTodoURL, createTodoURL } from '@/router/apiEndpoint'
import UiContext from '@/context/UiContext'

const AddNewTodo = ( { allCompleted, refreshTodos } ) => {
  const { mutate, isLoading, isSuccess } = useApi( 'post', createTodoURL )

  const { mutate: markAllComplete, isSuccess: markedAllComplete } = useApi(
    'post',
    completeAllTodoURL,
  )

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

  useEffect( () => {
    if ( markedAllComplete ) {
      refreshTodos()
      setToast( {
        message: 'Marked all as complete',
        type: 'info',
      } )
    }
  }, [ markedAllComplete ] )

  const saveTodo = () => {
    if ( !title ) return
    setTitle( '' )
    mutate( { title } )
  }

  const handleKeyUp = ( e ) => {
    if ( 13 === e.keyCode ) {
      saveTodo()
    }
  }

  return (
    <div className='add-todo'>
      <Checkbox checked={ allCompleted } onChange={ () => markAllComplete() } />

      <FormLabel name='todo' field='Add New Todo'>
        <input
          type='text'
          placeholder='Add New Todo'
          value={ title }
          onChange={ ( e ) => setTitle( e.target.value ) }
          onKeyUp={ handleKeyUp }
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
