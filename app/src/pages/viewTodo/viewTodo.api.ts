import { TodoFromBack } from '../../common/models/todo'
import { todoApi } from '../../store/api'

const listTodoApi = todoApi.injectEndpoints({
	endpoints: builder => ({
		viewTodo: builder.query<TodoFromBack, { id: string }>({
			query: ({ id }) => `todos/${id}`,
		}),
		deleteTodo: builder.query<TodoFromBack, { id: string }>({
			query: ({ id }) => ({
				url: `todos/${id}`,
				method: 'DELETE',
			}),
		}),
	}),
	overrideExisting: false,
})

export const { useViewTodoQuery, useLazyDeleteTodoQuery } = listTodoApi

export default listTodoApi
