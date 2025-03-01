<template>
	<header class="page-header">
		<div class="wrapper">
			<nav>
				<RouterLink to="/">Ипотека</RouterLink>
				<RouterLink to="/refinance">Рефинансирование</RouterLink>
			</nav>
			<div>
				<button class="theme-switcher" @click="changeTheme">
					<img
						src="https://cdn-icons-png.flaticon.com/512/12180/12180746.png"
						alt="Изменить тему"
						width="30"
					/>
				</button>
			</div>
		</div>
	</header>
</template>

<script setup lang="ts">
import { useThemeStore } from '@/stores/theme'
import { RouterLink } from 'vue-router'

const themeStore = useThemeStore()
const { changeTheme } = themeStore
</script>

<style scoped lang="scss">
.page-header {
	line-height: 1.5;
	width: 100%;
	max-height: 100vh;
	display: flex;
	justify-content: center;
	padding: 10px;
}

.wrapper {
	max-width: 90%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-grow: 1;
	margin-bottom: 20px;
}

nav {
	width: 100%;
	font-size: 16px;
}

nav a.router-link-exact-active {
	color: var(--text-color);
	border-bottom: 2px solid royalblue;
}

nav a.router-link-exact-active:hover {
	background-color: transparent;
}

nav a {
	display: inline-block;
	padding: 0.8rem;
	border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
	border-left: 0;
}

.theme-switcher {
	border: none;
	background: transparent;
	cursor: pointer;
	border-radius: 10px;
}

.theme-switcher:hover {
	background: aliceblue;
}

@media (max-width: 480px) {
	.page-header {
		padding: 8px;
	}
	nav {
		font-size: 14px;
	}
}

@media (max-width: 360px) {
	.page-header {
		padding: 6px;
	}
	nav {
		min-width: 220px;
		font-size: 12px;
	}
}
</style>
