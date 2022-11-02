const group = 'Group6'

const string = `

total|abstinence|from alcohol|戒|
|abstract|concepts|抽象的|
|abstract|water from the well|抽|
|abstraction|in class|走神|
|abstruse|math problems|难懂的|
his|absurd|jokes|荒谬的|
child|abuse||虐待|
|abusing|language|辱骂的|
drug|abuse||滥用|
her|abusive|language|骂人的|
`

const result = { [group]: [] }
if (string.indexOf('｜') > 0) {
	throw new Error('existed ｜')
}
string.split('|').map(v => v.trim()).reduce((pre, cur, index) => {
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
			pre.phonogram = ''
			result[group].push(pre)
			break
	}
	return pre
}, {})
console.log(JSON.stringify(result))