const group = 'Group5'

const string = `
fight the dark|absolutism||专权|
|absolve|the criminals|赦免|
|absorb|water|吸|
cannot|absorb|those costs|承受|
an |absorbing|story|吸引人的|
|abstain|from smoke|戒掉|
her|abstemious|diets|节制的|

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