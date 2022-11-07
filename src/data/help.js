const group = 'Group9'

const string = `
|accommodate|her guests|提供住宿|
|accommodate|local cultures|顾及|
|accommodate|to the diet in the South|适应|
an |accommodating|manager|肯通融的|
|accompany|his wife|陪伴|
|accompany|her song|伴奏|
piano|accompaniment||伴奏|
the killer's |accomplice||同谋|
|accomplish|a miracle|实现|
an | accomplished|painter|成就卓著的
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
			pre.phonogram = '//'
			result[group].push(pre)
			break
	}
	return pre
}, {})
console.log(JSON.stringify(result))