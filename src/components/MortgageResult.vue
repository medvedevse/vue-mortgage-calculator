<template>
	<div class="mortgage-description">
		<div v-if="activeTab === 1">
			<DetailComponent
				:detailValue="montlyPayment"
				detailName="Ежемесячный платеж"
				detailClass="bright"
			/>
		</div>
		<div v-if="activeTab === 2">
			<DetailComponent
				:detailValue="maxPropertyPriceProps"
				detailName="Максимальная сумма недвижимости"
				detailClass="bright"
			/>
		</div>
		<DetailComponent :detailValue="overpayment" detailName="Переплата по кредиту" />
		<DetailComponent :detailValue="recommendedIncome" detailName="Рекомендуемый доход" />
		<DetailComponent :detailValue="creditAmount" detailName="Сумма кредита" />
		<DetailComponent :detailValue="commonPayment" detailName="Общая выплата" />
		<DetailComponent :detailValue="taxDeduction" detailName="Налоговый вычет" />
	</div>
</template>

<script setup lang="ts">
import { useMortgageStore } from '@/stores/mortgage';
import { storeToRefs } from 'pinia';
import { computed, toRefs } from 'vue';
import DetailComponent from './DetailComponent.vue';
import type { IMorgageResultProps } from '@/types/componentTypes';

const { activeTab } = storeToRefs(useMortgageStore());
const props = defineProps<IMorgageResultProps>();
const {
	rateProps,
	periodProps,
	contributionProps,
	maxPropertyPriceProps,
	paymentProps,
	propertyPriceProps
} = toRefs(props);

const paymentIncomeRatio: number = 0.35;
const taxRate: number = 0.13;
const maxAmountForTaxDeduction: number = 2_000_000;
const maxOverpayment: number = 3_000_000;

const creditAmount = computed<number>(() => {
	if (activeTab.value === 1) {
		const res = propertyPriceProps.value - contributionProps.value;
		return Math.round(res) > 0 ? Math.round(res) : 0;
	} else if (activeTab.value === 2) {
		const res = maxPropertyPriceProps.value - contributionProps.value;
		return Math.round(res) > 0 ? Math.round(res) : 0;
	}
	return 0;
});

const montlyPayment = computed<number>(() => {
	const res =
		(creditAmount.value *
			(rateProps.value / 12 / 100) *
			(1 + rateProps.value / 12 / 100) ** (periodProps.value * 12)) /
		((1 + rateProps.value / 12 / 100) ** (periodProps.value * 12) - 1);
	return Math.round(res) > 0 ? Math.round(res) : 0;
});

const commonPayment = computed<number>(() => {
	if (activeTab.value === 1) {
		const res = montlyPayment.value * periodProps.value * 12;
		return Math.round(res) > 0 ? Math.round(res) : 0;
	} else if (activeTab.value === 2) {
		const res = paymentProps.value * periodProps.value * 12;
		return Math.round(res) > 0 ? Math.round(res) : 0;
	}
	return 0;
});

const overpayment = computed<number>(() => {
	const res = commonPayment.value - creditAmount.value;
	return Math.round(res) > 0 ? Math.round(res) : 0;
});

const recommendedIncome = computed<number>(() => {
	if (activeTab.value === 1) {
		const res = montlyPayment.value / paymentIncomeRatio;
		return Math.round(res) > 0 ? Math.round(res) : 0;
	} else if (activeTab.value === 2) {
		const res = paymentProps.value / paymentIncomeRatio;
		return Math.round(res) > 0 ? Math.round(res) : 0;
	}
	return 0;
});

const taxDeduction = computed<number>(() => {
	if (activeTab.value === 1) {
		const propertyAmount =
			propertyPriceProps.value > maxAmountForTaxDeduction
				? maxAmountForTaxDeduction
				: propertyPriceProps.value;

		const overpaymentAmount =
			overpayment.value > maxOverpayment ? maxOverpayment : overpayment.value;
		const res = propertyAmount * taxRate + overpaymentAmount * taxRate;

		return Math.round(res) > 0 ? Math.round(res) : 0;
	} else if (activeTab.value === 2) {
		const propertyAmount =
			maxPropertyPriceProps.value > maxAmountForTaxDeduction
				? maxAmountForTaxDeduction
				: maxPropertyPriceProps.value;

		const overpaymentAmount =
			overpayment.value > maxOverpayment ? maxOverpayment : overpayment.value;
		const res = propertyAmount * taxRate + overpaymentAmount * taxRate;

		return Math.round(res) > 0 ? Math.round(res) : 0;
	}
	return 0;
});
</script>

<style scoped lang="scss">
.mortgage-description {
	max-width: 50%;
	padding-left: 100px;
	border-left: 1px solid #d6d9e0;
	font-size: 18px;
	display: grid;
	grid-template-columns: repeat(2, 200px);
	gap: 20px;
	text-align: center;
}
</style>
