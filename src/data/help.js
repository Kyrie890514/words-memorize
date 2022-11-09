const group = 'Group11'

const string = `
set up a business on her own|account||独立|
|account for|half of health care spending|占了|
|account for|his mistake|负责|
be|accountable|to their customers|负责|
get the |accountant|license|会计师|
an internationally|accredited|business school|认证的|
|accretion|of economic interests|增长|
his wealth|accrues||增加|
|accumulate|wealth|积累|
|accuse|the president of media interference|谴责








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