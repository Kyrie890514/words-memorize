const group = 'group 2'

const string = `
the | abdicated | king | 退位|
abduct | a child ||绑架|
aberrant |reactions of youths||异常的|
abet | a crime||教唆|
stop in |abeyance||中止|
abhor|careless attitude||厌恶|
a world without | |abhorrence|憎恨|
cannot | abide | the loud noise |忍受|
abide | by the rules||遵守|
the | abiding|love|持久的|
her |abject|fate|悲惨的
`

const result = { [group]: [] }
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
			result[group].push(pre)
			break
	}
	return pre
}, {})
console.log(JSON.stringify(result))