<template>
	<footer>
		<div class="wrapper">
			<p class="disclamer">{{ footerText }}</p>
		</div>
	</footer>
</template>

<script setup lang="ts">
import type { IFooterComponentProps } from '@/types/componentTypes'
import { defineComponent } from 'vue'

defineComponent({ name: 'FooterComponent' })

defineProps<IFooterComponentProps>()
</script>

<style scoped lang="scss">
footer {
	width: 100%;
	display: flex;
	justify-content: center;
}

.wrapper {
	width: 90%;
	padding: 0 0 10px 0;
}

.disclamer {
	font-size: 12px;
}
</style>
