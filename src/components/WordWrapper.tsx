import type { Word } from '@/type'
import { defineComponent, ref, type PropType } from 'vue'
import '../style/WordWrapper.scss'

export default defineComponent({
	name: 'WordWrapper',
	props: {
		word: {
			type: Object as PropType<Word>,
			required: true
		},
		isShowWordOnly: {
			type: Boolean,
			required: true
		},
		isShowAllAnswer: {
			type: Boolean,
			required: true
		},
		isShowAllMeaning: {
			type: Boolean,
			required: true
		},
	},
	setup() {
		const isShowAnswer = ref(false)
		const isShowMeaning = ref(false)
		function changeIsShowAnswer(value?: boolean) {
			isShowAnswer.value = value ?? !isShowAnswer.value
		}
		function changeIsShowMeaning(value?: boolean) {
			isShowMeaning.value = value ?? !isShowMeaning.value
		}
		return { isShowAnswer, changeIsShowAnswer, isShowMeaning, changeIsShowMeaning }
	},
	render() {
		const { word, isShowAnswer, changeIsShowAnswer, isShowMeaning, changeIsShowMeaning, isShowWordOnly, isShowAllAnswer, isShowAllMeaning } = this
		return (
			<div class='word-wrapper'>
				{!isShowWordOnly && <span>{word.left}</span>}
				{
					isShowAllAnswer || isShowAnswer
						? <span class='answer show' onClick={() => changeIsShowAnswer()}>{word.middle}</span>
						: <span class='answer hidden' onClick={() => changeIsShowAnswer()}>answer</span>
				}
				{!isShowWordOnly && <span>{word.right}</span>}
				{
					isShowAllMeaning || isShowMeaning
						? <span class='meaning show' onClick={() => changeIsShowMeaning()}>{word.meaning}</span>
						: <span class='meaning hidden' onClick={() => changeIsShowMeaning()}>meaning</span>
				}
			</div>
		)
	}
})