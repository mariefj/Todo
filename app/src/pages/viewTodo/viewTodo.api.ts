import { Todo, TodoFromBack } from '../../common/models/todo'
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
		changeTodoDescription: builder.query<
			TodoFromBack,
			{ id: string } & Todo
		>({
			query: ({ id, description, isDone, title }) => ({
				url: `todos/${id}`,
				method: 'PUT',
				body: {
					description,
					isDone,
					title,
				},
			}),
		}),
	}),
	overrideExisting: false,
})

export const {
	useViewTodoQuery,
	useLazyDeleteTodoQuery,
	useLazyChangeTodoDescriptionQuery,
} = listTodoApi

export default listTodoApi
