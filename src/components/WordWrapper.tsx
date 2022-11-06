import type { Condition, Word } from '@/data/type'
import { defineComponent, watch, ref, type PropType } from 'vue'
import '../style/WordWrapper.scss'

export default defineComponent({
	name: 'WordWrapper',
	props: {
		word: {
			type: Object as PropType<Word>,
			required: true
		},
		condition: {
			type: Object as PropType<Condition>,
			required: true
		}
	},
	setup(props) {
		const isShowAnswer = ref(false)
		const isShowMeaning = ref(false)
		const isShowPhonogram = ref(false)
		function changeIsShowAnswer() {
			!props.condition.isShowAllAnswer && (isShowAnswer.value = !isShowAnswer.value)
		}
		function changeIsShowMeaning() {
			!props.condition.isShowAllMeaning && (isShowMeaning.value = !isShowMeaning.value)
		}
		function changeIsShowPhonogram() {
			!props.condition.isShowAllPhonogram && (isShowPhonogram.value = !isShowPhonogram.value)
		}

		watch(() => props.word.middle, () => {
			isShowAnswer.value = false
			isShowMeaning.value = false
			isShowPhonogram.value = false
		})
		return { isShowAnswer, isShowMeaning, isShowPhonogram, changeIsShowAnswer, changeIsShowMeaning, changeIsShowPhonogram }
	},
	render() {
		const {
			word, condition,
			isShowAnswer, isShowMeaning, isShowPhonogram, changeIsShowAnswer, changeIsShowMeaning, changeIsShowPhonogram
		} = this
		return (
			<div class='word-wrapper'>
				<div class='top-wrapper'>
					{!condition.isShowWordOnly && word.left && (
						<span class='left'>{word.left}&nbsp;</span>
					)}
					{
						condition.isShowAllAnswer || isShowAnswer
							? <span class='answer show' onClick={() => changeIsShowAnswer()}>{word.middle}</span>
							: <span class='answer hidden' onClick={() => changeIsShowAnswer()}>answer</span>
					}
					{!condition.isShowWordOnly && word.right && (
						<span class='right'>&nbsp;{word.right}</span>
					)}
				</div>
				<div class='bottom-wrapper'>
					<div class='left-wrapper' onClick={() => changeIsShowPhonogram()}>
						{
							condition.isShowAllPhonogram || isShowPhonogram
								? <span class='phonogram show'>{word.phonogram}</span>
								: <span class='phonogram hidden'>phonogram</span>
						}
					</div>
					<div class='right-wrapper' onClick={() => changeIsShowMeaning()}>
						{
							condition.isShowAllMeaning || isShowMeaning
								? <span class='meaning show'>{word.meaning}</span>
								: <span class='meaning hidden'>meaning</span>
						}
					</div>
				</div>
			</div>
		)
	}
})