import { defineComponent, reactive, ref, watch, type PropType } from 'vue'
import type { Menu } from '../data/type'
import '../style/WordsMenu.scss'

export default defineComponent({
	name: 'WordsMenu',
	props: {
		currentList: {
			type: String,
			required: true
		},
		currentGroup: {
			type: String,
			required: true
		},
		menu: {
			type: Object as PropType<Menu>,
			required: true
		}
	},
	emits: ['currentChange'],
	setup(props, { emit }) {
		const visible = ref(false)
		const changeVisible = () => {
			visible.value = !visible.value
		}

		const listIsExpandedObj: Record<string, boolean> = reactive({})
		watch(() => props.currentList, () => {
			for (const list of Object.keys(props.menu)) {
				listIsExpandedObj[list] = list === props.currentList
			}
		}, { immediate: true })

		const changeCurrent = (list: string, group: string) => {
			emit('currentChange', list, group)
			changeVisible()
		}

		return { visible, changeVisible, listIsExpandedObj, changeCurrent }
	},
	render() {
		const { menu, visible, listIsExpandedObj, currentList, currentGroup, changeCurrent } = this
		return (
			<div class='menu' style={`display:${visible ? 'flex' : 'none'}`}>
				<div class={currentList === 'Random' && currentGroup === 'Random' ? 'list highlight' : 'list'}
					onClick={() => changeCurrent('Random', 'Random')}>Random</div>
				{Object.keys(menu).map(list => (
					<>
						<div class='list' onClick={() => listIsExpandedObj[list] = !listIsExpandedObj[list]}>{list}</div>
						{
							listIsExpandedObj[list]
								? (
									<>
										<div class={currentList === list && currentGroup === 'Random' ? 'group highlight' : 'group'}
											onClick={() => changeCurrent(list, 'Random')}>Random</div>
										{
											menu[list].map(group => (
												<div class={currentList === list && currentGroup === group ? 'group highlight' : 'group'}
													onClick={() => changeCurrent(list, group)}>{group}</div>
											))
										}
									</>
								)
								: null
						}
					</>
				))}
			</div>
		)
	}
})