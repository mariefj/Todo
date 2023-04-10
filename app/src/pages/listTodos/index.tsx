import { useListTodoQuery } from './listTodo.api'

export const ListTodo = () => {
	const { data, error, isError, isLoading } = useListTodoQuery()

	if (isLoading) return <div>Loading...</div>

	if (isError) return <div>{error.toString()}</div>

	return (
		<div>
			{data?.map(todo => (
				<div key={todo._id}>
					<div>{todo.title}</div>
					<div>{todo.isDone ? 'done' : 'not done'}</div>
				</div>
			))}
		</div>
	)
}

export default ListTodo
