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
		const words: { [key: string]: Word } = {}
		for (const list of Object.keys(lists)) {
			menu[list] = Object.keys(lists[list])
			for (const group of Object.keys(lists[list])) {
				for (const word of lists[list][group])
					words[word.middle] = word
			}
		}
		const wordKeys = Object.keys(words)

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
			const length = wordKeys.length
			if (length > 10) {
				const indices: Set<number> = new Set()
				while (indices.size < 10) {
					indices.add(Math.floor(Math.random() * length))
				}
				return Array.from(indices, index => words[wordKeys[index]])
			} else {
				return Object.values(words)
			}
		}
		const changeWords = () => {
			showWords.value = currentList.value === 'Random'
				? getRandomWords()
				: lists[currentList.value][currentGroup.value]
		}
		changeWords()

		const search = (value: string) => {
			showWords.value = wordKeys.filter(wordKey => wordKey.indexOf(value) !== -1).map(wordKey => words[wordKey])
		}

		const changeCurrent = (list: string, group: string) => {
			currentList.value = list
			currentGroup.value = group
			changeWords()
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
		const reload = () => { key.value++ }

		return {
			menu, currentList, currentGroup, changeCurrent, showWords, search,
			condition, changeCondition, reload, key
		}
	},
	render() {
		const {
			menu, currentList, currentGroup, changeCurrent, showWords, search,
			condition, changeCondition, reload, key
		} = this
		return (
			<div class='words-memorize'>
				<WordsHeader menu={menu} currentList={currentList} currentGroup={currentGroup} onCurrentChange={changeCurrent}
					onSearch={search} condition={condition} onConditionChange={changeCondition} onReload={reload} />
				<WordsWrapper key={key} words={showWords} condition={condition} />
			</div >
		)
	}
})