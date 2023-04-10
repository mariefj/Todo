import React from 'react'
import compareAsc from 'date-fns/compareAsc'
import _ from 'lodash'

import { useLazyChangeTodoStateQuery, useListTodoQuery } from './listTodo.api'
import { TodoFromBack } from '../../common/models/todo'

type PropsTodo = TodoFromBack
export const Todo = ({ _id, title, isDone }: PropsTodo) => {
	const [query] = useLazyChangeTodoStateQuery()
	const queryDebounce = React.useMemo(() => _.debounce(query, 1000), [query])

	const [done, setDone] = React.useState(isDone)

	return (
		<div key={_id}>
			<a href={`/${_id}`}>{title}</a>
			<div>
				<p>state: </p>
				<input
					type='checkbox'
					checked={done}
					onChange={() => {
						setDone(!done)
						queryDebounce({ id: _id, isDone: !done })
					}}
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
