<template>
	<a :href="linkHref">{{ linkTitle }}</a>
</template>

<script setup lang="ts">
import type { IUnbordingLinkProps } from '@/types/componentTypes';
import { defineComponent } from 'vue';

defineComponent({ name: 'UnbordingLink' });

defineProps<IUnbordingLinkProps>();
</script>

<style scoped lang="scss"></style>
