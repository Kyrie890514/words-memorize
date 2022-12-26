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

		let lastRandomInfo = {
			list: '',
			group: '',
			words: [] as Word[],
			numbers: [] as number[]
		}
		const randomInfo = ref('')
		const getRandomWords = (isReload = false) => {
			if (!isReload || lastRandomInfo.numbers.length === 0) {
				lastRandomInfo = {
					list: '',
					group: '',
					words: [],
					numbers: []
				}
			}
			if (currentList.value !== lastRandomInfo.list || currentGroup.value !== lastRandomInfo.group) {
				lastRandomInfo.list = currentList.value
				lastRandomInfo.group = currentGroup.value
				lastRandomInfo.words = currentList.value === 'Random'
					? words
					: Object.values(lists[currentList.value]).flat()
				lastRandomInfo.numbers = [...Array(lastRandomInfo.words.length).keys()]
			}
			randomInfo.value = `${Math.ceil((lastRandomInfo.words.length - lastRandomInfo.numbers.length) / 10) + 1}/${Math.ceil(lastRandomInfo.words.length / 10)}`
			let i = lastRandomInfo.numbers.length
			while (i > 0 && lastRandomInfo.numbers.length - i < 10) {
				const index = Math.floor(Math.random() * i--);
				[lastRandomInfo.numbers[index], lastRandomInfo.numbers[i]] = [lastRandomInfo.numbers[i], lastRandomInfo.numbers[index]]
			}
			return lastRandomInfo.numbers.splice(i).map(index => lastRandomInfo.words[index])
		}

		const showWords = ref<Word[]>([])
		const changeWords = (isReload = false) => {
			showWords.value = currentGroup.value === 'Random'
				? getRandomWords(isReload)
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
			changeWords(true)
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
			menu, currentList, currentGroup, changeCurrent, randomInfo, showWords, search,
			condition, changeCondition, key, reload, goBack, goForward
		}
	},
	render() {
		const {
			menu, currentList, currentGroup, changeCurrent, randomInfo, showWords, search,
			condition, changeCondition, key, reload, goBack, goForward
		} = this
		return (
			<div class='words-memorize'>
				<WordsHeader menu={menu} currentList={currentList} currentGroup={currentGroup} onCurrentChange={changeCurrent}
					onSearch={search} condition={condition} onConditionChange={changeCondition} onReload={reload} randomInfo={randomInfo}
					onGoBack={goBack} onGoForward={goForward} />
				<WordsWrapper key={key} words={showWords} condition={condition} />
			</div >
		)
	}
})