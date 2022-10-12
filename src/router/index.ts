import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'wordsMemorize',
			component: () => import('../views/WordsMemorize')
		}
	]
})

export default router
