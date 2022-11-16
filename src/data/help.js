const string = `
her|acrimonious|objection|尖刻的|
|activate|a bank account|激活|
an animal rights|activist||积极分子|
reduce|acute|poverty|严重的|
his|acute|vision|敏锐的|
an |acute|angle|锐|
her business|acumen||精明|
|adamant|freedom fighters|坚定不移的|
|adapt|to the new social order|适应|
|adapt| his novel for the screen|改编|
|adaptable|explorers|适应能力强的|
a movie | addict||上瘾者|
|addictive|drugs|上瘾的|
|addle|his mind|使昏乱|
hear the|address|of the president|演说|
|address|the network problem|处理|
an |adept|guitar player|熟练的|
an |adequate|amount of food|充足的|
|adhere|to road rules|遵守|
a roll of|adhesive|tape|胶
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