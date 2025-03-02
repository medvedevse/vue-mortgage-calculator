<template>
	<div class="container">
		<section class="intro">
			<PageIntro :headerText="pageHeaderText" :introText="pageIntroText" />
		</section>
		<div class="refinance-section-wrapper">
			<div class="wrapper">
				<RefinanceFormSection />
				<RefinanceInfo />
			</div>
		</div>
		<FoundInterestRates />
	</div>
</template>

<script setup lang="ts">
import FoundInterestRates from '@/components/FoundInterestRates.vue';
import PageIntro from '@/components/PageIntro.vue';
import RefinanceFormSection from '@/components/RefinanceFormSection.vue';
import RefinanceInfo from '@/components/RefinanceInfo.vue';
import { ref } from 'vue';

const date = new Date();
const currentYear = ref<number>(date.getFullYear());

const lowestRate: number = 10.5;
const pageHeaderText: string = 'Калькулятор рефинансирования ипотеки';
const pageIntroText: string = `Калькулятор рефинансирования ипотеки ${currentYear.value} - самая низкая ставка ${lowestRate}%`;
</script>

<style scoped lang="scss">
.container {
	width: 90%;
}

.intro-description {
	margin-bottom: 20px;
}

.refinance-section-wrapper {
	margin-bottom: 20px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	background: white;
	color: black;
	border-radius: 20px;
	padding: 30px 50px;
	min-height: 310px;
	border: 1px #d6d9e0 solid;
}

.wrapper {
	display: flex;
	flex-wrap: wrap;
}

.price-block {
	display: flex;
	gap: 10px;
	flex-wrap: wrap;
}

.form-input {
	margin-bottom: 20px;
	width: 200px;
	display: block;
	position: relative;
	box-sizing: border-box;
}

input[type='text'] {
	padding: 24px 16px 8px;
	height: 50px;
	font-size: 16px;
	line-height: 24px;
	text-overflow: unset;
	outline: none;
	box-sizing: border-box;
	transition:
		color 0.2s ease-out,
		border-color 0.2s ease-out;
	width: 100%;
	color: #212121;
	border: 1px solid #d6d9e0;
	font-family: inherit;
	margin: 0px;
	appearance: none;
	backface-visibility: hidden;
	border-radius: 8px;
}

input[type='text']:hover {
	border: 1px solid #039be5;
}

input[type='text'] ~ label {
	font-size: 12px;
	line-height: 14px;
	top: 8px;
	transform: none;
	display: block;
	color: rgb(104, 112, 130);
	transition: 0.2s;
	position: absolute;
	left: 0px;
	padding: 0px 16px;
	box-sizing: border-box;
	pointer-events: none;
	width: 100%;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	z-index: 1;
}

.due-date-wrapper {
	display: flex;
	flex-direction: column;
	gap: 6px;
}

input[type='range'] {
	max-width: 200px;
	color: #66b2f3;
}

input[type='range']:hover {
	color: cornflowerblue;
}

.fill-form-section {
	background: #fbfbfd;
	border-radius: 20px;
	padding: 20px;
}

.bright {
	color: royalblue;
	font-weight: bold;
}

.fill-form-text {
	margin-bottom: 16px;
}

.download-link-container {
	display: flex;
	gap: 12px;
}

.disclamer {
	font-size: 10px;
}

h2 {
	margin-bottom: 15px;
}

.refinance-form {
	margin-bottom: 10px;
}

@media (max-width: 1280px) {
	.refinance-section-wrapper {
		max-width: 100%;
		min-width: 300px;
		border: none;
		padding: 0;
		background: none;
	}

	.wrapper {
		justify-content: center;
		background: none;
		gap: 30px;
	}
}
</style>
