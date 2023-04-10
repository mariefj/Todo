import { useParams } from 'react-router-dom'

export const ViewTodo = () => {
	const { id } = useParams()
	return <div>{`hello world ${id}`}</div>
}

export default ViewTodo
