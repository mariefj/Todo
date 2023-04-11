/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react'
import ReactDOM from 'react-dom/client'
import {
	createBrowserRouter,
	RouterProvider,
	useRouteError,
} from 'react-router-dom'
import { Provider } from 'react-redux'

import { store } from './store'

import './index.css'
import ListTodo from './pages/listTodos'
import ViewTodo from './pages/viewTodo'
import CreateTodo from './pages/createTodo'

const NotFoundPage = () => <div>Not Found</div>

const ErrorPage = () => {
	const error = useRouteError() as Error
	return <div>An unexpected error occured: {error.toString()}</div>
}

const router = createBrowserRouter([
	{
		// @ts-ignore
		path: `${window.globalConfig.BASE_PATH}/`,
		element: <ListTodo />,
		errorElement: <ErrorPage />,
	},
	{
		// @ts-ignore
		path: `${window.globalConfig.BASE_PATH}/:id`,
		element: <ViewTodo />,
		errorElement: <ErrorPage />,
	},
	{
		// @ts-ignore
		path: `${window.globalConfig.BASE_PATH}/createTodo`,
		element: <CreateTodo />,
		errorElement: <ErrorPage />,
	},
	{
		path: '*',
		element: <NotFoundPage />,
		errorElement: <ErrorPage />,
	},
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</React.StrictMode>
)
