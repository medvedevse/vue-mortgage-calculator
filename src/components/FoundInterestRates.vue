<template>
	<section>
		<div class="fill-form-section">
			<div class="fill-form-text">
				<h2>Нашли для вас более выгодные ставки</h2>
				<p>
					Заполните анкету и узнайте вероятность получения выгодной ставки в разных банках или
					посмотрите предложения по вашим параметрам
				</p>
			</div>
			<ul class="fill-form-buttons">
				<li>
					<UnbordingLink
						linkHref="https://www.banki.ru/credit-master/anketa/purposeamountperiod/?lp=mpk_hypothec_calc"
						linkTitle="Заполнить анкету"
					/>
				</li>
				<li>
					<UnbordingLink
						linkHref="https://www.banki.ru/products/hypothec/search/saratov"
						linkTitle="Смотреть все предложения"
					/>
				</li>
			</ul>
		</div>
	</section>
</template>

<script setup lang="ts">
import UnbordingLink from './UnbordingLink.vue';
</script>

<style scoped lang="scss">
.fill-form-section {
	background: #fbfbfd;
	color: black;
	border-radius: 20px;
	padding: 20px 40px;
	margin-bottom: 20px;
}

.fill-form-buttons {
	list-style: none;
	padding-inline-start: 0;
	display: flex;
	gap: 10px;
	flex-wrap: wrap;
	a {
		background: #66b2f3;
		color: white;
		font-weight: 500;
		border-radius: 4px;
		padding: 6px 10px;
	}
}

.fill-form-text {
	margin-bottom: 16px;
}

@media (max-width: 480px) {
	.fill-form-section {
		padding: 20px 30px;
	}

	.fill-form-text h2 {
		line-height: 30px;
	}
}

@media (max-width: 360px) {
	.fill-form-section {
		padding: 20px;
	}

	.fill-form-text h2 {
		font-size: 20px;
		line-height: 24px;
	}

	.fill-form-text p,
	.fill-form-buttons a {
		font-size: 14px;
	}

	.fill-form-buttons a {
		min-width: 202px;
	}
}
</style>
