import { Fragment } from 'react'

import './Todos.scss'

import { listTodosURL } from '@/router/apiEndpoint'
import useApi, { UseInvalidateEndpoint } from '@/hooks/useApi'
import Loader from '@/components/Loader'

import Todo from './Todo'
import AddNewTodo from './AddNewTodo'

const Todos = () => {
  const { data: todos, isLoading } = useApi( 'getList', listTodosURL )

  const refreshTodos = UseInvalidateEndpoint( listTodosURL )

  if ( isLoading ) {
    return <Loader message='Fetching todos...' />
  }

  return(
    <div className='todos'>
      <AddNewTodo refreshTodos={ refreshTodos }/>

      {0 === todos.length && <p>No todos</p>}

      {todos.filter( ( todo ) => !todo.isCompleted ).map( ( todo ) => (
        <Fragment key={ todo._id }>
          <Todo { ...todo } refreshTodos= { refreshTodos } />
        </Fragment>
      ) )}

      {todos.filter( ( todo ) => todo.isCompleted ).map( ( todo ) => (
        <Fragment key={ todo._id }>
          <Todo { ...todo } refreshTodos={ refreshTodos } />
        </Fragment>
      ) )}
    </div>
  )
}

export default Todos