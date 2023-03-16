import './Todos.scss'

import useApi from '@/hooks/useApi'
import { listTodosURL } from '@/router/apiEndpoint'
import Loader from '@/components/Loader'
import { Fragment } from 'react'
import Todo from './Todo'

const Todos = () => {
  const { data: todos, isLoading } = useApi( 'getList', listTodosURL )

  if ( isLoading ) {
    return <Loader message='Fetching todos...' />
  }

  return(
    <div className='todos'>
      {0 === todos.length && <p>No todos</p>}

      {todos.filter( ( todo ) => !todo.isCompleted ).map( ( todo ) => (
        <Fragment key={ todo._id }>
          <Todo { ...todo } />
        </Fragment>
      ) )}

      {todos.filter( ( todo ) => todo.isCompleted ).map( ( todo ) => (
        <Fragment key={ todo._id }>
          <Todo { ...todo } />
        </Fragment>
      ) )}
    </div>
  )
}

export default Todos