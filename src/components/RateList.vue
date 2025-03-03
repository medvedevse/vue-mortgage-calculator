<template>
	<ul class="list-rate-buttons">
		<li>
			<LoaderComponent v-if="rateListIsLoading" />
			<PressButton
				v-else
				:text="rateSecondaryProps"
				@click="getRate(mortgageRateData.rate_min_secondary)"
			/>
		</li>
		<li>
			<LoaderComponent v-if="rateListIsLoading" />
			<PressButton
				v-else
				:text="rateNewBuildingProps"
				@click="getRate(mortgageRateData.rate_min_new_building)"
			/>
		</li>
		<li>
			<LoaderComponent v-if="rateListIsLoading" />
			<PressButton
				v-else
				:text="rateHouseProps"
				@click="getRate(mortgageRateData.rate_min_house)"
			/>
		</li>
	</ul>
	<ErrorComponent v-if="rateListIsError" message="Выгодные ставки не найдены!" />
</template>

<script async setup lang="ts">
import { useMortgageStore } from '@/stores/mortgage';
import PressButton from './PressButton.vue';
import { onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { AxiosError } from 'axios';
import type { IRateListEmits } from '@/types/componentTypes';
import LoaderComponent from './LoaderComponent.vue';
import ErrorComponent from './ErrorComponent.vue';

const { getMortgageData, sortMorgageRates } = useMortgageStore();
const { mortgageRateData } = storeToRefs(useMortgageStore());

const rateListIsLoading = ref<boolean>(false);
const rateListIsError = ref<boolean>(false);

const rateSecondaryProps = ref<string>('');
const rateNewBuildingProps = ref<string>('');
const rateHouseProps = ref<string>('');

onMounted(async () => {
	try {
		rateListIsError.value = false;
		rateListIsLoading.value = true;
		const data = await getMortgageData();
		if (data) sortMorgageRates();
	} catch (err) {
		rateListIsError.value = true;
		if (err instanceof AxiosError) {
			console.error(new Error('Ошибка при загрузке ставок: ' + err.message));
		}
	} finally {
		rateListIsLoading.value = false;
	}

	rateSecondaryProps.value = `Вторичка от ${mortgageRateData.value.rate_min_secondary ? mortgageRateData.value.rate_min_secondary : 0}%`;
	rateNewBuildingProps.value = `Новостройка от ${mortgageRateData.value.rate_min_new_building ? mortgageRateData.value.rate_min_new_building : 0}%`;
	rateHouseProps.value = `Дом (ИЖС) от ${mortgageRateData.value.rate_min_house ? mortgageRateData.value.rate_min_house : 0}%`;
});
const emits = defineEmits<IRateListEmits>();
const getRate = (value: number) => emits('rate', value);
</script>

<style scoped lang="scss">
.list-rate-buttons {
	list-style: none;
	padding-inline-start: 0;
	display: flex;
	gap: 10px;
	flex-wrap: wrap;
	margin-bottom: 10px;
	a {
		background: #66b2f3;
		color: whitesmoke;
		border-radius: 5px;
		padding: 6px 8px;
	}
}
</style>
