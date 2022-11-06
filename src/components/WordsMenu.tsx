import { defineComponent, ref, type PropType } from 'vue'
import type { Menu } from '../data/type'
import '../style/WordsMenu.scss'

export default defineComponent({
	name: 'WordsMenu',
	props: {
		menu: {
			type: Object as PropType<Menu>,
			required: true
		}
	},
	emits: ['currentChange'],
	setup(_, { emit }) {
		const visible = ref(false)
		const changeVisible = () => {
			visible.value = !visible.value
		}

		const changeCurrent = (list: string, group: string) => {
			emit('currentChange', list, group)
			changeVisible()
		}

		return { visible, changeVisible, changeCurrent }
	},
	render() {
		const { menu, visible, changeCurrent } = this
		return (
			<div class='menu' style={`display:${visible ? 'flex' : 'none'}`}>
				{Object.keys(menu).map(list => (
					<>
						<div class='list' onClick={() => { }}>{list}</div>
						{
							menu[list].map(group => (
								<div class='group' onClick={() => changeCurrent(list, group)}>{group}</div>
							))
						}
					</>
				))}
			</div>
		)
	}
})