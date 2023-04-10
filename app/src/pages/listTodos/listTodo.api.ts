import { TodoFromBack } from '../../common/models/todo'
import { todoApi } from '../../store/api'

const listTodoApi = todoApi.injectEndpoints({
	endpoints: builder => ({
		listTodo: builder.query<TodoFromBack[], void>({
			query: () => 'todos/',
		}),
		changeTodoState: builder.query<
			TodoFromBack,
			{ isDone: boolean; id: string }
		>({
			query: ({ isDone, id }) => ({
				url: `todos/${id}`,
				method: 'PATCH',
				body: { isDone },
			}),
			async onQueryStarted({ isDone, id }, { dispatch, queryFulfilled }) {
				const patchResult = dispatch(
					listTodoApi.util.updateQueryData(
						'listTodo',
						undefined,
						draft => {
							draft[
								draft.findIndex(todo => todo._id === id)
							].isDone = isDone
						}
					)
				)
				try {
					await queryFulfilled
				} catch {
					patchResult.undo()
				}
			},
		}),
	}),
	overrideExisting: false,
})

export const { useListTodoQuery, useLazyChangeTodoStateQuery } = listTodoApi

export default listTodoApi
