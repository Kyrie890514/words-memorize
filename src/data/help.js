const string = `
`

// Frontend
// const string = `
// `

const result = []
if (string.indexOf('｜') > 0) {
	throw new Error('There are some ｜ existed.')
}
const a = string.split('|')
if ((a.length - 1) % 4 !== 0) {
	throw new Error(`The count of '|' is not a multiple of 4.`)
}
a.map(v => v.trim()).reduce((pre, cur, index) => {
	switch (index % 4) {
		case 0:
			pre = { left: cur }
			break
		case 1:
			pre.middle = cur
			break
		case 2:
			pre.right = cur
			break
		case 3:
			pre.meaning = cur
			pre.phonogram = '//'
			result.push(pre)
			break
	}
	return pre
}, {})
console.log(JSON.stringify(result).slice(1, -1))