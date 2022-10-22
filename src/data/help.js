const group = 'Group4'

const string = `
her|aboveboard|business|正大光明的|
|abrade|her shin|擦伤|
his|abrasive|managing style|粗暴的|
the | abrasive |surfaca| 粗糙的|
|walk |abreast|	齐头|
|abridged|books|删减的|
|abrogate|a law|废除|
|abrupt|changes of weather|突然|
|absconded|prisoners|潜逃的|
|absent|from school|不在|
his |absent|mind|心不在焉
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
			result[group].push(pre)
			break
	}
	return pre
}, {})
console.log(JSON.stringify(result))