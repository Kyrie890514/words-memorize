import { watch, defineComponent, reactive } from 'vue'
import { lists } from '../data/index'
import { ref } from 'vue'
import WordsHeader from '../components/WordsHeader'
import WordsWrapper from '../components/WordsWrapper'
import type { Menu, Condition, Word } from '../data/type'
import '../style/WordsMemorize.scss'

export default defineComponent({
	name: 'WordsMemorize',
	setup() {
		const menu: Menu = {}
		const words: Word[] = []
		for (const list of Object.keys(lists)) {
			menu[list] = Object.keys(lists[list])
			for (const group of Object.keys(lists[list])) {
				words.push(...lists[list][group])
			}
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

		const showWords = ref<Word[]>([])
		const getRandomWords = () => {
			const _words = currentList.value === 'Random'
				? words
				: Object.values(lists[currentList.value]).flat()

			const length = _words.length
			const numbers = [...Array(length).keys()]
			let i = length
			while (i > 0 && length - i < 10) {
				const index = Math.floor(Math.random() * i--);
				[numbers[index], numbers[i]] = [numbers[i], numbers[index]]
			}
			return numbers.slice(i).map(index => _words[index])
		}
		const changeWords = () => {
			showWords.value = currentGroup.value === 'Random'
				? getRandomWords()
				: lists[currentList.value][currentGroup.value]
		}
		changeWords()

		const search = (value: string) => {
			showWords.value = words.filter(word => word.middle.indexOf(value.toLowerCase()) !== -1)
		}

		const changeCurrent = (list: string, group: string) => {
			currentList.value = list
			currentGroup.value = group
			changeWords()
			_reload()
		}

		const condition = reactive<Condition>({
			isShowWordOnly: false,
			isShowAllAnswer: false,
			isShowAllMeaning: false,
			isShowAllPhonogram: false,
		})
		const changeCondition = (type: keyof Condition) => {
			condition[type] = !condition[type]
		}

		const key = ref(0)
		const _reload = () => { key.value++ }
		const reload = () => {
			changeWords()
			_reload()
		}

		const goBack = () => {
			const groupArray = menu[currentList.value]
			const currentGroupIndex = groupArray.indexOf(currentGroup.value)
			if (currentGroupIndex > 0) {
				changeCurrent(currentList.value, groupArray[currentGroupIndex - 1])
			} else {
				const listArray = Object.keys(menu)
				const currentListIndex = listArray.indexOf(currentList.value)
				const list = currentListIndex > 0 ? listArray[currentListIndex - 1] : listArray[listArray.length - 1]
				changeCurrent(list, menu[list][menu[list].length - 1])
			}
		}
		const goForward = () => {
			const groupArray = menu[currentList.value]
			const currentGroupIndex = groupArray.indexOf(currentGroup.value)
			if (currentGroupIndex < groupArray.length - 1) {
				changeCurrent(currentList.value, groupArray[currentGroupIndex + 1])
			} else {
				const listArray = Object.keys(menu)
				const currentListIndex = listArray.indexOf(currentList.value)
				const list = currentListIndex < listArray.length - 1 ? listArray[currentListIndex + 1] : listArray[0]
				changeCurrent(list, menu[list][0])
			}
		}

		return {
			menu, currentList, currentGroup, changeCurrent, showWords, search,
			condition, changeCondition, key, reload, goBack, goForward
		}
	},
	render() {
		const {
			menu, currentList, currentGroup, changeCurrent, showWords, search,
			condition, changeCondition, key, reload, goBack, goForward
		} = this
		return (
			<div class='words-memorize'>
				<WordsHeader menu={menu} currentList={currentList} currentGroup={currentGroup} onCurrentChange={changeCurrent}
					onSearch={search} condition={condition} onConditionChange={changeCondition} onReload={reload}
					onGoBack={goBack} onGoForward={goForward} />
				<WordsWrapper key={key} words={showWords} condition={condition} />
			</div >
		)
	}
})