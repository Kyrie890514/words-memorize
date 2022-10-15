import type { Word } from '@/type'
import { defineComponent, watch, ref, type PropType } from 'vue'
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
	setup(props) {
		const isShowAnswer = ref(false)
		const isShowMeaning = ref(false)
		function changeIsShowAnswer(value?: boolean) {
			isShowAnswer.value = value ?? !isShowAnswer.value
		}
		function changeIsShowMeaning(value?: boolean) {
			isShowMeaning.value = value ?? !isShowMeaning.value
		}
		watch(() => props.word.middle, () => {
			isShowAnswer.value = false
			isShowMeaning.value = false
		})
		return { isShowAnswer, changeIsShowAnswer, isShowMeaning, changeIsShowMeaning }
	},
	render() {
		const { word, isShowAnswer, changeIsShowAnswer, isShowMeaning, changeIsShowMeaning, isShowWordOnly, isShowAllAnswer, isShowAllMeaning } = this
		return (
			<div class='word-wrapper'>
				<div class='left-wrapper'>
					{!isShowWordOnly && word.left && <span class='left'>{word.left}</span>}
					{
						isShowAllAnswer || isShowAnswer
							? <span class='answer show' onClick={() => changeIsShowAnswer()}>{word.middle}</span>
							: <span class='answer hidden' onClick={() => changeIsShowAnswer()}>answer</span>
					}
					{!isShowWordOnly && word.right && <span class='right'>{word.right}</span>}
				</div>
				<div class='right-wrapper' onClick={() => changeIsShowMeaning()}>
					{
						isShowAllMeaning || isShowMeaning
							? <span class='meaning show' >{word.meaning}</span>
							: <span class='meaning hidden'>meaning</span>
					}
				</div>
			</div>
		)
	}
})