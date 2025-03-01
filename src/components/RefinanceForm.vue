<template>
	<h2>{{ formHeader }}</h2>
	<form
		class="refinance-form"
		onsubmit="return false"
		oninput="yearsOutput.value = yearsName.value"
	>
		<div class="debt-block">
			<InputComponent
				forProps="debt"
				idProps="debt"
				:labelNameProps="debtLabel"
				:modelProps="debtModel"
				nameProps="debt"
				@inputEmit="debtEmit = Number($event)"
			/>
			<InputComponent
				forProps="contribution"
				idProps="contribution"
				:labelNameProps="contributionLabel"
				:modelProps="contributionModel"
				nameProps="contribution"
				@inputEmit="contributionEmit = Number($event)"
			/>
		</div>

		<RangeComponent
			inputIdProps="years"
			inputMaxProps="30"
			inputMinProps="1"
			inputNameProps="yearsName"
			labelForProps="years"
			:labelNameProps="dueDateLabel"
			:modelProps="dueDateModel"
			outputForProps="years"
			outputNameProps="yearsOutput"
			range-class="input-range"
			@rangeEmit="dueDateEmit = Number($event)"
		/>
	</form>
</template>

<script setup lang="ts">
import { defineComponent, ref, toRefs, watch } from 'vue';
import InputComponent from './InputComponent.vue';
import RangeComponent from './RangeComponent.vue';
import type { IRefinanceFormEmits, IRefinanceFormProps } from '@/types/componentTypes';

defineComponent({ name: 'RefinanceForm' });

const props = defineProps<IRefinanceFormProps>();
const { contributionModel, debtModel, dueDateModel } = toRefs(props);

const debtEmit = ref<number>(0);
const contributionEmit = ref<number>(0);
const dueDateEmit = ref<number>(0);

const emits = defineEmits<IRefinanceFormEmits>();

watch(debtEmit, (newVal) => emits('debtEmit', newVal), { immediate: true });
watch(contributionEmit, (newVal) => emits('contributionEmit', newVal), { immediate: true });
watch(dueDateEmit, (newVal) => emits('dueDateEmit', newVal), { immediate: true });
</script>

<style scoped lang="scss">
h2 {
	margin-bottom: 15px;
}

.refinance-form {
	margin-bottom: 10px;
}

.debt-block {
	display: flex;
	gap: 10px;
	flex-wrap: wrap;
}
</style>
