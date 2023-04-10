import React from 'react'
import { useLazyCreateTodoQuery } from './createTodo.api'

export const CreateTodo = () => {
	const [query, { data, error, isLoading, isError, isSuccess }] =
		useLazyCreateTodoQuery()

	const [title, setTitle] = React.useState<string | undefined>()
	const [description, setDescription] = React.useState<string | undefined>()
	const [isDone, setIsDone] = React.useState<boolean | undefined>(false)

	if (isLoading) return <div>Loading...</div>
	if (isError) return <div>{error?.toString()}</div>
	if (isSuccess)
		return (
			<div style={{ display: 'flex', flexDirection: 'column' }}>
				<p>Success !</p>
				<a href='/'>Return to main page</a>
				<a href={`/${data?._id}`}>View the new todo</a>
			</div>
		)

	return (
		<div style={{ display: 'flex', flexDirection: 'column' }}>
			<input onChange={e => setTitle(e.target.value)} />
			<input onChange={e => setDescription(e.target.value)} />
			<input
				type='checkbox'
				onChange={e => setIsDone(e.target.checked)}
			/>
			<button
				type='submit'
				onClick={() => {
					if (!title || isDone === undefined) return
					query({ title, description, isDone })
				}}
			>
				Submit
			</button>
		</div>
	)
}

export default CreateTodo
