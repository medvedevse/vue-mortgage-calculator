<template>
	<div>
		<LoaderComponent v-if="downloadScheduleIsLoading" />
		<div v-else>
			<button class="download-button" @click="handleDownloadSchedule">{{ linkText }}</button>
		</div>
		<ErrorComponent v-if="downloadScheduleIsError" message="Возникла ошибка при загрузке!" />
	</div>
</template>

<script setup lang="ts">
import mortData from '@/stores/scheduleRequestData.json';
import { useMortgageStore } from '@/stores/mortgage';
import { ref } from 'vue';
import type { ILinkComponentProps } from '@/types/componentTypes';
import { storeToRefs } from 'pinia';
import LoaderComponent from './LoaderComponent.vue';
import ErrorComponent from './ErrorComponent.vue';

const mortgageStore = useMortgageStore();
const { downloadSchedule } = mortgageStore;
const { activeTab } = storeToRefs(mortgageStore);

const downloadScheduleIsLoading = ref<boolean>(false);
const downloadScheduleIsError = ref<boolean>(false);

const linkText = ref<string>('Скачать график платежей*');

const props = defineProps<ILinkComponentProps>();
const handleDownloadSchedule = async () => {
	if (activeTab.value === 1) {
		mortData.homePrice = Number(props.propertyPrice);
	} else if (activeTab.value === 2) {
		mortData.homePrice = Number(props.maxPropertyPrice);
	}
	mortData.downPayment = Number(props.contribution);
	mortData.annualInterestRate = Number(props.rate);
	mortData.loanTermInYears = Number(props.period);
	mortData.propertyTaxPerMonth = Number(props.montlyPropertyTax);

	try {
		downloadScheduleIsError.value = false;
		downloadScheduleIsLoading.value = true;
		await downloadSchedule();
	} catch (error) {
		downloadScheduleIsError.value = true;
		console.error('Ошибка при скачивании:', error);
	} finally {
		downloadScheduleIsLoading.value = false;
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
