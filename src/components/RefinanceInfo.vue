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
import { useRefinanceStore } from '@/stores/refinance';
import DetailComponent from './DetailComponent.vue';
import { storeToRefs } from 'pinia';
import AmountDifference from './AmountDifference.vue';

const refinanceStore = useRefinanceStore();
const {
	currentMontlyPayment,
	newMontlyPayment,
	currentOverpayment,
	newOverpayment,
	montlyPaymentDiff
} = storeToRefs(refinanceStore);
</script>

<style scoped lang="scss">
.refinance-info-section {
	display: grid;
	align-items: center;
}

.refinance-description {
	padding-left: 70px;
	font-size: 18px;
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
	gap: 26px 36px;
	text-align: center;
}

@media (max-width: 1280px) {
	.refinance-description {
		box-sizing: border-box;
		max-width: 100%;
		border: 1px solid #d6d9e0;
		border-radius: 20px;
		padding: 40px;
		margin-bottom: 10px;
		background: #fbfbfd;
		min-height: 304px;
		box-shadow: rgba(22, 33, 54, 0.55) 0px 1px 8px 0px;
	}
}

@media (max-width: 768px) {
	.refinance-description {
		grid-template-columns: repeat(auto-fit, minmax(140px, 160px));
	}
}

@media (max-width: 480px) {
	.refinance-description {
		gap: 10px;
		padding: 20px;
	}

	.refinance-description h3 {
		font-size: 18px;
	}
}
</style>
