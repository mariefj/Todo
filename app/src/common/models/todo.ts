export type Todo = {
	title: string
	description?: string
	isDone: boolean
}

export type TodoFromBack = Todo & {
	_id: string
}
