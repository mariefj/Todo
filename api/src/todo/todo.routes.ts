import { Router } from 'express'

import {
	createTodo,
	getTodoById,
	getTodos,
	updatePartialTodo,
	updateTodo,
} from './todo.controller'

const router = Router()

// Get all todos
router.get('/', getTodos)

// Get todo
router.get('/:id', getTodoById)

//Add todo
router.post('/', createTodo)

// Patch todo
router.patch('/:id', updatePartialTodo)

// Put todo
router.put('/:id', updateTodo)

export { router }
