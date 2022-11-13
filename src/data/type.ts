export interface Word {
	left: string
	middle: string
	right: string
	meaning: string
	phonogram: string
}

export type List = Record<string, Word[]>

export type Menu = Record<string, string[]>

export interface Condition {
	isShowWordOnly: boolean
	isShowAllAnswer: boolean
	isShowAllMeaning: boolean
	isShowAllPhonogram: boolean
}
