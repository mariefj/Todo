import { TodoFromBack } from '../../common/models/todo'
import { todoApi } from '../../store/api'

const listTodoApi = todoApi.injectEndpoints({
	endpoints: builder => ({
		viewTodo: builder.query<TodoFromBack, { id: string }>({
			query: ({ id }) => `todos/${id}`,
		}),
	}),
	overrideExisting: false,
})

export const { useViewTodoQuery } = listTodoApi

export default listTodoApi
