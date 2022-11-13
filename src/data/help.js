const group = 'Group11'

const string = `
raise an |accusatory|question|指责的|
|accustom|himself to a simple life|习惯|
his|accustomed|behaviors|习惯性的|
an |acerbic|criticism|尖刻的|
|acid|rains|酸 |
an |acid|humor|尖酸的|
|acknowledge|his achievement|承认|
the |acme|of art|巅峰|
the |acoustic|of the music hall|声学结构|
send|acoustic|signals|声音|
|acquaint|herself with Traffic Rules|熟悉

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