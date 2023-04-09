import { Response } from 'express'

export const mockResponse = () => {
	const res = {} as unknown as Response
	res.json = jest.fn()
	res.status = jest.fn(() => res)
	return res
}
