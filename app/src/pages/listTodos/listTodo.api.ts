import { TodoFromBack } from '../../common/models/todo'
import { todoApi } from '../../store/api'

const listTodoApi = todoApi.injectEndpoints({
	endpoints: builder => ({
		listTodo: builder.query<TodoFromBack[], void>({
			query: () => 'todos/',
		}),
	}),
	overrideExisting: false,
})

export const { useListTodoQuery } = listTodoApi

export default listTodoApi
