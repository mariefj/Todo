import { useParams } from 'react-router-dom'
import { useViewTodoQuery } from './viewTodo.api'

type PropsTodoViewer = {
	id: string
}

const TodoViewer = ({ id }: PropsTodoViewer) => {
	const { data, error, isLoading, isError } = useViewTodoQuery({
		id,
	})

	if (isLoading) return <div>Loading...</div>
	if (isError) return <div>{error.toString()}</div>

	return (
		<div>
			<div>{data?.title}</div>
			<div>{data?.description}</div>
			<div>{data?.isDone ? 'done' : 'not done'}</div>
		</div>
	)
}

export const ViewTodo = () => {
	const { id } = useParams()
	if (id === undefined) return <p>Please provide an id</p>

	return <TodoViewer id={id} />
}

export default ViewTodo
