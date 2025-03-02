<template>
	<section class="refinance-calculator">
		<div>
			<RefinanceForm
				formHeader="Текущий кредит"
				:debtModel="debtBalance"
				debtLabel="Остаток долга"
				:contributionModel="currentRate"
				contributionLabel="Ставка"
				:dueDateModel="currentDueDate"
				dueDateLabel="Срок в годах: "
				@debtEmit="debtBalanceEmit = $event"
				@contributionEmit="currentRateEmit = $event"
				@dueDateEmit="currentDueDateEmit = $event"
			/>
		</div>
		<div>
			<RefinanceForm
				formHeader="Новый кредит"
				:debtModel="debtAmount"
				debtLabel="Остаток долга"
				:contributionModel="newRate"
				contributionLabel="Ставка"
				:dueDateModel="newDueDate"
				dueDateLabel="Срок в годах: "
				@debtEmit="debtAmountEmit = $event"
				@contributionEmit="newRateEmit = $event"
				@dueDateEmit="newDueDateEmit = $event"
			/>
		</div>
	</section>
</template>

<script setup lang="ts">
import { useRefinanceStore } from '@/stores/refinance';
import RefinanceForm from './RefinanceForm.vue';
import { storeToRefs } from 'pinia';
import { ref, watch } from 'vue';

const refinanceStore = useRefinanceStore();
const { debtBalance, currentRate, currentDueDate, debtAmount, newRate, newDueDate } =
	storeToRefs(refinanceStore);

const debtBalanceEmit = ref<number>(2_000_000);
const currentRateEmit = ref<number>(17.5);
const currentDueDateEmit = ref<number>(10);

const debtAmountEmit = ref<number>(2_000_000);
const newRateEmit = ref<number>(12.5);
const newDueDateEmit = ref<number>(10);

watch(debtBalanceEmit, (newVal) => (debtBalance.value = newVal), { immediate: true });
watch(currentRateEmit, (newVal) => (currentRate.value = newVal), { immediate: true });
watch(currentDueDateEmit, (newVal) => (currentDueDate.value = newVal), { immediate: true });

watch(debtAmountEmit, (newVal) => (debtAmount.value = newVal), { immediate: true });
watch(newRateEmit, (newVal) => (newRate.value = newVal), { immediate: true });
watch(newDueDateEmit, (newVal) => (newDueDate.value = newVal), { immediate: true });
</script>

<style scoped lang="scss">
.refinance-calculator {
	background: white;
	padding: 30px;
	min-height: 310px;
	border-right: 1px solid #d6d9e0;
	padding-right: 100px;
}

@media (max-width: 1280px) {
	.refinance-calculator {
		display: flex;
		gap: 20px;
		border: 1px solid #d6d9e0;
		border-radius: 20px;
		padding: 40px;
		background: white;
	}
}

@media (max-width: 768px) {
	.refinance-calculator {
		max-width: 80%;
		flex-wrap: wrap;
	}
}

@media (max-width: 480px) {
	.refinance-calculator {
		min-width: 300px;
	}
}

@media (max-width: 360px) {
	.refinance-calculator {
		font-size: 14px;
	}
}
</style>
