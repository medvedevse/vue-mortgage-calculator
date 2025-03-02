<template>
	<p class="detail-item">
		<span :class="detailClass">{{ formatNumber(detailValue) }} &#8381;</span><br />{{ detailName }}
	</p>
</template>

<script setup lang="ts">
import type { IMortgageDetailProps } from '@/types/componentTypes';
import { formatNumber } from '@/utils/utils';
import { defineComponent, toRefs } from 'vue';

defineComponent({ name: 'MortgageDetail' });

const props = defineProps<IMortgageDetailProps>();
const { detailValue } = toRefs(props);
</script>

<style scoped lang="scss">
.bright {
	color: royalblue;
	font-weight: bold;
}

@media (max-width: 480px) {
	.detail-item {
		font-size: 16px;
	}
}
</style>
