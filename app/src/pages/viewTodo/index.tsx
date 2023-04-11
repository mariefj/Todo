import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import _ from 'lodash'
import styled from 'styled-components'

import {
	useLazyChangeTodoDescriptionQuery,
	useLazyDeleteTodoQuery,
	useViewTodoQuery,
} from './viewTodo.api'

type PropsTodoViewer = {
	id: string
}

const Wrapper = styled.div`
	margin-top: 5rem;
	padding: 2rem 3rem;
	border: 1px solid rgb(219 112 147 / 20%);
	border-radius: 7px;
	width: 60rem;
`

const Title = styled.h4`
	color: palevioletred;
	font-weight: bold;
	margin: 0 0 0.8rem 0;
	font-size: 1.2em;
`

const Input = styled.input`
	height: 3rem;
	font-size: 1em;
	margin-bottom: 0.3rem;
	width: 100%;
`
const Button = styled.button`
	outline: 0;
	border: none;
	border-radius: 7px;
	background-color: palevioletred;
	color: white;
	font-weight: 400;
	box-shadow: 0 4px 14px 0 rgb(219 112 147 / 20%);
	margin-top: 1.1rem;
`

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
		<Wrapper>
			<Title>{data?.title}</Title>
			<Input
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
			<p>{data?.isDone ? 'Done' : 'To do'}</p>
			<Button
				type='button'
				onClick={async () => {
					await query({ id })
					navigate('/')
				}}
			>
				Delete
			</Button>
		</Wrapper>
	)
}

export const ViewTodo = () => {
	const { id } = useParams()
	if (id === undefined) return <p>Please provide an id</p>

	return <TodoViewer id={id} />
}

export default ViewTodo
