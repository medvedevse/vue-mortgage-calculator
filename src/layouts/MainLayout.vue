<template>
	<div :class="`theme__${themeClass}`">
		<HeaderComponent />
		<main>
			<slot />
		</main>
	</div>
	<SpeedInsights />
	<Analytics />
</template>

<script setup lang="ts">
import { SpeedInsights } from '@vercel/speed-insights/nuxt';
import { Analytics } from '@vercel/analytics/nuxt';
import HeaderComponent from '@/components/HeaderComponent.vue';
import { useThemeStore } from '@/stores/theme';
import { storeToRefs } from 'pinia';
import { ref, watch } from 'vue';

const themeStore = useThemeStore();
const { theme } = storeToRefs(themeStore);
const themeClass = ref<'light' | 'dark'>('light');
watch(theme, (newVal) => (themeClass.value = newVal), { immediate: true });
</script>

<style scoped lang="scss">
$light: light;
$dark: dark;

@mixin mainLayout {
	display: flex;
	flex-direction: column;
	align-items: center;
}

:global(.theme__#{$light}) {
	@include mainLayout;
	color: #2c3e50;
	background: white;
}

:global(.theme__#{$dark}) {
	@include mainLayout;
	color: white;
	background: #0183af;
}

main {
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
}
</style>
