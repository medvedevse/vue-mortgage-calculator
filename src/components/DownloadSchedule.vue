<template>
	<div>
		<button class="download-button" @click="handleDownloadSchedule">{{ linkText }}</button>
	</div>
</template>

<script setup lang="ts">
import mortData from '@/stores/scheduleRequestData.json';
import { useMortgageStore } from '@/stores/mortgage';
import { ref } from 'vue';
import type { ILinkComponentProps } from '@/types/componentTypes';

const mortgageStore = useMortgageStore();

const linkText = ref<string>('Скачать график платежей*');

const props = defineProps<ILinkComponentProps>();
const handleDownloadSchedule = async () => {
	if (mortgageStore.activeTab === 1) {
		mortData.homePrice = Number(props.propertyPrice);
	} else if (mortgageStore.activeTab === 2) {
		mortData.homePrice = Number(props.maxPropertyPrice);
	}
	mortData.downPayment = Number(props.contribution);
	mortData.annualInterestRate = Number(props.rate);
	mortData.loanTermInYears = Number(props.period);
	mortData.propertyTaxPerMonth = Number(props.montlyPropertyTax);

	try {
		await mortgageStore.downloadSchedule();
	} catch (error) {
		console.error('Ошибка при скачивании:', error);
	}
};
</script>

<style scoped lang="scss">
.download-button {
	border: none;
	background: transparent;
	cursor: pointer;
	color: cornflowerblue;
	font-size: 16px;
}

.download-button:hover {
	background-color: aliceblue;
	border-radius: 6px;
}

@media (max-width: 360px) {
	.download-button {
		font-size: 14px;
	}
}
</style>
