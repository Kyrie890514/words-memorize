import { computed, defineComponent } from 'vue'
import { lists } from '../data/index'
import { ref } from 'vue'
import WordsMenu from '../components/WordsMenu'
import WordsWrapper from '../components/WordsWrapper'
import type { Content } from '../type'
import '../style/WordsMemorize.scss'

export default defineComponent({
	name: 'WordsMemorize',
	setup() {
		const content: Content = {}
		for (const list of Object.keys(lists)) {
			content[list] = Object.keys(lists[list])
		}
		const currentList = ref(Object.keys(content)[0])
		const currentGroup = ref(content[currentList.value][0])
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
		function changeIsShowWordOnly(value?: boolean) {
			isShowWordOnly.value = value ?? !isShowWordOnly.value
		}
		function changeisShowAllAnswer(value?: boolean) {
			isShowAllAnswer.value = value ?? !isShowAllAnswer.value
		}
		function changeIsShowAllMeaning(value?: boolean) {
			isShowAllMeaning.value = value ?? !isShowAllMeaning.value
		}
		return { content, currentList, currentGroup, changeCurrent, words, isShowWordOnly, isShowAllAnswer, isShowAllMeaning, changeIsShowWordOnly, changeisShowAllAnswer, changeIsShowAllMeaning }
	},
	render() {
		const { content, currentList, currentGroup, changeCurrent, words, isShowWordOnly, isShowAllAnswer, isShowAllMeaning, changeIsShowWordOnly, changeisShowAllAnswer, changeIsShowAllMeaning } = this
		return (
			<div class='words-memorize'>
				<WordsMenu content={content} onCurrentChange={changeCurrent} onIsShowWordOnlyChange={changeIsShowWordOnly}
					currentList={currentList} currentGroup={currentGroup}
					isShowWordOnly={isShowWordOnly} isShowAllAnswer={isShowAllAnswer} isShowAllMeaning={isShowAllMeaning}
					onIsShowAllAnswerChange={changeisShowAllAnswer} onIsShowAllMeaningChange={changeIsShowAllMeaning} />
				<WordsWrapper words={words} isShowWordOnly={isShowWordOnly} isShowAllAnswer={isShowAllAnswer} isShowAllMeaning={isShowAllMeaning} />
			</div >
		)
	}
})