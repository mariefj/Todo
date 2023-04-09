import { Request } from 'express'
import { getTodos } from '../../src/todo/todo.controller'
import mongoose from 'mongoose'
import { TodoModel } from '../../src/todo/todo.model'
import { mockResponse } from '../test_utils/mockResponse'

describe('todo controllers', () => {
	describe('getTodos', () => {
		let connection: typeof mongoose

		beforeEach(async () => {
			// @ts-ignore
			connection = await mongoose.connect(global.__MONGO_URI__)
		})

		afterEach(async () => {
			await connection.disconnect()
		})

		it('test best case scenario', async () => {
			const res = mockResponse()

			await getTodos({} as Request, res)

			expect(res.status).toBeCalledTimes(1)
			expect(res.status).toBeCalledWith(200)
			expect(res.json).toBeCalledTimes(1)
			expect(res.json).toBeCalledWith([])
		})

		it('test best case scenario with data', async () => {
			const res = mockResponse()

			await TodoModel.create({
				title: 'test',
				description: 'desc',
				isDone: false,
			})
			const todoTest = await TodoModel.find({})

			await getTodos({} as Request, res)

			expect(res.status).toBeCalledTimes(1)
			expect(res.status).toBeCalledWith(200)
			expect(res.json).toBeCalledTimes(1)
			expect(res.json).toBeCalledWith(todoTest)
		})

		it('test when mongo is offline', async () => {
			const res = mockResponse()

			await connection.disconnect()
			await getTodos({} as Request, res)

			expect(res.status).toBeCalledTimes(1)
			expect(res.status).toBeCalledWith(500)
		})
	})
})
