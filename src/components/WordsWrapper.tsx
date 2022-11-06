import { defineComponent, type PropType } from 'vue'
import type { Condition, Word } from '@/data/type'
import WordWrapper from './WordWrapper'
import '../style/WordsWrapper.scss'

export default defineComponent({
	name: 'WordsWrapper',
	props: {
		words: {
			type: Array as PropType<Word[]>,
			required: true
		},
		condition: {
			type: Object as PropType<Condition>,
			required: true
		}
	},
	render() {
		const { words, condition } = this
		return (
			<div class='words-wrapper'>
				{
					words.length
						? (
							words.map(word => (
								<WordWrapper word={word} condition={condition} />
							))
						)
						: <div class='error-text'>Sorry, but there is no related words</div>
				}
			</div>
		)
	}
})