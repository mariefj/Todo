import React from 'react'
import styled from 'styled-components'

import { useLazyCreateTodoQuery } from './createTodo.api'

const SuccessDiv = styled.div`
	display: flex;
	flex-direction: column;
`

const TitleSuccess = styled.h4`
	color: palevioletred;
	font-weight: bold;
`

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: 5rem;
	padding: 5rem 4rem;
	border: 1px solid rgb(219 112 147 / 20%);
	border-radius: 7px;
	width: 60rem;
`
const Input = styled.input`
	height: 3rem;
	font-size: 1em;
	margin-bottom: 1rem;
	width: 100%;
`

const Checkbox = styled.input`
	accent-color: palevioletred;
	align-self: flex-start;
	margin-top: 0.8rem;
`

const Button = styled.button`
	outline: 0;
	border: none;
	border-radius: 7px;
	background-color: palevioletred;
	color: white;
	font-weight: 400;
	box-shadow: 0 4px 14px 0 rgb(219 112 147 / 20%);
	margin-top: 1.5rem;
	width: 30%;
`

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
			<SuccessDiv>
				<TitleSuccess>New todo created with success !</TitleSuccess>
				<a href='/'>Return to main page</a>
				<a href={`/${data?._id}`}>View the new todo</a>
			</SuccessDiv>
		)

	return (
		<Wrapper>
			<Input
				onChange={e => setTitle(e.target.value)}
				placeholder='Title'
			/>
			<Input
				onChange={e => setDescription(e.target.value)}
				placeholder='Description'
			/>
			<Checkbox
				type='checkbox'
				onChange={e => setIsDone(e.target.checked)}
			/>
			<Button
				type='submit'
				onClick={() => {
					if (!title || isDone === undefined) return
					query({ title, description, isDone })
				}}
			>
				Submit
			</Button>
		</Wrapper>
	)
}

export default CreateTodo
