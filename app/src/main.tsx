import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'

import { store } from './store'

import './index.css'
import ListTodo from './pages/listTodos'
import ViewTodo from './pages/viewTodo'

const router = createBrowserRouter([
	{
		path: '/',
		element: <ListTodo />,
	},
	{
		path: '/:id',
		element: <ViewTodo />,
	},
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</React.StrictMode>
)
