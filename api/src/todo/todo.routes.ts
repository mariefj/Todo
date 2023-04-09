import { Router } from 'express'

import { getTodos } from './todo.controller'

const router = Router()

// Get all todos
router.get('/', getTodos)

export { router }
