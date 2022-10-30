import { computed, watch, defineComponent } from 'vue'
import { lists } from '../data/index'
import { ref } from 'vue'
import WordsMenu from '../components/WordsMenu'
import WordsWrapper from '../components/WordsWrapper'
import type { Content } from '../data/type'
import '../style/WordsMemorize.scss'

export default defineComponent({
	name: 'WordsMemorize',
	setup() {
		const content: Content = {}
		for (const list of Object.keys(lists)) {
			content[list] = Object.keys(lists[list])
		}
		const currentList = ref('')
		const currentGroup = ref('')
		watch(currentList, (n) => {
			localStorage.currentList = n
		})
		watch(currentGroup, (n) => {
			localStorage.currentGroup = n
		})
		currentList.value = localStorage.currentList || Object.keys(content)[0]
		currentGroup.value = localStorage.currentGroup || content[currentList.value][0]
		const words = computed(() => {
			const groups = lists[currentList.value]
			return currentGroup.value
				? groups[currentGroup.value]
				: Object.values(groups).flat()
		})
		function changeCurrent(list: string, group?: string) {
			currentList.value = list
			if (group) {
				currentGroup.value = group
			}
			else {
				currentGroup.value = ''
			}
		}
		const isShowWordOnly = ref(false)
		const isShowAllAnswer = ref(false)
		const isShowAllMeaning = ref(false)
		const isShowAllPhonogram = ref(false)
		function changeIsShowWordOnly(value?: boolean) {
			isShowWordOnly.value = value ?? !isShowWordOnly.value
		}
		function changeisShowAllAnswer(value?: boolean) {
			isShowAllAnswer.value = value ?? !isShowAllAnswer.value
		}
		function changeIsShowAllMeaning(value?: boolean) {
			isShowAllMeaning.value = value ?? !isShowAllMeaning.value
		}
		function changeIsShowAllPhonogram(value?: boolean) {
			isShowAllPhonogram.value = value ?? !isShowAllPhonogram.value
		}
		const key = ref(0)
		function reload() { key.value++ }
		return { content, currentList, currentGroup, changeCurrent, words, isShowWordOnly, isShowAllAnswer, isShowAllMeaning, isShowAllPhonogram, changeIsShowWordOnly, changeisShowAllAnswer, changeIsShowAllMeaning, changeIsShowAllPhonogram, reload, key }
	},
	render() {
		const { content, currentList, currentGroup, changeCurrent, words, isShowWordOnly, isShowAllAnswer, isShowAllMeaning, isShowAllPhonogram, changeIsShowWordOnly, changeisShowAllAnswer, changeIsShowAllMeaning, changeIsShowAllPhonogram, reload, key } = this
		return (
			<div class='words-memorize'>
				<WordsMenu content={content} onCurrentChange={changeCurrent} onIsShowWordOnlyChange={changeIsShowWordOnly}
					currentList={currentList} currentGroup={currentGroup} onReload={reload}
					isShowWordOnly={isShowWordOnly} isShowAllAnswer={isShowAllAnswer} isShowAllMeaning={isShowAllMeaning}
					isShowAllPhonogram={isShowAllPhonogram} onIsShowAllPhonogramChange={changeIsShowAllPhonogram}
					onIsShowAllAnswerChange={changeisShowAllAnswer} onIsShowAllMeaningChange={changeIsShowAllMeaning} />
				<WordsWrapper key={key} words={words} isShowWordOnly={isShowWordOnly} isShowAllAnswer={isShowAllAnswer} isShowAllMeaning={isShowAllMeaning} isShowAllPhonogram={isShowAllPhonogram} />
			</div >
		)
	}
})