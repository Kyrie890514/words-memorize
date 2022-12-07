const words = [
	{
		"left": "code that you need to",
		"middle": "investigate",
		"right": "",
		"meaning": "调查",
		"phonogram": "/inˈvestəˌɡāt/"
	},
	{
		"left": "a",
		"middle": "synthetic",
		"right": "event",
		"meaning": "人造的",
		"phonogram": "/sinˈTHedik/"
	},
	{
		"left": "event",
		"middle": "delegation",
		"right": "",
		"meaning": "委托",
		"phonogram": "/ˌdeləˈɡāSH(ə)n/"
	},
	{
		"left": "",
		"middle": "consecutive",
		"right": "numbers in an array",
		"meaning": "连续的",
		"phonogram": "/kənˈsekyədiv/"
	},
	{
		"left": "the",
		"middle": "pros and cons",
		"right": "of each",
		"meaning": "优点和缺点",
		"phonogram": "/präps,käns/"
	},
	{
		"left": "the",
		"middle": "ins and outs",
		"right": "of the question",
		"meaning": "所有细节",
		"phonogram": " "
	},
	{
		"left": "use distinct",
		"middle": "protocols",
		"right": "to transfer data",
		"meaning": "协议",
		"phonogram": "/ˈprōdəˌkôl,ˈprōdəˌkäl/"
	},
	{
		"left": "a",
		"middle": "catastrophic",
		"right": "data loss",
		"meaning": "灾难的",
		"phonogram": "/ˌkadəˈsträfik/"
	}
]

const noPhonogramWords = []

function query(word) {
	let prefix = word.substring(0, 2)
	// eslint-disable-next-line no-undef
	let dict = require(`./dict/${prefix}.json`)
	const a = dict[word]
	if (a && a.p) return '/' + a.p + '/'
	return '//'
}

for (const word of words) {
	word.phonogram = query(word.middle)
}

console.log(JSON.stringify(words))
console.log(noPhonogramWords)