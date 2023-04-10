import { useParams, useNavigate } from 'react-router-dom'
import { useLazyDeleteTodoQuery, useViewTodoQuery } from './viewTodo.api'

type PropsTodoViewer = {
	id: string
}

const TodoViewer = ({ id }: PropsTodoViewer) => {
	const { data, error, isLoading, isError } = useViewTodoQuery({
		id,
	})
	const [query] = useLazyDeleteTodoQuery()
	const navigate = useNavigate()

	if (isLoading) return <div>Loading...</div>
	if (isError) return <div>{error.toString()}</div>

	return (
		<div>
			<div>{data?.title}</div>
			<div>{data?.description}</div>
			<div>{data?.isDone ? 'done' : 'not done'}</div>
			<button
				type='button'
				style={{ backgroundColor: 'red' }}
				onClick={async () => {
					await query({ id })
					navigate('/')
				}}
			>
				Delete
			</button>
		</div>
	)
}

export const ViewTodo = () => {
	const { id } = useParams()
	if (id === undefined) return <p>Please provide an id</p>

	return <TodoViewer id={id} />
}

export default ViewTodo
