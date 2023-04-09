import { Router } from 'express'

import {
	createTodo,
	deleteTodo,
	getTodoById,
	getTodos,
	updatePartialTodo,
	updateTodo,
} from './todo.controller'

const router = Router()

router.get('/', getTodos)
router.get('/:id', getTodoById)
router.post('/', createTodo)
router.patch('/:id', updatePartialTodo)
router.put('/:id', updateTodo)
router.delete('/:id', deleteTodo)

export { router }
