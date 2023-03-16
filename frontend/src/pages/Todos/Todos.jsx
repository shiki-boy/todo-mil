import { useMemo } from 'react'

import './Todos.scss'

import { listTodosURL } from '@/router/apiEndpoint'
import useApi, { UseInvalidateEndpoint } from '@/hooks/useApi'
import Loader from '@/components/Loader'

import Todo from './Todo'
import AddNewTodo from './AddNewTodo'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

const Todos = () => {
  const { data: todos, isLoading } = useApi( 'getList', listTodosURL )

  const refreshTodos = UseInvalidateEndpoint( listTodosURL )

  const todosRemainingCount = useMemo(
    () => todos?.filter( ( todo ) => !todo.isCompleted ).length,
    [ todos ],
  )

  const todosCompletedCount = useMemo(
    () => todos?.filter( ( todo ) => todo.isCompleted ).length,
    [ todos ],
  )

  if ( isLoading ) {
    return <Loader message='Fetching todos...' />
  }

  return (
    <div className='todos'>
      <AddNewTodo
        refreshTodos={ refreshTodos }
        allCompleted={ 0 === todosRemainingCount }
      />

      {0 === todos.length && <p>No todos</p>}

      <TransitionGroup>
        {todos.map( ( todo ) => (
          <CSSTransition key={ todo._id } timeout={ 500 } classNames='zoom'>
            <Todo { ...todo } refreshTodos={ refreshTodos } />
          </CSSTransition>
        ) )}
      </TransitionGroup>

      <div className='info'>
        <p>Remaining: {todosRemainingCount}</p>

        <p>Completed: {todosCompletedCount}</p>
      </div>
    </div>
  )
}

export default Todos
