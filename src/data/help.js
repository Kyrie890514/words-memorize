const group = 'Group3'

const string = `
|abjure|a claim|发誓放弃|
|abnegate|the resultless love|放弃|
|abnormal|phenomena|异常|
|abolish|an old tradition|废除|
|abominate|the code weather|厌恶|
the wave of |abominable|crimes|恶劣的|
|aborted|babies|流产的|
|abort |her travelling plan|终止|
an|abortive|plan|失败的|
|abound|with confidence|充满|
|abundant|cash|充足的
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