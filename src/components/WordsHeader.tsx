import { computed, defineComponent, nextTick, ref, Teleport, type PropType } from 'vue'
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
	emits: ['currentChange', 'conditionChange', 'search', 'reload', 'goBack', 'goForward'],
	setup(props, { emit }) {
		const changeCurrent = (list: string, group: string) => {
			emit('currentChange', list, group)
		}

		const wordsMenu = ref<InstanceType<typeof WordsMenu> | null>(null)
		const changeMenuVisible = () => {
			wordsMenu.value?.changeVisible()
		}

		const isSearching = ref(false)
		const searchInput = ref<HTMLInputElement | null>(null)
		const changeIsSearching = () => {
			isSearching.value = !isSearching.value
			if (isSearching.value) {
				nextTick(() => {
					searchInput.value?.focus()
				})
			} else {
				emit('currentChange', props.currentList, props.currentGroup)
			}
		}
		const searchText = ref('')
		const changeSearchText = (value: string) => {
			searchText.value = value
			value && emit('search', value)
		}

		const changeCondition = (type: keyof Condition) => {
			emit('conditionChange', type)
		}

		const reload = () => {
			emit('reload')
		}

		const goBack = () => {
			emit('goBack')
		}
		const goForward = () => {
			emit('goForward')
		}
		const showGoBackAndGoForward = computed(() => props.currentList !== 'Random' && props.currentGroup !== 'Random')

		return {
			changeCurrent, wordsMenu, changeMenuVisible,
			isSearching, searchInput, changeIsSearching, changeSearchText,
			changeCondition, reload, goBack, goForward, showGoBackAndGoForward
		}
	},
	render() {
		const {
			currentList, currentGroup, menu, condition,
			changeCurrent, changeMenuVisible,
			isSearching, changeIsSearching, changeSearchText,
			changeCondition, reload, goBack, goForward, showGoBackAndGoForward
		} = this
		return (
			<div class='header'>
				<div class='header-wrapper'>
					<div class='operation' style={`display:${isSearching ? 'none' : 'flex'}`}>
						<span onClick={reload}>R</span>
						{showGoBackAndGoForward && <span onClick={goBack}>B</span>}
						{showGoBackAndGoForward && <span onClick={goForward}>F</span>}
					</div>
					{
						isSearching
							? (
								<div class='title'>
									<input ref='searchInput' onChange={e => changeSearchText((e.target as HTMLInputElement).value)} />
								</div>
							)
							: (
								<div class='title' onClick={changeMenuVisible}>
									<span>{currentList}</span>
									<span>{currentGroup}</span>
								</div>
							)
					}
					<div class='toggle'>
						<span class={isSearching && 'is-toggle'} onClick={changeIsSearching}>S</span>
						<span class={condition.isShowWordOnly && 'is-toggle'} onClick={() => changeCondition('isShowWordOnly')}>W</span>
						<span class={condition.isShowAllAnswer && 'is-toggle'} onClick={() => changeCondition('isShowAllAnswer')}>A</span>
						<span class={condition.isShowAllMeaning && 'is-toggle'} onClick={() => changeCondition('isShowAllMeaning')}>M</span>
						<span class={condition.isShowAllPhonogram && 'is-toggle'} onClick={() => changeCondition('isShowAllPhonogram')}>P</span>
					</div>
				</div>
				<Teleport to='#app'>
					<WordsMenu ref='wordsMenu' menu={menu}
						currentGroup={currentGroup} currentList={currentList} onCurrentChange={changeCurrent} />
				</Teleport>
			</div >
		)
	}
})