const group = 'Group11'

const string = `
a helpful|acquaintance||熟人|
her|acquaintance|with Chinese history|熟悉|
|acquiesce|in her daughter's demands|默许|
take|acquiescent|attitude towards corruptions|默许的|
|acquire|a new language|习得|
the|acquisition|of a paper recycling company|收购|
|acquisitive|shareholders|贪婪的|
|acquit| a political prisoner|赦免|
the|acrid|smell of burning rubber|刺激性

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