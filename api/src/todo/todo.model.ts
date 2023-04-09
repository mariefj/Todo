import { Schema, model } from 'mongoose'

import * as z from 'zod'

// zod objects
export const Todo = z.object({
	title: z.string(),
	description: z.string().optional(),
	isDone: z.boolean(),
})

// Schema
const TodoSchema = new Schema({
	title: { type: String, required: true },
	description: { type: String },
	isDone: { type: Boolean, required: true },
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now },
})

export const TodoModel = model('Todo', TodoSchema)
