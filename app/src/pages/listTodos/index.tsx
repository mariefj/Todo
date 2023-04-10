import React from 'react'
import compareAsc from 'date-fns/compareAsc'

import { useListTodoQuery } from './listTodo.api'

export const ListTodo = () => {
	const { data, error, isError, isLoading } = useListTodoQuery()

	const sortedArray = React.useMemo(
		() =>
			[...(data ?? [])]?.sort((a, b) =>
				compareAsc(new Date(b.updated_at), new Date(a.updated_at))
			),
		[data]
	)

	if (isLoading) return <div>Loading...</div>

	if (isError) return <div>{error.toString()}</div>

	return (
		<div>
			{sortedArray
				?.filter(todo => todo.isDone === false)
				?.map(todo => (
					<a key={todo._id} href={`/${todo._id}`}>
						<div>{todo.title}</div>
						<div>{todo.isDone ? 'done' : 'not done'}</div>
					</a>
				))}
			{sortedArray
				?.filter(todo => todo.isDone === true)
				?.map(todo => (
					<a key={todo._id} href={`/${todo._id}`}>
						<div>{todo.title}</div>
						<div>{todo.isDone ? 'done' : 'not done'}</div>
					</a>
				))}
		</div>
	)
}

export default ListTodo
