import { useEffect } from 'react'

import { CloseIcon } from '@/assets/icons'

import Checkbox from '@/components/Checkbox'
import Icon from '@/components/Icon'
import useApi, { UseInvalidateEndpoint } from '@/hooks/useApi'
import { deleteTodoURL, listTodosURL, updateTodoURL } from '@/router/apiEndpoint'
import classNames from 'classnames'

const Todo = ( { title, isCompleted, _id: id } ) => {
  const { mutate: deleteTodo } = useApi( 'delete', deleteTodoURL )

  const { mutate: updateTodo, isSuccess: todoUpdated } = useApi( 'put', updateTodoURL( id ) )

  const refreshTodos = UseInvalidateEndpoint( listTodosURL )

  useEffect( () => {
    if ( todoUpdated ) {
      refreshTodos()
    }
  }, [ todoUpdated ] )

  const toggleComplete = () => {
    updateTodo( {
      isCompleted: !isCompleted,
      title,
    } )
  }

  return (
    <div className={ classNames( 'todo', { checked: isCompleted } ) }>
      <Checkbox small checked={ isCompleted } onChange={ toggleComplete }/>

      <h5 className='title'>{title}</h5>

      <Icon
        IconComponent={ CloseIcon }
        className='danger md pointer'
        onClick={ () => deleteTodo( id ) }
      />
    </div>
  )
}

export default Todo
