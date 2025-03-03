<template>
	<form class="mortgage-form" onsubmit="return false" oninput="yearsOutput.value = yearsName.value">
		<div>
			<div class="price-block">
				<div v-if="activeTab === 1">
					<InputComponent
						nameProps="price"
						idProps="price"
						:modelProps="propertyPrice"
						forProps="price"
						labelNameProps="Стоимость недвижимости"
						@inputEmit="propertyPrice = Number($event)"
					/>
				</div>
				<div v-if="activeTab === 2">
					<InputComponent
						nameProps="payment"
						idProps="payment"
						:modelProps="payment"
						forProps="payment"
						labelNameProps="Ежемесячный платеж"
						@inputEmit="payment = Number($event)"
					/>
				</div>
				<InputComponent
					nameProps="contribution"
					idProps="contribution"
					:modelProps="contribution"
					forProps="contribution"
					labelNameProps="Первоначальный взнос"
					@inputEmit="contribution = Number($event)"
				/>
			</div>

			<div class="download-link-container">
				<RangeComponent
					labelForProps="years"
					labelNameProps="Срок в годах: "
					outputForProps="years"
					outputNameProps="yearsOutput"
					inputNameProps="yearsName"
					inputIdProps="years"
					inputMinProps="1"
					inputMaxProps="30"
					:modelProps="period"
					@rangeEmit="period = Number($event)"
				/>
				<Suspense>
					<template #default>
						<DownloadSchedule
							:propertyPrice="propertyPrice.toString()"
							:maxPropertyPrice="maxPropertyPrice.toString()"
							:contribution="contribution.toString()"
							:rate="rate.toString()"
							:period="period.toString()"
							:montlyPropertyTax="montlyPropertyTax.toString()"
						/>
					</template>
					<template #fallback> Идет загрузка... </template>
				</Suspense>
			</div>

			<InputComponent
				nameProps="rate"
				idProps="rate"
				:modelProps="rate"
				forProps="rate"
				labelNameProps="Ставка"
				@inputEmit="rate = Number($event)"
			/>
		</div>
		<div>
			<RateList @rate="rate = $event" />
		</div>
	</form>
</template>

<script setup lang="ts">
import { useMortgageStore } from '@/stores/mortgage';
import { storeToRefs } from 'pinia';
import { computed, ref, watch } from 'vue';
import DownloadSchedule from './DownloadSchedule.vue';
import RateList from './RateList.vue';
import InputComponent from './InputComponent.vue';
import RangeComponent from './RangeComponent.vue';
import type { IMorgageFormEmits } from '@/types/componentTypes';

const { activeTab } = storeToRefs(useMortgageStore());
const emits = defineEmits<IMorgageFormEmits>();

const montlyPropertyTaxRate: number = 0.1;

const rate = ref<number>(10.5);
const period = ref<number>(20);
const propertyPrice = ref<number>(4_000_000);
const payment = ref<number>(30_000);
const contribution = ref<number>(2_500_000);

const maxPropertyPrice = computed<number>(() => {
	const res =
		(payment.value * ((1 + rate.value / 12 / 100) ** (period.value * 12) - 1)) /
			((rate.value / 12 / 100) * (1 + rate.value / 12 / 100) ** (period.value * 12)) +
		contribution.value;
	return Math.round(res) > 0 ? Math.round(res) : 0;
});

const montlyPropertyTax = computed(() => {
	if (activeTab.value === 1) {
		const res = (propertyPrice.value * montlyPropertyTaxRate) / 100 / 12;
		return Math.round(res) > 0 ? Math.round(res) : 0;
	} else if (activeTab.value === 2) {
		const res = (maxPropertyPrice.value * montlyPropertyTaxRate) / 100 / 12;
		return Math.round(res) > 0 ? Math.round(res) : 0;
	}
	return 0;
});

watch(rate, (newValue) => emits('rate', newValue), { immediate: true });
watch(period, (newValue) => emits('period', newValue), { immediate: true });
watch(propertyPrice, (newValue) => emits('propertyPrice', newValue), { immediate: true });
watch(payment, (newValue) => emits('payment', newValue), { immediate: true });
watch(contribution, (newValue) => emits('contribution', newValue), { immediate: true });
watch(maxPropertyPrice, (newValue) => emits('maxPropertyPrice', newValue), { immediate: true });
</script>

<style scoped lang="scss">
.mortgage-form {
	width: 250px 50%;
	padding-right: 100px;
	border-right: 1px solid #d6d9e0;
}

.price-block {
	display: flex;
	gap: 10px;
	flex-wrap: wrap;
}

.form-input {
	margin-bottom: 20px;
	width: 200px;
	display: block;
	position: relative;
	box-sizing: border-box;
}

.download-link-container {
	display: flex;
	flex-wrap: wrap;
	gap: 12px;
	margin-bottom: 10px;
}

.due-date-wrapper {
	display: flex;
	flex-direction: column;
	gap: 6px;
}

input[type='text'] {
	padding: 24px 16px 8px;
	height: 50px;
	font-size: 16px;
	line-height: 24px;
	text-overflow: unset;
	outline: none;
	box-sizing: border-box;
	transition:
		color 0.2s ease-out,
		border-color 0.2s ease-out;
	width: 100%;
	color: #212121;
	border: 1px solid #d6d9e0;
	font-family: inherit;
	margin: 0px;
	appearance: none;
	backface-visibility: hidden;
	border-radius: 8px;
}

input[type='text']:hover {
	border: 1px solid #039be5;
}

input[type='text'] ~ label {
	font-size: 12px;
	line-height: 14px;
	top: 8px;
	transform: none;
	display: block;
	color: rgb(104, 112, 130);
	transition: 0.2s;
	position: absolute;
	left: 0px;
	padding: 0px 16px;
	box-sizing: border-box;
	pointer-events: none;
	width: 100%;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	z-index: 1;
}

input[type='range'] {
	min-width: 200px;
	color: #66b2f3;
}

input[type='range']:hover {
	color: cornflowerblue;
}

@media (max-width: 1280px) {
	.mortgage-form {
		box-sizing: border-box;
		border: 1px solid #d6d9e0;
		border-radius: 20px;
		padding: 40px 80px;
		background: #fbfbfd;
		box-shadow: rgba(22, 33, 54, 0.55) 0px 1px 8px 0px;
	}
}

@media (max-width: 768px) {
	.mortgage-form {
		max-width: 70%;
		display: flex;
		gap: 10px;
		flex-wrap: wrap;
		padding: 40px;
	}
}

@media (max-width: 480px) {
	.mortgage-form {
		padding: 30px;
		min-width: 260px;
	}
}

@media (max-width: 360px) {
	.mortgage-form {
		padding: 20px;
		font-size: 14px;
	}
}
</style>
