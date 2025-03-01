import express from 'express'
import cors from 'cors'
import multer from 'multer'
import { RequestHandler, Request, Response } from 'express'
import type { IMortgageData } from './types'

const app = express()
const upload = multer()
const port = 8000

// Middleware для обработки данных в формате form-data
app.use(cors())
app.use(express.json()) // Для обработки JSON
app.use(express.urlencoded({ extended: true })) // Для обработки form-data

let mortgageData: IMortgageData[] = []

const handleMortgageOffer: RequestHandler = async (req: Request, res: Response) => {
	try {
		mortgageData = []

		if (!req.body) {
			res.status(400).json({ error: 'Отсутствуют данные в запросе' })
			return
		}

		for (const elem of req.body) {
			const {
				bank_name,
				term_min,
				term_max,
				rate_min_secondary,
				rate_min_new_building,
				rate_min_house,
				payment_min,
				payment_max
			} = elem

			mortgageData.push({
				bank_name,
				term_min,
				term_max,
				rate_min_secondary,
				rate_min_new_building,
				rate_min_house,
				payment_min,
				payment_max
			})
		}

		res.status(200).json({
			message: 'Данные сформированы',
			data: mortgageData
		})
	} catch (err) {
		console.error(err)
		res.status(500).json({ error: 'Ошибка при обработке данных' })
	}
}

// Маршрут для обработки запросов на /api/offer
app.post('/api/offer/', upload.none(), handleMortgageOffer)

app.get('/api/offer/', (req: Request, res: Response) => {
	if (mortgageData.length > 0) {
		res.json(mortgageData)
	} else {
		res.status(404).json({ error: 'Данные не найдены' })
	}
})

app.listen(port, () => {
	console.log(`Сервер запущен на http://localhost:${port}`)
})
