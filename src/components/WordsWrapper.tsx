import { defineComponent, type PropType } from 'vue'
import type { Word } from '@/type'
import WordWrapper from './WordWrapper'
import '../style/WordsWrapper.scss'

export default defineComponent({
	name: 'WordsWrapper',
	props: {
		words: {
			type: Array as PropType<Word[]>,
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
	render() {
		const { words, isShowWordOnly, isShowAllAnswer, isShowAllMeaning } = this
		return <div class='words-wrapper'>
			{words.map(word => <WordWrapper word={word} isShowWordOnly={isShowWordOnly} isShowAllAnswer={isShowAllAnswer} isShowAllMeaning={isShowAllMeaning} />)}
		</div>
	}
})