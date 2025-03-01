import type { Ref } from 'vue'

export const useFilterInput = (elem: string) => (e: Event) => {
	const target = e.target as HTMLInputElement
	elem = target.value.replace(/\D+/g, '')
}
