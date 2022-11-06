export interface Word {
	left: string
	middle: string
	right: string
	meaning: string
	phonogram: string
}

export interface List {
	[key: string]: Word[]
}

export interface Menu { [key: string]: string[] }

export interface Condition {
	isShowWordOnly: boolean
	isShowAllAnswer: boolean
	isShowAllMeaning: boolean
	isShowAllPhonogram: boolean
}
