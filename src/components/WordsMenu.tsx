import { defineComponent, ref, Teleport, type PropType } from 'vue'
import type { Content } from '../type'
import WordsContent from './WordsContent'
import '../style/WordsMenu.scss'

export default defineComponent({
	name: 'WordsMenu',
	props: {
		content: {
			type: Object as PropType<Content>,
			required: true
		},
		currentList: {
			type: String,
			required: true
		},
		currentGroup: {
			type: String,
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
	emits: ['currentChange', 'isShowWordOnlyChange', 'isShowAllAnswerChange', 'isShowAllMeaningChange', 'reload'],
	setup(props, { emit }) {
		function changeCurrent(list: string, group?: string) {
			emit('currentChange', list, group)
		}
		const wordsContent = ref<InstanceType<typeof WordsContent> | null>(null)
		function changeIsShow() {
			wordsContent.value?.changeIsShow()
		}
		function changeIsShowWordOnly() {
			emit('isShowWordOnlyChange')
		}
		function changeisShowAllAnswer() {
			emit('isShowAllAnswerChange')
		}
		function changeIsShowAllMeaning() {
			emit('isShowAllMeaningChange')
		}
		function reload() {
			emit('reload')
		}
		return { changeIsShow, changeCurrent, wordsContent, changeIsShowWordOnly, changeisShowAllAnswer, changeIsShowAllMeaning, reload }
	},
	render() {
		const { changeIsShow, currentList, currentGroup, content, changeCurrent, changeIsShowWordOnly, changeisShowAllAnswer, changeIsShowAllMeaning, isShowWordOnly, isShowAllAnswer, isShowAllMeaning, reload } = this
		return (
			<div class='menu'>
				<div class='menu-wrapper'>
					<div>
						<span onClick={changeIsShow}>Menu</span>
					</div>
					<div class='title'>
						<span>{currentList}</span>
						<span>{currentGroup}</span>
					</div>
					<div class='toggle'>
						<span class={isShowWordOnly && 'is-toggle'} onClick={changeIsShowWordOnly}>W</span>
						<span class={isShowAllAnswer && 'is-toggle'} onClick={changeisShowAllAnswer}>A</span>
						<span class={isShowAllMeaning && 'is-toggle'} onClick={changeIsShowAllMeaning}>M</span>
						<span onClick={reload}>R</span>
					</div>
				</div>
				<Teleport to='#app'>
					<WordsContent ref='wordsContent' content={content} onCurrentChange={changeCurrent} />
				</Teleport>
			</div>
		)
	}
})