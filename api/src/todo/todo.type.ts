import { Document } from 'mongoose'
import * as z from 'zod'

import { Todo } from './todo.model'

export type Todo = z.infer<typeof Todo>

export type TodoDoc = Todo & Document<unknown, object, Todo>
