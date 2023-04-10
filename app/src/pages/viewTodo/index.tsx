import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import _ from 'lodash'

import {
	useLazyChangeTodoDescriptionQuery,
	useLazyDeleteTodoQuery,
	useViewTodoQuery,
} from './viewTodo.api'

type PropsTodoViewer = {
	id: string
}

const TodoViewer = ({ id }: PropsTodoViewer) => {
	const { data, error, isLoading, isError } = useViewTodoQuery({
		id,
	})
	const [query] = useLazyDeleteTodoQuery()
	const [update] = useLazyChangeTodoDescriptionQuery()
	const navigate = useNavigate()

	const [description, setDescription] = React.useState(data?.description)

	React.useEffect(() => setDescription(data?.description), [data])

	const updateDebounced = React.useMemo(
		() => _.debounce(update, 250),
		[update]
	)

	if (isLoading) return <div>Loading...</div>
	if (isError) return <div>{error.toString()}</div>

	return (
		<div>
			<div>{data?.title}</div>
			<input
				value={description}
				onChange={e => {
					setDescription(e.target.value)
					if (data)
						updateDebounced({
							id,
							...data,
							description: e.target.value,
						})
				}}
			/>
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
