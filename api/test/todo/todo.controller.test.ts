import { Request } from 'express'
import {
	createTodo,
	deleteTodo,
	getTodoById,
	getTodos,
	updatePartialTodo,
	updateTodo,
} from '../../src/todo/todo.controller'
import mongoose from 'mongoose'
import { TodoModel } from '../../src/todo/todo.model'
import { mockResponse } from '../test_utils/mockResponse'

describe('todo controllers', () => {
	describe('getTodos', () => {
		let connection: typeof mongoose

		beforeEach(async () => {
			// @ts-ignore
			connection = await mongoose.connect(global.__MONGO_URI__)
			await TodoModel.deleteMany({}).exec()
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

	describe('getTodoById', () => {
		let connection: typeof mongoose

		beforeEach(async () => {
			// @ts-ignore
			connection = await mongoose.connect(global.__MONGO_URI__)
			await TodoModel.deleteMany({}).exec()
		})

		afterEach(async () => {
			await connection.disconnect()
		})

		it('test best case scenario', async () => {
			const res = mockResponse()

			const todoTest = await TodoModel.create({
				title: 'test',
				description: 'desc',
				isDone: false,
			})

			await getTodoById(
				{ params: { id: todoTest._id } } as unknown as Request,
				res
			)
			expect(res.status).toBeCalledTimes(1)
			expect(res.status).toBeCalledWith(200)
			expect(res.json).toBeCalledTimes(1)
			expect(res.json).toBeCalledWith(todoTest.toJSON())
		})

		it('test when mongo is offline', async () => {
			const res = mockResponse()

			const todoTest = await TodoModel.create({
				title: 'test',
				description: 'desc',
				isDone: false,
			})

			await connection.disconnect()
			await getTodoById(
				{ params: { id: todoTest._id } } as unknown as Request,
				res
			)

			expect(res.status).toBeCalledTimes(1)
			expect(res.status).toBeCalledWith(500)
		})

		it('test when id is not valid', async () => {
			const res = mockResponse()

			const idNotValid = '1'
			const error = { message: 'Id not valid' }

			await getTodoById(
				{ params: { id: idNotValid } } as unknown as Request,
				res
			)
			expect(res.status).toBeCalledTimes(1)
			expect(res.status).toBeCalledWith(400)
			expect(res.json).toBeCalledTimes(1)
			expect(res.json).toBeCalledWith(error)
		})

		it('test when todo is not found', async () => {
			const res = mockResponse()

			const idNotFound = '000000000000000000000000'

			const error = { message: 'Todo not found' }

			await getTodoById(
				{ params: { id: idNotFound } } as unknown as Request,
				res
			)
			expect(res.status).toBeCalledTimes(1)
			expect(res.status).toBeCalledWith(404)
			expect(res.json).toBeCalledTimes(1)
			expect(res.json).toBeCalledWith(error)
		})
	})

	describe('createTodo', () => {
		let connection: typeof mongoose

		beforeEach(async () => {
			// @ts-ignore
			connection = await mongoose.connect(global.__MONGO_URI__)
			await TodoModel.deleteMany({}).exec()
		})

		afterEach(async () => {
			await connection.disconnect()
		})

		it('test best case scenario', async () => {
			const res = mockResponse()

			await createTodo(
				{
					body: {
						title: 'test',
						description: 'desc',
						isDone: false,
					},
				} as unknown as Request,
				res
			)

			const todo = await TodoModel.findOne({ title: 'test' }).exec()
			expect(res.status).toBeCalledTimes(1)
			expect(res.status).toBeCalledWith(201)
			expect(res.json).toBeCalledTimes(1)
			expect(res.json).toBeCalledWith(todo?.toJSON())
		})

		it('test when mongo is offline', async () => {
			const res = mockResponse()

			await connection.disconnect()

			await createTodo(
				{
					body: {
						title: 'test',
						description: 'desc',
						isDone: false,
					},
				} as unknown as Request,
				res
			)

			expect(res.status).toBeCalledTimes(1)
			expect(res.status).toBeCalledWith(500)
		})
	})

	describe('updatePartialTodo', () => {
		let connection: typeof mongoose

		beforeEach(async () => {
			// @ts-ignore
			connection = await mongoose.connect(global.__MONGO_URI__)
			await TodoModel.deleteMany({}).exec()
		})

		afterEach(async () => {
			await connection.disconnect()
		})

		it('test best case scenario', async () => {
			const res = mockResponse()

			const todoTest = await TodoModel.create({
				title: 'test',
				description: 'desc',
				isDone: false,
			})

			const todoTestUpdate = { title: 'test update' }

			await updatePartialTodo(
				{
					params: { id: todoTest._id },
					body: todoTestUpdate,
				} as unknown as Request,
				res
			)

			const todoUpdate = await TodoModel.findOne(todoTestUpdate).exec()

			expect(res.status).toBeCalledTimes(1)
			expect(res.status).toBeCalledWith(200)
			expect(res.json).toBeCalledTimes(1)
			expect(res.json).toBeCalledWith(todoUpdate?.toJSON())
		})

		it('test when mongo is offline', async () => {
			const res = mockResponse()

			const todoTest = await TodoModel.create({
				title: 'test',
				description: 'desc',
				isDone: false,
			})

			await connection.disconnect()

			const todoTestUpdate = { title: 'test update' }

			await updatePartialTodo(
				{
					params: { id: todoTest._id },
					body: todoTestUpdate,
				} as unknown as Request,
				res
			)

			expect(res.status).toBeCalledTimes(1)
			expect(res.status).toBeCalledWith(500)
		})

		it('test when id is not valid', async () => {
			const res = mockResponse()

			const idNotValid = '1'
			const error = { message: 'Id not valid' }

			const todoTestUpdate = { title: 'test update' }

			await updatePartialTodo(
				{
					params: { id: idNotValid },
					body: todoTestUpdate,
				} as unknown as Request,
				res
			)
			expect(res.status).toBeCalledTimes(1)
			expect(res.status).toBeCalledWith(400)
			expect(res.json).toBeCalledTimes(1)
			expect(res.json).toBeCalledWith(error)
		})

		it('test when todo is not found', async () => {
			const res = mockResponse()

			const idNotFound = '000000000000000000000000'

			const error = { message: 'Todo not found' }

			const todoTestUpdate = { title: 'test update' }

			await updatePartialTodo(
				{
					params: { id: idNotFound },
					body: todoTestUpdate,
				} as unknown as Request,
				res
			)

			expect(res.status).toBeCalledTimes(1)
			expect(res.status).toBeCalledWith(404)
			expect(res.json).toBeCalledTimes(1)
			expect(res.json).toBeCalledWith(error)
		})
	})

	describe('updateTodo', () => {
		let connection: typeof mongoose

		beforeEach(async () => {
			// @ts-ignore
			connection = await mongoose.connect(global.__MONGO_URI__)
			await TodoModel.deleteMany({}).exec()
		})

		afterEach(async () => {
			await connection.disconnect()
		})

		it('test best case scenario', async () => {
			const res = mockResponse()

			const todoTest = await TodoModel.create({
				title: 'test',
				description: 'desc',
				isDone: false,
			})

			const todoTestUpdate = { title: 'test update', isDone: true }

			await updateTodo(
				{
					params: { id: todoTest._id },
					body: todoTestUpdate,
				} as unknown as Request,
				res
			)

			const todoUpdate = await TodoModel.findOne(todoTestUpdate).exec()

			expect(res.status).toBeCalledTimes(1)
			expect(res.status).toBeCalledWith(200)
			expect(res.json).toBeCalledTimes(1)
			expect(res.json).toBeCalledWith(todoUpdate?.toJSON())
			expect(todoUpdate?.description).toBeUndefined()
		})

		it('test missing field in body scenario', async () => {
			const res = mockResponse()

			const todoTest = await TodoModel.create({
				title: 'test',
				description: 'desc',
				isDone: false,
			})

			const todoTestUpdate = { title: 'test update' }

			await updateTodo(
				{
					params: { id: todoTest._id },
					body: todoTestUpdate,
				} as unknown as Request,
				res
			)

			expect(res.status).toBeCalledTimes(1)
			expect(res.status).toBeCalledWith(400)
			expect(res.json).toBeCalledTimes(1)
			expect(res.json).toBeCalledWith({ message: 'Id not valid' })
		})

		it('test when mongo is offline', async () => {
			const res = mockResponse()

			const todoTest = await TodoModel.create({
				title: 'test',
				description: 'desc',
				isDone: false,
			})

			await connection.disconnect()

			const todoTestUpdate = { title: 'test update', isDone: true }

			await updateTodo(
				{
					params: { id: todoTest._id },
					body: todoTestUpdate,
				} as unknown as Request,
				res
			)

			expect(res.status).toBeCalledTimes(1)
			expect(res.status).toBeCalledWith(500)
		})

		it('test when id is not valid', async () => {
			const res = mockResponse()

			const idNotValid = '1'
			const error = { message: 'Id not valid' }

			const todoTestUpdate = { title: 'test update', isDone: true }

			await updateTodo(
				{
					params: { id: idNotValid },
					body: todoTestUpdate,
				} as unknown as Request,
				res
			)
			expect(res.status).toBeCalledTimes(1)
			expect(res.status).toBeCalledWith(400)
			expect(res.json).toBeCalledTimes(1)
			expect(res.json).toBeCalledWith(error)
		})

		it('test when todo is not found', async () => {
			const res = mockResponse()

			const idNotFound = '000000000000000000000000'

			const error = { message: 'Todo not found' }

			const todoTestUpdate = { title: 'test update', isDone: true }

			await updateTodo(
				{
					params: { id: idNotFound },
					body: todoTestUpdate,
				} as unknown as Request,
				res
			)

			expect(res.status).toBeCalledTimes(1)
			expect(res.status).toBeCalledWith(404)
			expect(res.json).toBeCalledTimes(1)
			expect(res.json).toBeCalledWith(error)
		})
	})

	describe('deleteTodo', () => {
		let connection: typeof mongoose

		beforeEach(async () => {
			// @ts-ignore
			connection = await mongoose.connect(global.__MONGO_URI__)
			await TodoModel.deleteMany({}).exec()
		})

		afterEach(async () => {
			await connection.disconnect()
		})

		it('test best case scenario', async () => {
			const res = mockResponse()

			const todoTest = await TodoModel.create({
				title: 'test',
				description: 'desc',
				isDone: false,
			})

			await deleteTodo(
				{ params: { id: todoTest._id } } as unknown as Request,
				res
			)

			const todoDeleted = await TodoModel.findById(todoTest._id)
			expect(res.status).toBeCalledTimes(1)
			expect(res.status).toBeCalledWith(204)
			expect(res.end).toBeCalledTimes(1)
			expect(todoDeleted).toBeNull()
		})

		it('test when mongo is offline', async () => {
			const res = mockResponse()

			const todoTest = await TodoModel.create({
				title: 'test',
				description: 'desc',
				isDone: false,
			})

			await connection.disconnect()
			await deleteTodo(
				{ params: { id: todoTest._id } } as unknown as Request,
				res
			)

			expect(res.status).toBeCalledTimes(1)
			expect(res.status).toBeCalledWith(500)
		})

		it('test when id is not valid', async () => {
			const res = mockResponse()

			const idNotValid = '1'
			const error = { message: 'Id not valid' }

			await deleteTodo(
				{ params: { id: idNotValid } } as unknown as Request,
				res
			)
			expect(res.status).toBeCalledTimes(1)
			expect(res.status).toBeCalledWith(400)
			expect(res.json).toBeCalledTimes(1)
			expect(res.json).toBeCalledWith(error)
		})

		it('test when todo is not found', async () => {
			const res = mockResponse()

			const idNotFound = '000000000000000000000000'

			await deleteTodo(
				{ params: { id: idNotFound } } as unknown as Request,
				res
			)
			expect(res.status).toBeCalledTimes(1)
			expect(res.status).toBeCalledWith(204)
			expect(res.end).toBeCalledTimes(1)
		})
	})
})
