import { Router } from 'express'

import { createTodo, getTodoById, getTodos } from './todo.controller'

const router = Router()

// Get all todos
router.get('/', getTodos)

// Get todo
router.get('/:id', getTodoById)

//Add todo
router.post('/', createTodo)

export { router }
