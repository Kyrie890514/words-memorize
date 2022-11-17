const string = `
|adjacent|countries|邻近的|
wait in the |adjoining|office|隔壁|
The court|adjourns|for lunch.|休会|
|adjudicate |on a conflict|裁决|
an important |adjunct|to drug treatments|辅助|
|ad-lib|on stage|即兴发挥|
|administer|an office|管理|
watch the nurse|administer|the drugs|开药|
|administrative|work|管理的|
a business|administrator| |管理者|
|admire|his talent|仰慕|
her|admirable|beauty|令人垂涎的|
|admit|a new member|加入|
|admonish|a careless driver|告诫|
a boy's act of |adolescent|rebellion|青春期的|
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
console.log(JSON.stringify(result))