import axios from 'axios';

export const mortgageDataApi = axios.create({
	baseURL: import.meta.env.VITE_MORTGAGE_DATA_URL,
	headers: {
		'Content-Type': 'application/json'
	}
});

/*
 * Ручка для графика платежей: https://rapidapi.com/avron-digital-avron-digital-default/api/mortgage-calculator-with-amortization-schedule-breakdown/playground/apiendpoint_beeb7aa5-f8bc-4fbe-95f4-a5ed9c37b45a
 */
export const mortgageScheduleApi = axios.create({
	baseURL: import.meta.env.VITE_SCHEDULE_URL,
	headers: {
		'Content-Type': 'application/json',
		'x-rapidapi-host': 'mortgage-calculator-with-amortization-schedule-breakdown.p.rapidapi.com',
		'x-rapidapi-key': '3a7497888bmsh777cefac63e6ca1p19b3ecjsn53a891167993'
	}
});
