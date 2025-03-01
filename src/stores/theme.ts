import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useThemeStore = defineStore('theme', () => {
	const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';
	const theme = ref<'light' | 'dark'>(savedTheme || 'dark');

	const changeTheme = () => {
		theme.value === 'dark' ? (theme.value = 'light') : (theme.value = 'dark');
		localStorage.setItem('theme', theme.value);
	};

	return { changeTheme, theme };
});
