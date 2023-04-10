import { useListTodoQuery } from './listTodo.api'

export const ListTodo = () => {
	const { data, error, isError, isLoading } = useListTodoQuery()

	if (isLoading) return <div>Loading...</div>

	if (isError) return <div>{error.toString()}</div>

	return (
		<div>
			{data?.map(todo => (
				<a key={todo._id} href={`/view/${todo._id}`}>
					<div>{todo.title}</div>
					<div>{todo.isDone ? 'done' : 'not done'}</div>
				</a>
			))}
		</div>
	)
}

export default ListTodo
