import React from 'react'
import compareAsc from 'date-fns/compareAsc'

import { useLazyChangeTodoStateQuery, useListTodoQuery } from './listTodo.api'
import { TodoFromBack } from '../../common/models/todo'

type PropsTodo = TodoFromBack
export const Todo = ({ _id, title, isDone }: PropsTodo) => {
	const [query] = useLazyChangeTodoStateQuery()
	return (
		<div key={_id}>
			<a href={`/${_id}`}>{title}</a>
			<div>
				<p>state: </p>
				<input
					type='checkbox'
					checked={isDone}
					onChange={() => query({ id: _id, isDone: !isDone })}
				/>
			</div>
		</div>
	)
}

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
					<Todo key={todo._id} {...todo} />
				))}
			{sortedArray
				?.filter(todo => todo.isDone === true)
				?.map(todo => (
					<Todo key={todo._id} {...todo} />
				))}
		</div>
	)
}

export default ListTodo
