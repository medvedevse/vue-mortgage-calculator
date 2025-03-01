import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useRefinanceStore = defineStore('refinance', () => {
	const debtBalance = ref<number>(0)
	const currentDueDate = ref<number>(0)
	const currentRate = ref<number>(0)

	const debtAmount = ref<number>(0)
	const newDueDate = ref<number>(0)
	const newRate = ref<number>(0)

	// current

	const currentMontlyPayment = computed<number>(() => {
		const res =
			(debtBalance.value *
				(currentRate.value / 12 / 100) *
				(1 + currentRate.value / 12 / 100) ** (currentDueDate.value * 12)) /
			((1 + currentRate.value / 12 / 100) ** (currentDueDate.value * 12) - 1)
		return Math.round(res) > 0 ? Math.round(res) : 0
	})

	const currentCommonPayment = computed<number>(() => {
		const res = currentMontlyPayment.value * currentDueDate.value * 12
		return Math.round(res) > 0 ? Math.round(res) : 0
	})

	const currentOverpayment = computed<number>(() => {
		const res = currentCommonPayment.value - debtBalance.value
		return Math.round(res) > 0 ? Math.round(res) : 0
	})

	// new

	const newMontlyPayment = computed<number>(() => {
		const res =
			(debtAmount.value *
				(newRate.value / 12 / 100) *
				(1 + newRate.value / 12 / 100) ** (newDueDate.value * 12)) /
			((1 + newRate.value / 12 / 100) ** (newDueDate.value * 12) - 1)
		return Math.round(res) > 0 ? Math.round(res) : 0
	})

	const newCommonPayment = computed<number>(() => {
		const res = newMontlyPayment.value * newDueDate.value * 12
		return Math.round(res) > 0 ? Math.round(res) : 0
	})

	const newOverpayment = computed<number>(() => {
		const res = newCommonPayment.value - debtAmount.value
		return Math.round(res) > 0 ? Math.round(res) : 0
	})

	const montlyPaymentDiff = computed<number>(() => {
		const res = currentMontlyPayment.value - newMontlyPayment.value
		return Math.round(res) > 0 ? Math.round(res) : 0
	})

	return {
		debtBalance,
		currentDueDate,
		currentRate,
		debtAmount,
		newDueDate,
		newRate,
		currentOverpayment,
		newOverpayment,
		montlyPaymentDiff,
		currentMontlyPayment,
		newMontlyPayment
	}
})
