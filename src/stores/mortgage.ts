import { defineStore } from 'pinia'
import { mortgageDataApi, mortgageScheduleApi } from '@/api/api'
import { mortgageData } from './mockData'
import type { IMortgageData, LoanResponse, PaymentSchedule } from '../types/storeTypes'
import mortData from './scheduleRequestData.json'
import * as xlsx from 'xlsx'
import { ref } from 'vue'
import { AxiosError } from 'axios'

const MONTH_EN_WORDS = [
	'Jan',
	'Feb',
	'Mar',
	'Apr',
	'May',
	'Jun',
	'Jul',
	'Aug',
	'Sep',
	'Oct',
	'Nov',
	'Dec'
]

const SCHEDULE_HEADERS = [
	'Дата',
	'Основная сумма долга',
	'Начисление процентов',
	'Остаток основного долга'
]

export const useMortgageStore = defineStore('mortgage', () => {
	const formData = ref<IMortgageData[]>([])
	const responseData = ref<IMortgageData[]>([])
	const mortgageRateData = ref<
		Pick<IMortgageData, 'rate_min_secondary' | 'rate_min_new_building' | 'rate_min_house'>
	>({} as Pick<IMortgageData, 'rate_min_secondary' | 'rate_min_new_building' | 'rate_min_house'>)
	const isLoading = ref<boolean>(false)
	const isError = ref<boolean>(false)
	const activeTab = ref<number>(1)

	const setActiveTab = (id: number) => {
		id === 1 ? (id = 1) : (id = 2)
		activeTab.value = id
	}
	const createData = async () => {
		try {
			formData.value = mortgageData
			await mortgageDataApi.post('/api/offer', formData.value)
		} catch (err) {
			console.log(err)
		}
	}
	const getMortgageData = async () => {
		try {
			const { data: mortgageData } = await mortgageDataApi.get('/mortgage')
			responseData.value = mortgageData
			console.log(responseData.value)
			return responseData.value
		} catch (err) {
			console.log(err)
		}
	}
	const postPaymentSchedule = async () => {
		try {
			const { data } = await mortgageScheduleApi.post('/process/morgage?detailed=true', mortData)
			console.log(data)
			return data
		} catch (err) {
			console.log(err)
		}
	}
	const sortMorgageRates = () => {
		if (responseData.value.length > 0 && mortgageRateData) {
			mortgageRateData.value.rate_min_secondary = responseData.value[0].rate_min_secondary
			mortgageRateData.value.rate_min_new_building = responseData.value[0].rate_min_secondary
			mortgageRateData.value.rate_min_house = responseData.value[0].rate_min_secondary

			for (const item of responseData.value) {
				item.rate_min_house > mortgageRateData.value.rate_min_house
					? mortgageRateData.value.rate_min_house
					: (mortgageRateData.value.rate_min_house = item.rate_min_house)

				item.rate_min_new_building > mortgageRateData.value.rate_min_new_building
					? mortgageRateData.value.rate_min_new_building
					: (mortgageRateData.value.rate_min_new_building = item.rate_min_new_building)

				item.rate_min_secondary > mortgageRateData.value.rate_min_secondary
					? mortgageRateData.value.rate_min_secondary
					: (mortgageRateData.value.rate_min_secondary = item.rate_min_secondary)

				console.log(
					mortgageRateData.value.rate_min_secondary,
					mortgageRateData.value.rate_min_new_building,
					mortgageRateData.value.rate_min_house
				)
			}
		}
	}
	const createSummarySheet = (data: LoanResponse): xlsx.WorkSheet => {
		const summaryData = [
			['Информация о задолженности'],
			['Месячный платеж', data.monthlyPayment],
			['Cумма ипотеки', String(data.totalLoanAmount)],
			['Общая сумма процентов', data.totalInterest],
			['Общая выплата', data.totalCost],
			['Дата погашения', data.payOffDate]
		]

		const worksheet = xlsx.utils.aoa_to_sheet(summaryData)

		worksheet['!cols'] = [{ wch: 28 }, { wch: 14 }]

		return worksheet
	}
	const createScheduleSheet = (paymentSchedule: PaymentSchedule[]) => {
		const day =
			new Date().getDate() < 10 ? 0 + String(new Date().getDate()) : String(new Date().getDate())
		const month = (param: PaymentSchedule) => {
			return MONTH_EN_WORDS.indexOf(param.month) + 1 < 10
				? 0 + String(MONTH_EN_WORDS.indexOf(param.month) + 1)
				: String(MONTH_EN_WORDS.indexOf(param.month) + 1)
		}
		const year = (param: PaymentSchedule) => String(param.year)

		const scheduleData = paymentSchedule.map((payment) => ({
			Дата: day + '.' + month(payment) + '.' + year(payment),
			'Основная сумма долга': payment.principal,
			'Начисление процентов': payment.interest,
			'Остаток основного долга': payment.remainingBalance
		}))

		const worksheet = xlsx.utils.json_to_sheet(scheduleData, {
			header: SCHEDULE_HEADERS
		})

		//Установка ширины столбцов
		worksheet['!cols'] = [
			{ wch: 10 }, // Date
			{ wch: 20 }, // Principal
			{ wch: 20 }, // Interest
			{ wch: 23 } // Remaining Balance
		]
		return worksheet
	}
	const convertLoanDataToExcel = (data: LoanResponse): void => {
		const workbook = xlsx.utils.book_new()

		// Добавляем лист с графиком платежей
		const scheduleSheet = createScheduleSheet(data.paymentSchedule)
		xlsx.utils.book_append_sheet(workbook, scheduleSheet, 'График платежей')

		// Добавляем лист с общей информацией
		const summarySheet = createSummarySheet(data)
		xlsx.utils.book_append_sheet(workbook, summarySheet, 'Информация о задолженности')

		// Сохраняем и скачиваем файл
		xlsx.writeFile(workbook, 'schedule.xlsx')
	}
	const downloadSchedule = async () => {
		try {
			const data = await postPaymentSchedule()
			if (data) {
				convertLoanDataToExcel(data as unknown as LoanResponse)
			}
		} catch (err) {
			if (err instanceof AxiosError) console.error(err.message)
		}
	}

	return {
		activeTab,
		setActiveTab,
		getMortgageData,
		sortMorgageRates,
		downloadSchedule,
		mortgageRateData
	}
})
