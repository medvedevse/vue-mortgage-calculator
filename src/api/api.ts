import axios from 'axios'

export const mortgageDataApi = axios.create({
	baseURL: import.meta.env.VITE_MORTGAGE_DATA_URL,
	headers: {
		'Content-Type': 'application/json'
	}
})

export const mortgageScheduleApi = axios.create({
	baseURL: import.meta.env.VITE_SCHEDULE_URL,

	headers: {
		'Content-Type': 'application/json',
		'x-rapidapi-host': 'mortgage-calculator-with-amortization-schedule-breakdown.p.rapidapi.com',
		'x-rapidapi-key': '3a7497888bmsh777cefac63e6ca1p19b3ecjsn53a891167993'
	}
})
