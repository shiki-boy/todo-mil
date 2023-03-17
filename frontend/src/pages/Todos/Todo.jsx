import { useEffect, useState } from 'react'
import classNames from 'classnames'

import { CloseIcon } from '@/assets/icons'

import Checkbox from '@/components/Checkbox'
import Icon from '@/components/Icon'
import useApi, { UseInvalidateEndpoint } from '@/hooks/useApi'
import {
  deleteTodoURL,
  listTodosURL,
  updateTodoURL,
} from '@/router/apiEndpoint'
import useOnClickOutside from '@/hooks/useOnClickOutside'

const Todo = ( { title, isCompleted, _id: id } ) => {
  const { mutate: deleteTodo } = useApi( 'delete', deleteTodoURL )

  const { mutate: updateTodo, isSuccess: todoUpdated } = useApi(
    'put',
    updateTodoURL( id ),
  )

  const refreshTodos = UseInvalidateEndpoint( listTodosURL )

  const [ isEdit, setIsEdit ] = useState( false )

  const titleInputRef = useOnClickOutside( () => setIsEdit( false ) )

  useEffect( () => {
    if ( todoUpdated ) {
      refreshTodos()
      setIsEdit( false )
    }
  }, [ todoUpdated ] )

  const toggleComplete = () => {
    updateTodo( {
      isCompleted: !isCompleted,
      title,
    } )
  }

  const handleEdit = () => {
    setIsEdit( ( old ) => !old )
  }

  const handleKeyUp = ( e ) => {
    if ( 13 === e.keyCode ) {
      updateTodo( {
        isCompleted,
        title: e.target.value,
      } )
    }
  }

  return (
    <div className={ classNames( 'todo', { checked: isCompleted } ) }>
      <Checkbox small checked={ isCompleted } onChange={ toggleComplete } />

      {isEdit ? (
        <input
          className='title'
          type='text'
          defaultValue={ title }
          onKeyUp={ handleKeyUp }
          ref={ titleInputRef }
        />
      ) : (
        <h5 className='title' onClick={ handleEdit }>
          {title}
        </h5>
      )}

      <Icon
        IconComponent={ CloseIcon }
        className='danger md pointer'
        onClick={ () => deleteTodo( id ) }
      />
    </div>
  )
}

export default Todo
