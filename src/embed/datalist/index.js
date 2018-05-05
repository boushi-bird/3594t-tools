require('babel-polyfill')
const { CrossStorageClient } = require('cross-storage')
const { hubPageUrl } = require('../../defines')

const run = async () => {
  if (!global.base_data) {
    global.alert(`[三国志大戦 解任ブックマークレット]
データを読み込み中またはデータリストのページではありません。`)
    return
  }
  const clinet = new CrossStorageClient(hubPageUrl)
  await clinet.onConnect()
  await clinet.set('3594t.baseData', JSON.stringify(global.base_data))
  alert('保存完了')
}

module.exports.run = run
