import { kebabCase } from 'lodash'

import Todos from './Todos'

export default { Todos }

const createPagesConf = ( pagesList ) =>
  pagesList.map( ( { name, roles, ...rest } ) => ( {
    component: name,
    link: kebabCase( name ),
    roles,
    title: kebabCase( name ).split( '-' ).join( ' ' ),
    ...rest,
  } ) )

const mainPages = [
  { name: 'Todos' },
]

export const mainPagesConf = createPagesConf( mainPages )
