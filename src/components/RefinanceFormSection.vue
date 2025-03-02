<template>
	<section class="refinance-calculator">
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

// console.log(debtBalanceEmit.value);

watch(debtBalanceEmit, (newVal) => (debtBalance.value = newVal), { immediate: true });
watch(currentRateEmit, (newVal) => (currentRate.value = newVal), { immediate: true });
watch(currentDueDateEmit, (newVal) => (currentDueDate.value = newVal), { immediate: true });

watch(debtAmountEmit, (newVal) => (debtAmount.value = newVal), { immediate: true });
watch(newRateEmit, (newVal) => (newRate.value = newVal), { immediate: true });
watch(newDueDateEmit, (newVal) => (newDueDate.value = newVal), { immediate: true });
</script>

<style scoped lang="scss">
.refinance-section {
	background: white;
	border-radius: 20px;
	padding: 30px;
	min-height: 310px;
	margin-bottom: 20px;
}
</style>
