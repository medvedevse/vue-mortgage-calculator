<template>
	<div class="not-found-wrapper">
		<div class="not-found">
			<h1 class="not-found-header">Что то пошло не так!</h1>
			<p class="not-found-text">Страница не найдена</p>
			<img
				src="https://img.lovepik.com/element/40021/7866.png_1200.png"
				alt="Страница не найдена"
				width="800"
				height="500"
			/>
		</div>
	</div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.not-found-wrapper {
	min-height: 70vh;
	display: flex;
	justify-content: center;
	align-items: center;
}

.not-found-header,
.not-found-text {
	text-align: center;
}

.not-found-text {
	font-size: 26px;
}
</style>
