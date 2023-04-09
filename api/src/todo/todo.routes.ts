import { Router } from 'express'

import { getTodoById, getTodos } from './todo.controller'

const router = Router()

// Get all todos
router.get('/', getTodos)

// Get todo
router.get('/:id', getTodoById)

export { router }
