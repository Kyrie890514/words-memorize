const words = [
]

const noPhonogramWords = []

function query(word) {
	let prefix = word.substring(0, 2)
	// eslint-disable-next-line no-undef
	let dict = require(`./dict/${prefix}.json`)
	const a = dict[word]
	if (a && a.p) return '/' + a.p + '/'
	noPhonogramWords.push(word)
	return '//'
}

for (const word of words) {
	word.phonogram = query(word.middle)
}

console.log(JSON.stringify(words).slice(1, -1))
noPhonogramWords.length && console.log(noPhonogramWords)