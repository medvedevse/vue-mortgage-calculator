<script setup lang="ts">
import FooterComponent from '@/components/FooterComponent.vue';
import FoundInterestRates from '@/components/FoundInterestRates.vue';
import MortgageForm from '@/components/MortgageForm.vue';
import MortgageResult from '@/components/MortgageResult.vue';
import PageIntro from '@/components/PageIntro.vue';
import TabBar from '@/components/TabBar.vue';
import UnbordingLink from '@/components/UnbordingLink.vue';
import { ref } from 'vue';

const date = new Date();
const currentYear = ref<number>(date.getFullYear());

const pageHeaderText: string = 'Ипотечный калькулятор';
const pageIntroText: string = `Удобный ипотечный калькулятор - это способ быстро и удобно рассчитать процентную ставку, размер суммы и срок платежа по ипотечному кредиту в ${currentYear.value} году.`;
const footerText: string =
	'*Примечание. На платформе выполнен предварительный расчет графика погашения ипотеки. Точный график погашения можно получить в банке после оформления ипотеки.';

const rateProps = ref<number>(10.5);
const periodProps = ref<number>(20);
const propertyPriceProps = ref<number>(4_000_000);
const paymentProps = ref<number>(30_000);
const contributionProps = ref<number>(2_500_000);
const maxPropertyPriceProps = ref<number>(0);
</script>

<template>
	<div class="container">
		<section class="intro">
			<PageIntro :headerText="pageHeaderText" :introText="pageIntroText" />
			<div class="tabs-container">
				<TabBar />
				<div class="link-container">
					<UnbordingLink
						linkHref="https://www.banki.ru/products/hypothec/perv_vznos/?place=calc_payment"
						linkTitle="Как накопить на первоначальный взнос?"
					/>
				</div>
			</div>
		</section>

		<section class="mortgage-section">
			<div class="wrapper">
				<MortgageForm
					@rate="rateProps = Number($event)"
					@period="periodProps = Number($event)"
					@propertyPrice="propertyPriceProps = Number($event)"
					@payment="paymentProps = Number($event)"
					@contribution="contributionProps = Number($event)"
					@maxPropertyPrice="maxPropertyPriceProps = Number($event)"
				/>
				<MortgageResult
					:rateProps="rateProps"
					:periodProps="periodProps"
					:propertyPriceProps="propertyPriceProps"
					:paymentProps="paymentProps"
					:contributionProps="contributionProps"
					:maxPropertyPriceProps="maxPropertyPriceProps"
				/>
			</div>
		</section>
		<FoundInterestRates />
	</div>
	<FooterComponent :footerText="footerText" />
</template>

<style scoped lang="scss">
.container {
	width: 90%;
}

.intro-description {
	margin-bottom: 20px;
}

.mortgage-section {
	display: flex;
	flex-direction: column;
	justify-content: center;
	// max-width: 90%;
	background: white;
	color: black;
	border-radius: 20px;
	padding: 30px 50px;
	min-height: 310px;
	border: 1px solid #d6d9e0;
}
.wrapper {
	display: flex;
	flex-wrap: wrap;
}

section {
	margin-bottom: 20px;
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

input[type='range'] {
	min-width: 200px;
	color: #66b2f3;
}

input[type='range']:hover {
	color: cornflowerblue;
}

.bright {
	color: royalblue;
	font-weight: bold;
}

.download-link-container {
	display: flex;
	gap: 12px;
	margin-bottom: 10px;
}

.disclamer {
	font-size: 10px;
}

.due-date-wrapper {
	display: flex;
	flex-direction: column;
	gap: 6px;
}

.tabs-container {
	display: flex;
	justify-content: space-between;
}

@media (max-width: 1280px) {
	.mortgage-section {
		max-width: 100%;
		min-width: 300px;
		border: none;
		padding: 0;
		background: none;
	}

	.wrapper {
		background: none;
		gap: 50px;
	}
}

@media (max-width: 1024px) {
	.wrapper {
		justify-content: center;
		gap: 30px;
	}
}

@media (max-width: 768px) {
	.link-container {
		display: none;
	}
}
</style>
