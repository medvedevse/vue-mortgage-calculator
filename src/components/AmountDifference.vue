<template>
	<p class="amount-difference">{{ amountDiffText }} {{ formatNumber(amountDiff) }}&#8381;</p>
</template>

<script setup lang="ts">
import type { IAmountDifferenceProps } from '@/types/componentTypes';
import { formatNumber } from '@/utils/utils';
import { defineComponent } from 'vue';

defineComponent({ name: 'AmountDifference' });

defineProps<IAmountDifferenceProps>();
</script>

<style scoped lang="scss">
.amount-difference {
	grid-column: 1 / 3;
	padding: 10px;
	border-radius: 6px;
	color: #162136;
	background: #daeeff33;
	font-size: 16px;
}
</style>
