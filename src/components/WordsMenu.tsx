import { defineComponent, ref, Teleport, type PropType } from 'vue'
import type { Content } from '../data/type'
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
		isShowAllPhonogram: {
			type: Boolean,
			required: true
		}
	},
	emits: ['currentChange', 'isShowWordOnlyChange', 'isShowAllAnswerChange', 'isShowAllMeaningChange', 'isShowAllPhonogramChange', 'reload'],
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
		function changeIsShowAllPhonogram() {
			emit('isShowAllPhonogramChange')
		}
		function reload() {
			emit('reload')
		}
		return { changeIsShow, changeCurrent, wordsContent, changeIsShowWordOnly, changeisShowAllAnswer, changeIsShowAllMeaning, changeIsShowAllPhonogram, reload }
	},
	render() {
		const { changeIsShow, currentList, currentGroup, content, changeCurrent, changeIsShowWordOnly, changeisShowAllAnswer, changeIsShowAllMeaning, changeIsShowAllPhonogram, isShowWordOnly, isShowAllAnswer, isShowAllMeaning, isShowAllPhonogram, reload } = this
		return (
			<div class='menu'>
				<div class='menu-wrapper'>
					<div>
						<span onClick={changeIsShow}>Menu</span>
					</div>
					<div class='title' onClick={reload}>
						<span>{currentList}</span>
						<span>{currentGroup}</span>
					</div>
					<div class='toggle'>
						<span class={isShowWordOnly && 'is-toggle'} onClick={changeIsShowWordOnly}>W</span>
						<span class={isShowAllAnswer && 'is-toggle'} onClick={changeisShowAllAnswer}>A</span>
						<span class={isShowAllMeaning && 'is-toggle'} onClick={changeIsShowAllMeaning}>M</span>
						<span class={isShowAllPhonogram && 'is-toggle'} onClick={changeIsShowAllPhonogram}>P</span>
					</div>
				</div>
				<Teleport to='#app'>
					<WordsContent ref='wordsContent' content={content} onCurrentChange={changeCurrent} />
				</Teleport>
			</div>
		)
	}
})