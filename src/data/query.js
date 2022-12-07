const words = [
	{
		"left": "",
		"middle": "distract",
		"right": "him from study",
		"meaning": "分心",
		"phonogram": "/dəˈstrakt/"
	},
	{
		"left": "",
		"middle": "distractions",
		"right": "from the show",
		"meaning": "娱乐",
		"phonogram": "/dəˈstrakSH(ə)n/"
	},
	{
		"left": "comfort a",
		"middle": "distraught",
		"right": "patient",
		"meaning": "烦躁的",
		"phonogram": "/dəˈstrôt/"
	},
	{
		"left": "help a student in",
		"middle": "distress",
		"right": "",
		"meaning": "苦恼",
		"phonogram": "/dəˈstres/"
	},
	{
		"left": "",
		"middle": "distribute",
		"right": "free pointed materials",
		"meaning": "分发",
		"phonogram": "/dəˈstribyo͞ot/"
	},
	{
		"left": "cause a political",
		"middle": "disturbance",
		"right": "",
		"meaning": "骚乱",
		"phonogram": "/dəˈstərbəns/"
	},
	{
		"left": "serious emotional",
		"middle": "disturbance",
		"right": "",
		"meaning": "焦虑",
		"phonogram": "/dəˈstərbəns/"
	},
	{
		"left": "Theory and practice sometimes",
		"middle": "diverge",
		"right": "",
		"meaning": "相悖",
		"phonogram": " /dəˈvərj,dīˈvərj/"
	},
	{
		"left": "",
		"middle": "divergence",
		"right": "of opinion within the team",
		"meaning": "分歧",
		"phonogram": "/dəˈvərjəns,dīˈvərjəns/"
	},
	{
		"left": "",
		"middle": "diverse",
		"right": "cultures",
		"meaning": "多样的",
		"phonogram": "/dəˈvərs,dīˈvərs/"
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

console.log(JSON.stringify(words).slice(1, -1))
noPhonogramWords.length && console.log(noPhonogramWords)