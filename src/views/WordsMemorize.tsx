import { computed, watch, defineComponent, reactive } from 'vue'
import { lists } from '../data/index'
import { ref } from 'vue'
import WordsHeader from '../components/WordsHeader'
import WordsWrapper from '../components/WordsWrapper'
import type { Menu, Condition } from '../data/type'
import '../style/WordsMemorize.scss'

export default defineComponent({
	name: 'WordsMemorize',
	setup() {
		const menu: Menu = {}
		for (const list of Object.keys(lists)) {
			menu[list] = Object.keys(lists[list])
		}

		const currentList = ref('')
		const currentGroup = ref('')
		watch(currentList, n => {
			localStorage.currentList = n
		})
		watch(currentGroup, n => {
			localStorage.currentGroup = n
		})
		currentList.value = localStorage.currentList || Object.keys(menu)[0]
		currentGroup.value = localStorage.currentGroup || menu[currentList.value][0]
		const changeCurrent = (list: string, group: string) => {
			currentList.value = list
			currentGroup.value = group
		}

		const words = computed(() => lists[currentList.value][currentGroup.value])

		const condition: Condition = reactive({
			isShowWordOnly: false,
			isShowAllAnswer: false,
			isShowAllMeaning: false,
			isShowAllPhonogram: false,
		})
		const changeCondition = (type: keyof Condition) => {
			condition[type] = !condition[type]
		}

		const key = ref(0)
		function reload() { key.value++ }

		return {
			menu, currentList, currentGroup, changeCurrent, words,
			condition, changeCondition, reload, key
		}
	},
	render() {
		const {
			menu, currentList, currentGroup, changeCurrent, words,
			condition, changeCondition, reload, key
		} = this
		return (
			<div class='words-memorize'>
				<WordsHeader menu={menu} currentList={currentList} currentGroup={currentGroup} onCurrentChange={changeCurrent}
					condition={condition} onConditionChange={changeCondition} onReload={reload} />
				<WordsWrapper key={key} words={words} condition={condition} />
			</div >
		)
	}
})