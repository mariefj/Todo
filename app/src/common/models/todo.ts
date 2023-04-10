export type Todo = {
	title: string
	description?: string
	isDone: boolean
}

export type TodoFromBack = Todo & {
	_id: string
	created_at: string
	updated_at: string
	__v: number
}
