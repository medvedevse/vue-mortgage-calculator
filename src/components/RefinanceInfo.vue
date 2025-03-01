<template>
	<section class="refinance-info-section">
		<div class="refinance-description">
			<h3>Текущий кредит</h3>
			<h3>Новый кредит</h3>
			<DetailComponent detailName="Ежемесячный платеж" :detailValue="currentMontlyPayment" />
			<DetailComponent
				detailName="Ежемесячный
				платеж"
				:detailValue="newMontlyPayment"
				detailClass="bright"
			/>
			<DetailComponent detailName="Начисленные проценты" :detailValue="currentOverpayment" />
			<DetailComponent detailName="Начисленные проценты" :detailValue="newOverpayment" />
			<AmountDifference
				amountDiffText="Сумма ежемесячного платежа изменилась на "
				:amountDiff="montlyPaymentDiff"
			/>
		</div>
	</section>
</template>

<script setup lang="ts">
import { useRefinanceStore } from '@/stores/refinance'
import DetailComponent from './DetailComponent.vue'
import { storeToRefs } from 'pinia'
import AmountDifference from './AmountDifference.vue'

const refinanceStore = useRefinanceStore()
const {
	currentMontlyPayment,
	newMontlyPayment,
	currentOverpayment,
	newOverpayment,
	montlyPaymentDiff
} = storeToRefs(refinanceStore)
</script>

<style scoped lang="scss">
.refinance-info-section {
	display: grid;
	align-items: center;
}

.refinance-description {
	max-width: 50%;
	padding-left: 100px;
	font-size: 18px;
	display: grid;
	grid-template-columns: repeat(2, 200px);
	gap: 26px 36px;
	text-align: center;
}

.amount-difference {
	grid-column: 1 / 3;
	padding: 10px;
	border-radius: 6px;
	color: #162136;
	background: #daeeff33;
	font-size: 16px;
}
</style>
