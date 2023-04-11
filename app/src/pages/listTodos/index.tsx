import React from 'react'
import compareAsc from 'date-fns/compareAsc'
import _ from 'lodash'
import styled from 'styled-components'

import { useLazyChangeTodoStateQuery, useListTodoQuery } from './listTodo.api'
import { TodoFromBack } from '../../common/models/todo'

type PropsTodo = TodoFromBack

const Wrapper = styled.div`
	padding: 1.5rem;
`

const Title = styled.h1`
	color: palevioletred;
	font-weight: bold;
`

const List = styled.ul`
	margin-top: 4rem;
`

const ItemList = styled.li`
	outline: 0;
	cursor: pointer;
	border: none;
	border-radius: 7px;
	color: #696969;
	box-shadow: 0 4px 14px 0 rgb(0 0 0 / 10%);
	transition: background 0.2s ease, color 0.2s ease, box-shadow 0.2s ease;
	:hover {
		background: rgba(255, 255, 255, 0.9);
		box-shadow: 0 6px 20px rgb(93 93 93 / 23%);
	}
	margin-bottom: 2rem;
`

const WrapperLink = styled.a`
	display: flex;
	justify-content: space-between;
	padding: 0 1rem;
	align-items: center;
`

const TitleTodo = styled.p`
	font-weight: bold;
	font-size: 1.1em;
	margin: 1.2rem 0.5rem;
`

const Checkbox = styled.input`
	accent-color: palevioletred;
`

const Button = styled.a`
	border: 1px solid palevioletred;
	border-radius: 1000px;
	font-weight: 400;
	margin-top: 1.5rem;
	padding: 1.1rem 1.5rem;
	box-shadow: 0 4px 14px 0 rgb(0 0 0 / 10%);
`

export const Todo = ({ _id, title, isDone }: PropsTodo) => {
	const [query] = useLazyChangeTodoStateQuery()
	const queryDebounce = React.useMemo(() => _.debounce(query, 1000), [query])

	const [done, setDone] = React.useState(isDone)

	return (
		<ItemList key={_id}>
			<WrapperLink href={`/${_id}`}>
				<TitleTodo>{title}</TitleTodo>
				<Checkbox
					type='checkbox'
					checked={done}
					onChange={() => {
						setDone(!done)
						queryDebounce({ id: _id, isDone: !done })
					}}
				/>
			</WrapperLink>
		</ItemList>
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
		<Wrapper>
			<Title>My todos</Title>
			<Button href='/createTodo'>Add a new todo</Button>
			<List>
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
			</List>
		</Wrapper>
	)
}

export default ListTodo
