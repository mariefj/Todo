import { Todo, TodoFromBack } from '../../common/models/todo'
import { todoApi } from '../../store/api'

const createTodoApi = todoApi.injectEndpoints({
	endpoints: builder => ({
		createTodo: builder.query<TodoFromBack, Todo>({
			query: todo => ({
				url: `todos/`,
				method: 'POST',
				body: todo,
			}),
		}),
	}),
	overrideExisting: false,
})

export const { useLazyCreateTodoQuery } = createTodoApi

export default createTodoApi
