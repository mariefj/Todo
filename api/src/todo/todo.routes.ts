import { Router } from 'express'
import * as z from 'zod'
import { validateRequest } from 'zod-express-middleware'

import { Todo } from './todo.model'
import {
	createTodo,
	deleteTodo,
	getTodoById,
	getTodos,
	updatePartialTodo,
	updateTodo,
} from './todo.controller'

const router = Router()

const body = { body: Todo }
const paramsWithId = {
	params: z.object({
		id: z.string().regex(/[0-9A-Fa-f]{24}/g),
	}),
}

router.get('/', getTodos)
router.get('/:id', validateRequest(paramsWithId), getTodoById)
router.post('/', validateRequest(body), createTodo)
router.patch(
	'/:id',
	validateRequest({ ...paramsWithId, body: Todo.partial() }),
	updatePartialTodo
)
router.put(
	'/:id',
	validateRequest({
		...paramsWithId,
		...body,
	}),
	updateTodo
)
router.delete('/:id', validateRequest(paramsWithId), deleteTodo)

export { router }
