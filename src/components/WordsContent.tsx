import { defineComponent, ref, type PropType } from 'vue'
import type { Content } from '../type'
import '../style/WordsContent.scss'

export default defineComponent({
	name: 'WordsContent',
	props: {
		content: {
			type: Object as PropType<Content>,
			required: true
		}
	},
	emits: ['currentChange'],
	setup(props, { emit }) {
		const isShow = ref(false)
		function changeCurrent(list: string, group?: string) {
			emit('currentChange', list, group)
			changeIsShow(false)
		}
		function changeIsShow(value?: boolean) {
			isShow.value = value ?? !isShow.value
		}
		return { isShow, changeCurrent, changeIsShow }
	},
	render() {
		const { isShow, changeCurrent, content } = this
		return isShow
			? (
				<div class='content'>
					<div class='content-wrapper'>
						{Object.keys(content).map(list => (
							<>
								<div class='list' onClick={() => changeCurrent(list)}>{list}</div>
								{
									content[list].map(group => (
										<div class='group' onClick={() => changeCurrent(list, group)}>{group}</div>
									))
								}
							</>
						))}
					</div>
				</div>
			)
			: null
	}
})