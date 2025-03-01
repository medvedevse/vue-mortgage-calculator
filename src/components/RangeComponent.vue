<template>
	<div class="due-date-wrapper">
		<div>
			<label :for="labelForProps">{{ labelNameProps }}</label>
			<output :for="outputForProps" :name="outputNameProps">{{ modelValue }}</output>
		</div>
		<input
			type="range"
			:name="inputNameProps"
			:id="inputIdProps"
			:min="inputMinProps"
			:max="inputMaxProps"
			v-model="modelValue"
			:class="rangeClass"
		/>
	</div>
</template>

<script setup lang="ts">
import type { IRangeComponentEmits, IRangeComponentProps } from '@/types/componentTypes';
import { defineComponent, ref, toRefs, watch } from 'vue';

defineComponent({ name: 'RangeComponent' });

const props = defineProps<IRangeComponentProps>();
const { modelProps } = toRefs(props);

const emits = defineEmits<IRangeComponentEmits>();

const modelValue = ref<number>(modelProps.value);

watch(modelValue, (newValue) => emits('rangeEmit', newValue), { immediate: true });
</script>

<style scoped lang="scss">
.due-date-wrapper {
	display: flex;
	flex-direction: column;
	gap: 6px;
}

input[type='range'] {
	min-width: 200px;
	color: #66b2f3;
}

input[type='range']:hover {
	color: cornflowerblue;
}

.input-range {
	max-width: 200px;
	color: #66b2f3;
}
</style>
