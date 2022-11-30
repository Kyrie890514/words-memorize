const string = `
|dissuade|him from gambling|劝诫|
in the |distant|future|遥远的|
her |distant|attitude|冷淡的|
|distaste|for corruption|厌恶|
his stomach|distended|with gas|膨胀|
|distilled|water|蒸馏|
essential oils |distilled|from natural herbs|提炼|
|distinct|from others|不同的|
onion's|distinct |flavor|独特的|

`

const result = []
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
			result.push(pre)
			break
	}
	return pre
}, {})
console.log(JSON.stringify(result).slice(1, -1))