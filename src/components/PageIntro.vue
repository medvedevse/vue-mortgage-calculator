<template>
	<h1 class="intro-title">{{ headerText }}</h1>
	<p class="intro-description">{{ introText }}</p>
</template>

<script setup lang="ts">
import type { IPageIntroProps } from '@/types/componentTypes';
import { defineComponent } from 'vue';

defineComponent({ name: 'PageIntro' });

defineProps<IPageIntroProps>();
</script>

<style scoped lang="scss">
.intro-description {
	margin-bottom: 20px;
}

@media (max-width: 480px) {
	.intro-title {
		font-size: 26px;
	}
}

@media (max-width: 360px) {
	.intro-title {
		font-size: 20px;
		line-height: 24px;
	}
	.intro-description {
		font-size: 14px;
	}
}
</style>
