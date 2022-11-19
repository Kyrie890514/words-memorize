const string = `
|dispossess|the farmer of his land|霸占|
a |disproportionate|investment of time|不成比例|
|disprove|previous theories|推翻|
solve a |dispute||纠纷|
|disregard|her feeling|忽视|
bring the hospital into|disrepute||名声扫地|
|disrupt|his work |打扰|
|disruptive|noises|扰人的|
|dissect|dead animals|解剖|
|dissect|your work|剖析|
|dissemble|his real motives|掩饰|
|disseminate |the messages|传播|
the passage of resolution without|dissent||异议|
solve internal|dissension||纠纷|
clear political |dissidents||异己|
|dissimulate|his true feeling|掩饰|
|dissipate|smoke|驱散|
|dissipate|his time and energy|浪费|
|dissipated|wealthy youths|沉迷酒色的|
his |dissolute|night life|放荡的|
|dissolve|in water|溶解|
|dissolve|the tension|化解|
|dissolution|of their marriage|解除|
|dissolve|the interest group|瓦解
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