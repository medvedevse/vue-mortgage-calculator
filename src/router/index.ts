import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/MainView.vue';
import NotFoundComponent from '@/components/NotFoundComponent.vue';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'main',
			component: HomeView
		},
		{
			path: '/refinance',
			name: 'refinance',
			component: () => import('../views/RefinanceView.vue')
		},
		{
			path: '/:pathMatch(.*)*',
			name: 'NotFound',
			component: NotFoundComponent
		}
	]
});

export default router;
