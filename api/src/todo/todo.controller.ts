import type { Request, Response } from 'express'
import mongoose from 'mongoose'

import { TodoModel } from './todo.model'

export const getTodos = async (_req: Request, res: Response) => {
	try {
		const todos = await TodoModel.find({}).exec()
		res.status(200).json(todos)
	} catch (error) {
		res.status(500).json({ message: 'Error retrieving todos' })
	}
}

export const getTodoById = async (req: Request, res: Response) => {
	try {
		const id = req.params.id
		if (!mongoose.isValidObjectId(id)) {
			res.status(400).json({ message: 'Id not valid' })
			return
		}
		const todo = await TodoModel.findById(id)
		if (!todo) {
			res.status(404).json({ message: 'Todo not found' })
			return
		}
		res.status(200).json(todo)
	} catch (error) {
		res.status(500).json({ message: 'Error retrieving todo' })
	}
}

export const createTodo = async (req: Request, res: Response) => {
	try {
		const todo = await TodoModel.create(req.body)
		res.status(201).json(todo)
	} catch (e) {
		res.status(500).json({ message: 'Error creating todo' })
	}
}
