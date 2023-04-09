import winston from 'winston'

export const logger = winston.createLogger({
	level: 'http',
	format: winston.format.combine(
		winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
		winston.format.colorize(),
		winston.format.printf(msg => {
			return `${msg.timestamp} - ${msg.level} - ${msg.message}`
		})
	),
	transports: [new winston.transports.Console()],
})
