export interface Content { [key: string]: string[] }

export interface Word {
	left: string
	middle: string
	right: string
	meaning: string
}

export interface List {
	[key: string]: Word[]
}