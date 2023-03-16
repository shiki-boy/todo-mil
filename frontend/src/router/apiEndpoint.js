/* eslint-disable sort-vars */
const base = '/api'

const loginURL = `${ base }/auth/login`,
      logoutURL = `${ base }/auth/logout`,
      signupURL = `${ base }/auth/register`,
      listTodosURL = `${ base }/todos`,
      createTodoURL = `${ base }/todos`,
      deleteTodoURL = `${ base }/todos`,
      updateTodoURL = ( id ) => `${ base }/todos/${ id }`,
      completeAllTodoURL = `${ base }/todos/complete-all`

export {
  loginURL,
  logoutURL,
  signupURL,

  listTodosURL,
  createTodoURL,
  deleteTodoURL,
  updateTodoURL,
  completeAllTodoURL,
}
