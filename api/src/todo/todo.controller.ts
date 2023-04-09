import type { Request, Response } from 'express'
import mongoose from 'mongoose'

import { TodoModel } from './todo.model'
import { logger } from '../core/logger'

export const getTodos = async (_req: Request, res: Response) => {
	try {
		const todos = await TodoModel.find({}).exec()
		res.status(200).json(todos)
	} catch {
		res.status(500).json({ message: 'Error retrieving todos' })
	}
}

export const getTodoById = async (req: Request, res: Response) => {
	try {
		const id = req.params.id
		if (!mongoose.isValidObjectId(id))
			return res.status(400).json({ message: 'Id not valid' })
		const todo = await TodoModel.findById(id)
		if (!todo) return res.status(404).json({ message: 'Todo not found' })
		return res.status(200).json(todo)
	} catch (error) {
		logger.error(error)
		return res.status(500).json({ message: 'Error retrieving todo' })
	}
}

export const createTodo = async (req: Request, res: Response) => {
	try {
		const todo = await TodoModel.create(req.body)
		res.status(201).json(todo)
	} catch (error) {
		logger.error(error)
		res.status(500).json({ message: 'Error creating todo' })
	}
}

export const updatePartialTodo = async (req: Request, res: Response) => {
	try {
		const id = req.params.id
		if (!mongoose.isValidObjectId(id))
			return res.status(400).json({ message: 'Id not valid' })
		const todo = await TodoModel.findByIdAndUpdate(id, req.body, {
			new: true,
		})
		if (!todo) return res.status(404).json({ message: 'Todo not found' })
		return res.status(200).json(todo)
	} catch (error) {
		logger.error(error)
		return res.status(500).json({ message: 'Error updating todo' })
	}
}

export const updateTodo = async (req: Request, res: Response) => {
	try {
		const id = req.params.id
		if (!mongoose.isValidObjectId(id))
			return res.status(400).json({ message: 'Id not valid' })
		const todo = await TodoModel.findOneAndReplace({ _id: id }, req.body, {
			returnDocument: 'after',
		}).exec()
		if (!todo) return res.status(404).json({ message: 'Todo not found' })
		return res.status(200).json(todo)
	} catch (error) {
		logger.error(error)
		return res.status(500).json({ message: 'Error updating todo' })
	}
}

export const deleteTodo = async (req: Request, res: Response) => {
	try {
		const id = req.params.id
		if (!mongoose.isValidObjectId(id))
			return res.status(400).json({ message: 'Id not valid' })
		await TodoModel.findByIdAndDelete(id)
		return res.status(204).end()
	} catch (error) {
		logger.error(error)
		return res.status(500).json({ message: 'Error deleting todo' })
	}
}
