import type { Word } from '@/data/type'
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
		isShowAllPhonogram: {
			type: Boolean,
			required: true
		}
	},
	setup(props) {
		const isShowAnswer = ref(false)
		const isShowMeaning = ref(false)
		const isShowPhonogram = ref(false)
		function changeIsShowAnswer(value?: boolean) {
			!props.isShowAllAnswer && (isShowAnswer.value = value ?? !isShowAnswer.value)
		}
		function changeIsShowMeaning(value?: boolean) {
			!props.isShowAllMeaning && (isShowMeaning.value = value ?? !isShowMeaning.value)
		}
		function changeIsShowPhonogram(value?: boolean) {
			isShowPhonogram.value = value ?? !isShowPhonogram.value
		}
		watch(() => props.word.middle, () => {
			isShowAnswer.value = false
			isShowMeaning.value = false
		})
		return { isShowAnswer, changeIsShowAnswer, isShowMeaning, changeIsShowMeaning, isShowPhonogram, changeIsShowPhonogram }
	},
	render() {
		const { word, isShowAnswer, changeIsShowAnswer, isShowMeaning, changeIsShowMeaning, isShowPhonogram, changeIsShowPhonogram, isShowWordOnly, isShowAllAnswer, isShowAllMeaning, isShowAllPhonogram } = this
		return (
			<div class='word-wrapper'>
				<div class='top-wrapper'>
					{!isShowWordOnly && word.left && <span class='left'>{word.left}&nbsp;</span>}
					{
						isShowAllAnswer || isShowAnswer
							? <span class='answer show' onClick={() => changeIsShowAnswer()}>{word.middle}&nbsp;</span>
							: <span class='answer hidden' onClick={() => changeIsShowAnswer()}>answer&nbsp;</span>
					}
					{!isShowWordOnly && word.right && <span class='right'>{word.right}</span>}
				</div>
				<div class='bottom-wrapper'>
					<div class='left-wrapper' onClick={() => changeIsShowPhonogram()}>
						{
							isShowAllPhonogram || isShowPhonogram
								? <span class='phonogram show'>{word.phonogram}</span>
								: <span class='phonogram hidden'>phonogram</span>
						}
					</div>
					<div class='right-wrapper' onClick={() => changeIsShowMeaning()}>
						{
							isShowAllMeaning || isShowMeaning
								? <span class='meaning show'>{word.meaning}</span>
								: <span class='meaning hidden'>meaning</span>
						}
					</div>
				</div>
			</div>
		)
	}
})