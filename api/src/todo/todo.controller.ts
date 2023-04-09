import type { Request, Response } from 'express'

import { TodoModel } from './todo.model'

export const getTodos = async (_req: Request, res: Response) => {
	try {
		const todos = await TodoModel.find({}).exec()
		res.status(200).json(todos)
	} catch (error) {
		res.status(500).json({ message: 'Error retrieving todos' })
	}
}
