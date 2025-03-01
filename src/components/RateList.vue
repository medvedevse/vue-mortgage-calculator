<template>
	<ul class="list-rate-buttons">
		<li>
			<PressButton
				:text="rateSecondaryProps"
				@click="getRate(mortgageRateData.rate_min_secondary)"
			/>
		</li>
		<li>
			<PressButton
				:text="rateNewBuildingProps"
				@click="getRate(mortgageRateData.rate_min_new_building)"
			/>
		</li>
		<li>
			<PressButton :text="rateHouseProps" @click="getRate(mortgageRateData.rate_min_house)" />
		</li>
	</ul>
</template>

<script async setup lang="ts">
import { useMortgageStore } from '@/stores/mortgage'
import PressButton from './PressButton.vue'
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { AxiosError } from 'axios'
import type { IRateListEmits } from '@/types/componentTypes'

const { getMortgageData, sortMorgageRates } = useMortgageStore()
const { mortgageRateData } = storeToRefs(useMortgageStore())

const rateSecondaryProps = ref<string>('')
const rateNewBuildingProps = ref<string>('')
const rateHouseProps = ref<string>('')

onMounted(async () => {
	try {
		const data = await getMortgageData()
		if (data) sortMorgageRates()
	} catch (err) {
		if (err instanceof AxiosError) {
			rateSecondaryProps.value = '0'
			rateNewBuildingProps.value = '0'
			rateHouseProps.value = '0'
			alert('Выгодные ставки не найдены!')
			console.error(err.message)
		}
	}

	rateSecondaryProps.value = `Вторичка от ${mortgageRateData.value.rate_min_secondary}%`
	rateNewBuildingProps.value = `Новостройка от ${mortgageRateData.value.rate_min_new_building}%`
	rateHouseProps.value = `Вторичка от ${mortgageRateData.value.rate_min_house}%`
})
const emits = defineEmits<IRateListEmits>()
const getRate = (value: number) => emits('rate', value)
</script>

<style scoped lang="scss">
.list-rate-buttons {
	list-style: none;
	padding-inline-start: 0;
	display: flex;
	gap: 10px;
	flex-wrap: wrap;
	a {
		background: #66b2f3;
		color: whitesmoke;
		border-radius: 5px;
		padding: 6px 8px;
	}
}
</style>
