<script setup lang="ts">
import PressButton from './PressButton.vue'
import { useMortgageStore } from '../stores/mortgage'
import { storeToRefs } from 'pinia'

const { setActiveTab } = useMortgageStore()
const { activeTab } = storeToRefs(useMortgageStore())
</script>

<template>
	<div class="tabs">
		<div>
			<PressButton
				text="По стоимости"
				:class="{ active: activeTab === 1 }"
				@click="setActiveTab(1)"
			/>
		</div>
		<div>
			<PressButton
				text="По платежу"
				:class="{ active: activeTab === 2 }"
				@click="setActiveTab(2)"
			/>
		</div>
	</div>
</template>

<style scoped lang="scss">
.tabs {
	display: flex;
	gap: 10px;
}

@media (max-width: 768px) {
	.tabs {
		margin-right: 30px;
	}
}

@media (max-width: 360px) {
	.tabs {
		gap: 6px;
	}
}
</style>
