import { defineComponent, ref, Teleport, type PropType } from 'vue'
import type { Condition, Menu } from '../data/type'
import WordsMenu from './WordsMenu'
import '../style/WordsHeader.scss'

export default defineComponent({
	name: 'WordsHeader',
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
		},
		condition: {
			type: Object as PropType<Condition>,
			required: true
		}
	},
	emits: ['currentChange', 'conditionChange', 'reload'],
	setup(_, { emit }) {
		const changeCurrent = (list: string, group: string) => {
			emit('currentChange', list, group)
		}

		const wordsMenu = ref<InstanceType<typeof WordsMenu> | null>(null)
		const changeMenuVisible = () => {
			wordsMenu.value?.changeVisible()
		}

		const changeCondition = (type: keyof Condition) => {
			emit('conditionChange', type)
		}

		const reload = () => {
			emit('reload')
		}
		return { changeCurrent, wordsMenu, changeMenuVisible, changeCondition, reload }
	},
	render() {
		const {
			currentList, currentGroup, menu, condition,
			changeCurrent, changeMenuVisible, changeCondition, reload
		} = this
		return (
			<div class='header'>
				<div class='header-wrapper'>
					<div class='title' onClick={changeMenuVisible}>
						<span>{currentList}</span>
						<span>{currentGroup}</span>
					</div>
					<div class='toggle'>
						<span class={condition.isShowWordOnly && 'is-toggle'} onClick={() => changeCondition('isShowWordOnly')}>W</span>
						<span class={condition.isShowAllAnswer && 'is-toggle'} onClick={() => changeCondition('isShowAllAnswer')}>A</span>
						<span class={condition.isShowAllMeaning && 'is-toggle'} onClick={() => changeCondition('isShowAllMeaning')}>M</span>
						<span class={condition.isShowAllPhonogram && 'is-toggle'} onClick={() => changeCondition('isShowAllPhonogram')}>P</span>
						<span onClick={reload}>R</span>
					</div>
				</div>
				<Teleport to='#app'>
					<WordsMenu ref='wordsMenu' menu={menu}
						currentGroup={currentGroup} currentList={currentList} onCurrentChange={changeCurrent} />
				</Teleport>
			</div>
		)
	}
})